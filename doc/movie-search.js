/**
  HTTP Client making a GET request to IMDB for a list of motion pictures
  matching a specified query and outputting the list.
*/

// Import required modules.
const hgetModule = require('./hget');
const cheerio = require('cheerio');

// Identify its objects.
const {chunks, hget, arg0IfValid} = hgetModule;

// Initialize the query parameters.
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
  // Create a cheerio object representing the page.
  const $ = cheerio.load(chunks.join(''));
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
