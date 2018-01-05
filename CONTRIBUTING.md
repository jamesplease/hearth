# Contributing

Thanks for your interest in helping out! This guide should have what you need to get up and
running. If you have additional questions, feel free to open an issue and I'll do my best
to help you get set up.

## Developing

### Prerequisites

Hearth is a JavaScript web app. To run it locally, you'll need to install the following
prerequisites:

* [Node.js v8](https://nodejs.org/en/)
* [npm v5](https://www.npmjs.com)

### Installation

First, clone the repository.

```
git clone https://github.com/jmeas/hearth
```

Then, navigate into the repository directory and install the dependencies:

```
npm install
```

Lastly, build the market data:

```
npm run build-data
```

### Getting Started

To run the application locally, use:

```
npm run watch
```

And to run the unit tests:

```
npm test
```

## Updating the Data

First, download [the Market Data spreadsheet](http://www.econ.yale.edu/%7Eshiller/data/ie_data.xls). Open
the file in your favorite spreadsheet software, and export the sheet named "Data" as a CSV file.

Replace the file in this repository found at `./data/ie_data.csv` with the file you just exported.

If you're developing locally, you'll want to run `npm run build-data` for the web app to see
the changes.
