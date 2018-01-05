//
// This is the production server for Hearth. It is not used
// for local development.
//
// If you're developing locally, run `npm start`, which will
// use the development environment scaffolded out by Create React App.
//
// When deploying Hearth to a production environment, you must first
// build the production version of the browser app by executing
// `npm run build`.
//
// Then, run `npm run serve` to start this server.
//

require('./utils/uncaught-things');

const express = require('express');
const path = require('path');
const log = require('./utils/log');

const app = express();

const port = process.env.PORT || 5000;
app.set('port', port);

// Serve our static files first
const staticDir = path.join(__dirname, '..', 'build');
app.use(express.static(staticDir));

// Serve the client-side app at every unmatched URL
const appFile = path.join(staticDir, 'index.html');
app.get('*', function(req, res) {
  res.sendFile(appFile);
});

app.listen(port, () => log.info({ port }, 'The application has started.'));
