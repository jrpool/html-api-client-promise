# html-api-client-promise

Node request-promise-native client for a specific API that responds with HTML

## Project Members

[Jonathan Pool](https://github.com/jrpool)

## modules

```
hget.js
movie-search.js
copy-edit-files.js
```

## Discussion

### General

This application demonstrates the use of the `request-promise-native` package and the `cheerio` parsing library in a request to an API that responds with an HTML document.

The application fulfills the specifications of the “Movie Search CLI with Promises” module of the [Learners Guild][lg] curriculum in Phase 2 of the Guild’s curriculum.

### Extras

The application also contains a module that strips unwanted comments from the files in a directory tree. This is the `copy-edit-files` module in the `dev` directory. It was invoked with

`node dev/copy-edit-files «/path-to-doc» «/path-to-new-dir» uncomment`

This copied the files in `doc/` to a new directory and edited them to remove comments introduced by `//` or `/*`. Comments introduced by `///` or `/**` remained. The edited files were then moved to their standard locations.

The `copy-edit-files` module more generally permits the user to supply a regular expression and a string, and then it replaces with the string any substring in any of the files that matches the regular expression. The `uncomment` keyword represents a particular replacement rule, and other such rules and keywords can be added to the module.

## Installation and Setup

0. These instructions presuppose that [npm][npm] is installed.

1. Your copy of this project will be located in its own directory, inside some other directory that you may choose or create. For example, to create that parent directory inside your own home directory’s `Documents` subdirectory and call it `projects`, you can execute:

    `mkdir ~/Documents/projects`

Make that parent directory your working directory, by executing, for example:

    `cd ~/Documents/projects`

2. Clone this project’s repository into it, thereby creating the project directory, named `html-api-client`, by executing:

    `git clone https://github.com/jrpool/html-api-client-promise.git html-api-client`

2. Make the project directory your working directory by executing:

    `cd html-api-client-promise`

3. Install required dependencies (you can see them listed in `package.json`) by executing:

    `npm i`

## Usage and Examples

Enter `node movie-search «query»`, replacing `«query»` with any string, to get an output of the titles, release years, and types of motion pictures reported by IMDB as matching that string. For example:

`node movie-search 'Panchali'`

To perform linting, execute `npm run lint`.

To perform the supplied tests, execute `npm test`.

[lg]: https://www.learnersguild.org
[npm]: https://www.npmjs.com/
