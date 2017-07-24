/**
  HTTP Client making a GET request to IMDB for a list of motion pictures
  matching a specified query and outputting the list.
*/

const hgetModule = require('./src/hget');
const cheerio = require('cheerio');

const {chunks, hget, arg0IfValid} = hgetModule;

const requestParams = {
  url: 'http://www.imdb.com/find',
  q: '',
  ref_: 'nv_sr_fn',
  s: 'all'
};

/**
  Define a function to extract the list of titles, years, and types from the
  HTML response of IMDB.
*/
const getList = () => {
  const $ = cheerio.load(chunks.join(''));
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

/// Define a function to output a report of the matching motion pictures.
const listReport = () => {console.log(getList());};

/**
  Perform a GET request to the URL specified on the command line, if valid,
  and process its response.
*/
const query = arg0IfValid();
if (query) {
  requestParams['q'] = query;
  const urlWithQuery
    = requestParams['url']
    + '?'
    + ['q', 'ref_', 's'].map(v => v + '=' + requestParams[v]).join('&');
  hget(urlWithQuery, listReport);
}
