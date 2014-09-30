# M14 (Music14)
Yet another MPD Client

By Alex Lende, Thomas Kearney, Andrew Bowler and Nick Montelibano


## Contributing

1. `git clone https://github.com/ajbowler/M14.git`

### Frontend

#### Setup

This project makes use of `npm` which can be installed from [nodejs.org](http://nodejs.org/).

1. `cd M14/WWW`
2. `npm install` to install all of the node dependencies
3. `gulp dev` to build with debug options
4. You should be able to open the `index.html` page locally now.

#### Gulp

[Gulp](http://gulpjs.com/) is the JS task runner that we use for building.

Running just `gulp` will watch the js directory for changes and automatically run the `gulp dev` task. This can be useful while developing.

Running `gulp js` will build without debug options.

Running `gulp clean` will remove any files created during the `dev` or `js` processes.

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