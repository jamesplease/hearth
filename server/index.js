//
// This is the production server for Hearth. It is not used
// for local development.
//
// If you're developing locally, run `npm run watch`, which will
// use the development environment scaffolded out by Create React App.
//
// When deploying Hearth to a production environment, you must first
// build the production version of the browser app by executing
// `npm run build`.
//
// Then, execute `npm start` to start this server.
//

require('./utils/uncaught-things');

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const csp = require('./utils/csp');
const log = require('./utils/log');

const app = express();

const { PORT, NODE_ENV } = process.env;

app.set('port', PORT || 5000);
app.set('env', NODE_ENV || 'development');

app.use(helmet({ contentSecurityPolicy: csp }));
app.use(compression());

// Serve our static files first
const staticDir = path.join(__dirname, '..', 'build');
app.use(express.static(staticDir));

// Serve the client-side app at every unmatched URL
const appFile = path.join(staticDir, 'index.html');
app.get('*', function(req, res) {
  res.sendFile(appFile);
});

app.listen(app.get('port'), () =>
  log.info({ port: app.get('port') }, 'The application has started.')
);
