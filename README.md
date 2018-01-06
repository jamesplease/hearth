# Hearth

[![Travis build status](http://img.shields.io/travis/jmeas/hearth.svg?style=flat)](https://travis-ci.org/jmeas/hearth)
[![Dependency Status](https://david-dm.org/jmeas/hearth.svg)](https://david-dm.org/jmeas/hearth)
[![devDependency Status](https://david-dm.org/jmeas/hearth/dev-status.svg)](https://david-dm.org/jmeas/hearth#info=devDependencies)

Useful tools for Financial Independence / Retiring Early (FIRE).

### Contributing

Looking to help out? Refer to the [Contributing Guide](./CONTRIBUTING.md). Also, thanks!

### Deploying

The [production version](https://hearth-app.com/) of this app is
deployed as part of a Heroku pipeline. Only users with access to the Heroku
app will be able to deploy it.

The release flow is as follows:

* Opening a PR automatically creates a [Review App](https://devcenter.heroku.com/articles/github-integration-review-apps)
* Merging to the `master` branch will automatically deploy the staging app
* Running `npm run release` will promote the staging app to production

_Note: the name of the Heroku remote must be `staging` for this command to work._

### Data Sources

* [U.S. Stock Market data](http://www.econ.yale.edu/%7Eshiller/data.htm) ([direct link](http://www.econ.yale.edu/%7Eshiller/data/ie_data.xls))

### Target browser support

Evergreen browsers (including Microsoft Edge). No Internet Explorer support.
