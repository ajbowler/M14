# M14 Frontend

## Development Setup

This project makes use of `npm` which can be installed from [nodejs.org](http://nodejs.org/).

1. `cd M14/WWW`
2. `npm install -g` to install all of the node dependencies.
3. `gulp dev` to build with debug options.
4. You should be able to open the `index.html` page locally now.


## Tools of the Trade

### React

[React](http://facebook.github.io/react/) is the JavaScript framework that we chose to use for M14.

With React we take advantage of JSX, a JavaScript syntax that looks similar to XML. The JSX transformer converts all of the JSX into JavaScript.


### Browserify

[Browserify](http://browserify.org/) lets us use CommonJS syntax for requiring dependancies just like Node.js.


### Gulp

[Gulp](http://gulpjs.com/) is the JS task runner that we use for building all of the frontend code.

The following gulp commands can be used:

- `gulp` will watch the js directory for changes and automatically run the `gulp dev` task. This can be useful while developing.
- `gulp dev` will build with debug options.
- `gulp js` will build without debug options.
- `gulp test` will run the Jest tests.
- `gulp clean` will remove any files created during the `dev` or `js` processes.

Optionally you can install the [LiveReload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) browser extension for automatic page refreshing.


### Jest

[Jest](http://facebook.github.io/jest/) is the testing framework that we use to test our code.

Tests are found in `WWW/__tests__` and can be run from the `WWW` directory using any of the following commands:

- `gulp test`
- `npm test`
- `jest -c jest.json`


### JS Code Guidelines

We follow the [Google JS Style Guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

- Declarations with `var` always.
- Always use semicolons.
- Prefer named functions. i.e. `function foo()` over `var foo = function()`
- Prefer `'` over `"` for strings.
- Start curly braces on the same line.
- Use JSDoc-style comments.
- We make use of the JSX syntax with [ReactJS](http://facebook.github.io/react/).

