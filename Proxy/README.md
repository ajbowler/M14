# Node.js Proxy for M14

The proxy is the in-between for forwarding the requests to each user's instance of MPD from the browser.

## Running

1. `npm install`
2. The proxy can be run by simply running `node server.js`
3. Alternitively, it can be run using [forever](https://github.com/foreverjs/forever) in the background.


## Testing

The client.js file can be used for quick and dirty testing of the server.js code. It takes a few commands from the input stream and makes REST calls based on the command used.
