# Contributing

Thanks for your interest in helping out! This guide should have what you need to get up and
running. If you have additional questions, feel free to open an issue and I'll do my best
to help you get set up.

## Developing

### Prerequisites

Hearth is a JavaScript web app. To run it locally, you'll need to install the following
prerequisites:

* [Node.js](https://nodejs.org/en/) v8.9.1+
* [npm](https://www.npmjs.com) v5.5.1+

To deploy the application, you will also need:

* [Heroku](heroku.com) account
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command)
  * Be sure to [log in!](https://devcenter.heroku.com/articles/heroku-command#logging-in)

### Installation

First, clone this repository.

```
git clone git@github.com:jmeas/hearth.git
```

Then, navigate into the repository directory and install the [npm](https://www.npmjs.com/) dependencies:

```
cd hearth && npm install
```

Lastly, build the market data:

```
npm run build-data
```

#### Developer Scripts

* `npm run watch`: Develop locally
* `npm test`: Run the tests with a watcher
* `npm run test`: Lint JS & CSS, then run all unit tests
* `npm run test -- --coverage`: Generate a coverage report
* `npm run build`: Build a production version of the application
* `npm run build-data`: Build the market data
* `npm run build-all`: Runs all scripts that build assets
* `npm run release`: Release a new version of the production app by syncing
  the production app with the staging app

## Updating the Data

First, download [the Market Data spreadsheet](http://www.econ.yale.edu/%7Eshiller/data/ie_data.xls). Open
the file in your favorite spreadsheet software, and export the sheet named "Data" as a CSV file.

Replace the file in this repository found at `./data/ie_data.csv` with the file you just exported.

If you're developing locally, you'll want to run `npm run build-data` for the web app to see
the changes.
