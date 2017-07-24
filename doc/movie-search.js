/**
  HTTP Client making a GET request to IMDB for a list of motion pictures
  matching a specified query and outputting the list.
*/

// Import required modules.
const rpn = require('request-promise-native');
const cheerio = require('cheerio');

// Initialize the query parameters.
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
  // Identify the command-line arguments.
  const args = process.argv.slice(2);
  // Return the first if it is the only argument and nonblank.
  if (args.length === 1 && typeof args[0] === 'string' && args[0].length) {
    return args[0];
  }
};

/**
  Define a function to extract the list of titles, years, and types from the
  HTML response of IMDB.
*/
const getList = body => {
  // Create a cheerio object representing the page.
  const $ = cheerio.load(body);
  // Identify a cheerio collection of cells containing title/year/type items.
  const listCells =
    $('a[name=tt]')
      .parent()
      .parent()
      .children('table')
      .children('tr')
      .children('td.result_text');
  // Initialize an array of title/year/type items.
  const listTexts = [];
  // For each of them:
  listCells.each((index, element) => {
    // Add its text content, with leading space deleted, to the array.
    listTexts.push($(element).text().replace(/^ +/, ''));
  });
  // Return the items, newline-delimited.
  return listTexts.join('\n');
};

/*
  Define a function to process any error, the status, and the body of the
  result of an HTTP request.
*/
const processRequestResult = (error, response, body) => {
  // If there was an error:
  if (error) {
    // Report it.
    console.log('Request/response error: ' + error.message);
  }
  // Otherwise, if the response status is not OK:
  else if (response && response.statusCode !== 200) {
    // Report it.
    console.log('Document error: ' + response.statusCode);
  }
  // Otherwise, i.e. if an ordinary response was received:
  else {
    // Process its body with getList and output the result.
    console.log(getList(body));
  }
};

// Identify the calling argument, if valid.
const query = arg0IfValid();

// If it is:
if (query) {
  // Make it the value of the “q” property of requestParams.
  requestParams['q'] = query;
  // Identify the complete URL, including the query.
  const urlWithQuery
    = requestParams['url']
    + '?'
    + ['q', 'ref_', 's'].map(v => v + '=' + requestParams[v]).join('&');
  // Make an HTTP GET request to that URL and process the result.
  rpn(urlWithQuery, processRequestResult);
}
