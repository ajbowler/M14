# M14 (Music14)
Yet another MPD Client

By Alex Lende, Thomas Kearney, Andrew Bowler and Nick Montelibano


## Contributing

1. `git clone https://github.com/ajbowler/M14.git`

### Frontend

#### Setup

This project makes use of `npm` which can be installed from [nodejs.org](http://nodejs.org/).

1. `cd M14/WWW`
2. `npm install -g` to install all of the node dependencies.
3. `gulp dev` to build with debug options.
4. You should be able to open the `index.html` page locally now.

#### Jest

[Jest](http://facebook.github.io/jest/) is the testing framework that we use to test our code.

Tests are found in `WWW/__tests__` and can be run from the `WWW` directory using any of the following commands:

- `gulp test`
- `npm test`
- `jest -c jest.json`

#### Gulp

[Gulp](http://gulpjs.com/) is the JS task runner that we use for building.

The following gulp commands can be used:

- `gulp` will watch the js directory for changes and automatically run the `gulp dev` task. This can be useful while developing.
- `gulp dev` will build with debug options.
- `gulp js` will build without debug options.
- `gulp test` will run the Jest tests.
- `gulp clean` will remove any files created during the `dev` or `js` processes.

Optionally you can install the [LiveReload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) browser extension for automatic page refreshing.

#### JS Code Guidelines

We follow the [Google JS Style Guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

- Declarations with `var` always.
- Always use semicolons.
- Prefer named functions. i.e. `function foo()` over `var foo = function()`
- Prefer `'` over `"` for strings.
- Start curly braces on the same line.
- Use JSDoc-style comments.
- We make use of the JSX syntax with [ReactJS](http://facebook.github.io/react/).


### Backend

#### Setup

Most of our backend development is done using [Eclipse](https://www.eclipse.org).

#### Java Code Guidelines

We follow the [Google Java Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javaguide.html)

- Brackets follow the Kernighan and Ritchie style with brackets on the same line.
- `@override` always used.
- Constant names use `CONSTANT_CASE`.
- Class names use `UpperCamelCase`.
- Other variable or method names use `lowerCamelCase`.
- Javadoc-style comments.