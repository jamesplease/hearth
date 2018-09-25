# Contributing

Thanks for your interest in helping out! This guide should have what you need to get up and
running. If you have additional questions, feel free to open an issue and I'll do my best
to help you get set up.

## Developing

### Prerequisites

Hearth is a JavaScript web app. To run it locally, you'll need to install the following
prerequisites:

- [Node.js](https://nodejs.org/en/) v8.9.1+
- [npm](https://www.npmjs.com) v5.5.1+

### Installation

First, clone this repository.

```
git clone git@github.com:jmeas/hearth.git
```

Then, navigate into the repository directory and install the [npm](https://www.npmjs.com/) dependencies:

```
cd hearth && npm install
```

#### Developer Scripts

- `npm run watch`: Develop locally
- `npm test`: Run the tests with a watcher
- `npm run test -- --coverage`: Generate a coverage report
- `npm run build`: Build a production version of the application
