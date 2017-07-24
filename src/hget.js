/**
  HTTP Client making a GET request and outputting its response. See:
  https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_request_options_callback
*/

/// Import the `http` module.
const http = require('http');

/// Initialize an array containing the chunks of the result.
const chunks = [];

/// Define a function to add a chunk to the array.
const processChunk = chunk => {chunks.push(chunk);};

/**
  Define a function to create a listener for “data” events emitted by a
  specified Readable Stream and make processChunk process their chunks. See:
  https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_event_data
*/
const dataListen = readable => {readable.on('data', processChunk);};

/**
  Define a function to return a function that calls an already specified
  function to process a response that will be specified. See:
  https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_request_options_callback.
*/
const responseListenerFn = (endCallback) => {
  return response => {
    const status = response.statusCode;
    if (status === 200) {
      response.setEncoding('utf-8');
      dataListen(response);
      response.once('end', endCallback);
    }
    else {
      const err = new Error('Failed with status ' + status);
      console.error(err.message);
      response.resume();
      return;
    }
  };
};

/**
  Define a function to perform a GET request to a specified URL and process
  its response with a function that includes a specified callback function. See:
  https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_get_options_callback
  https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_event_error
*/
const hget = (url, endCallback) => {
  const req = http.request(url, responseListenerFn(endCallback));
  req.on('error', err => console.error('Error: ' + err.message));
  req.end();
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

exports.chunks = chunks;
exports.hget = hget;
exports.arg0IfValid = arg0IfValid;
