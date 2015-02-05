# M14 (Music14) Backend Java Code

We currently use [Apache Tomcat](http://tomcat.apache.org/) and [Jersey](https://jersey.java.net/) to run the REST services for user management.

At the moment M14 is not yet live. We are looking into hosting solutions.


## Development Setup & Practices

We do most of our backend development in [Eclipse](https://www.eclipse.org) which we would recommend.

Maven is used to manage dependencies and build the backend portion of M14.

JUnit tests are appreciated. :)


## Java Code Guidelines

We follow the [Google Java Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javaguide.html)

- Brackets follow the Kernighan and Ritchie style with brackets on the same line.
- `@override` always used.
- Constant names use `CONSTANT_CASE`.
- Class names use `UpperCamelCase`.
- Other variable or method names use `lowerCamelCase`.
- Javadoc-style comments.
- Don't be stupid. Others sould be able to read your code.
