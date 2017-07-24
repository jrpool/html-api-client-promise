/**
  HTTP Client making a GET request to IMDB for a list of motion pictures
  matching a specified query and outputting the list.
*/

const rpn = require('request-promise-native');
const cheerio = require('cheerio');

const requestParams = {
  url: 'http://www.imdb.com/find',
  q: '',
  ref_: 'nv_sr_fn',
  s: 'all'
};

/**
  Define a function to return the first argument or, if the argument count
  is not 1, the argument is not a string, or the argument is a blank string,
  undefined.
*/
const arg0IfValid = () => {
  const args = process.argv.slice(2);
  if (args.length === 1 && typeof args[0] === 'string' && args[0].length) {
    return args[0];
  }
};

/**
  Define a function to extract the list of titles, years, and types from the
  HTML response of IMDB.
*/
const getList = body => {
  const $ = cheerio.load(body);
  const listCells =
    $('a[name=tt]')
      .parent()
      .parent()
      .children('table')
      .children('tr')
      .children('td.result_text');
  const listTexts = [];
  listCells.each((index, element) => {
    listTexts.push($(element).text().replace(/^ +/, ''));
  });
  return listTexts.join('\n');
};

const processRequestResult = (error, response, body) => {
  if (error) {
    console.log('Request/response error: ' + error.message);
  }
  else if (response && response.statusCode !== 200) {
    console.log('Document error: ' + response.statusCode);
  }
  else {
    console.log(getList(body));
  }
};

const query = arg0IfValid();

if (query) {
  requestParams['q'] = query;
  const urlWithQuery
    = requestParams['url']
    + '?'
    + ['q', 'ref_', 's'].map(v => v + '=' + requestParams[v]).join('&');
  rpn(urlWithQuery, processRequestResult);
}
