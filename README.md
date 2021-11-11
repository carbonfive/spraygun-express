# spraygun-express

[![CircleCI](https://circleci.com/gh/carbonfive/spraygun-express/tree/main.svg?style=shield)](https://circleci.com/gh/carbonfive/spraygun-express/tree/main)

This is a Carbon Five-flavored convenience skeleton project for Express, ideal for building JSON APIs for single-page apps (SPAs).

- Jest and supertest to enable fast TDD
- Dotenv for easy 12-factor config
- ESLint/Prettier with enforcement pre-commit hooks
- Async/await support
- Well-organized for small and medium-sized projects
- Cookie-based JWT auth optimized for easy creation of SPAs
- Best practices for security (helmet, CSRF protection)
- CI testing via Circle CI
- Deployable to Heroku out of the box
- Or deploy via docker using the included Dockerfile

This template purposely uses _pure_ Node: no webpack or any other preprocessor. This means that you can develop, test, and deploy with no build steps to run or configure! Modern version of Node have support for all the nice features of newer versions of JavaScript, like async/await, let/const, ES6 modules, object spread, default parameters, etc.

To get started, make sure you have Node 16 and Yarn installed, and then generate your project like this:

```
$ npx spraygun -t express <project-directory>
```

_Below this line is the README that will accompany your generated project._

---

<!-- END SPRAYGUN BANNER -->

# app-prototype

This is a NodeJS Express app that publishes a JSON API.

## Prerequisites

- Node 16 (see [.node-version](./.node-version))
- Yarn 1.12.1 or higher

It is strongly recommended that you use a version manager like [nvm](https://github.com/nvm-sh/nvm), [nodenv](https://github.com/nodenv/nodenv), or [asdf](https://asdf-vm.com/) to ensure the correct Node version. If you use asdf, make sure to add the nodejs plugin and [enable legacy version files](https://github.com/asdf-vm/asdf-nodejs#nvmrc-and-node-version-files).

## Quick start

Install dependencies:

```
yarn install
```

Start the server:

```
yarn start
```

Verify it is working by making an HTTP request:

<http://localhost:3000/api/hello>

### Basic Auth

Setting both BASIC_AUTH_USER and BASIC_AUTH_PASSWORD in your environment will enable
basic auth for your app.

## Task reference

- **`yarn start`** starts the Express server listing on port 3000. The server is automatically restarted whenever you make changes.
- **`yarn test`** runs tests in "watch" mode, automatically focusing on tests or code that were modified since the last commit. Press the `a` key after the test runner has started to watch all tests in the project.
- **`yarn test:coverage`** runs all tests, prints coverage stats, and then exits.
- **`yarn lint`** runs all ESLint checks and then exits.
- **`yarn server`** starts the Express server on port 3000 (or `$PORT`, if specified). This task is intended for running the app in deployment in conjunction with `NODE_ENV=production`.

---

_Generated by [spraygun-express](https://github.com/carbonfive/spraygun-express)_
