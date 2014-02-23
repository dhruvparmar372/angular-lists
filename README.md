# angular-brunch-seed-no-fuss
### A starter project for AngularJS using Brunch.io

[AngularJS](http://angularjs.org) + [Brunch](http://brunch.io)

Features:
* Full JS & HTML (no Coffeescript, no Jade) / SASS / SCSS automatically compiled on save
* ES5-Shim, Modernizr, and console polyfill (because IE8 is still alive)
* auto-reload during development saves you from manually refreshing the page and the css is automatically injected without refreshing the page
* Javascript / CSS minification for production
* [karma](http://karma-runner.github.io) integration for unit & e2e tests
* Bootstrap 3 integration with themes & font awesome.

## Alternate Versions

- [Original angular-brunch-seed](https://github.com/scotch/angular-brunch-seed)
- [Livescript](https://github.com/clkao/angular-brunch-seed-livescript) by [Chia-liang Kao](https://github.com/clkao)
- [angular-brunch-true-north: CoffeeScript + Jade] (https://github.com/scoarescoare/angular-brunch-true-north) - the base for this project

## How to use angular-brunch-seed-no-fuss

* `git clone https://github.com/ocombe/angular-brunch-seed-no-fuss` to clone the **angular-brunch-seed-no-fuss** repository
* `cd angular-brunch-seed-no-fuss`
* `sh scripts/init.sh` to install node packages (or `./scripts/init.bat` on Windows).

or if you have **Brunch** installed run:

`brunch new myapp --skeleton https://github.com/ocombe/angular-brunch-seed-no-fuss`

### Running the app during development

* `sh scripts/server.sh` to serve using **Brunch** (or `./scripts/server.bat` on Windows).

Then navigate your browser to [http://localhost:3333](http://localhost:3333)

NOTE: Occasionally the scripts will not load properly on the initial
load. If this occurs, refresh the page. Subsequent refresh will render
correctly.
The first compilation is always longer.

### Running the app in production

* `sh scripts/production.sh` to minify javascript and css files (or `./scripts/production.bat` on Windows).

Please be aware of the caveats regarding Angular JS and minification, take a look at [Dependency Injection](http://docs.angularjs.org/guide/di) for information.

### Running unit tests

* `sh scripts/test.sh` to run unit tests with [karma](http://karma-runner.github.io) (or `./scripts/test.bat` on Windows)
* Open the browser you would like to test to [http://localhost:3334](http://localhost:3334)

Notes:

- Karma will run tests on save. To insure that changes are saved be sure to have `./script/server.sh` or `./script/development.sh` running in the console (or `./script/server.bat` or `./script/development.bat` on Windows).
- You can set the browsers that you would like to target in the `/test/karma_conf.js` file E.g. `browser = ["ChromeCanary", "Firefox"]`

### End to end testing

* Run the app in development mode as described above using a separate terminal
* `./scripts/test-e2e.sh` to run e2e tests with [karma](http://karma-runner.github.io) using angular's scenario runner (or `./scripts/test-e2e.bat` on Windows)
* Be aware that changing the SASS files will compile the new CSS while the server is running, but that it won't trigger a e2e test reload, you'll have to manually relaunch the test server fow now

### Common issues

Initial load does not render correctly; scripts are not loading. 
- Occasionally the scripts will not load properly on the initial load. If this occurs, refresh the page. Subsequent refresh will render correctly.

`EMFILE` error
- EMFILE means there are too many open files. Brunch watches all your project files and it's usually a pretty big number. You can fix this error with setting max opened file count to bigger number with command ulimit -n <number> (10000 should be enough).

The complete [Brunch FAQ](https://github.com/brunch/brunch/blob/master/docs/faq.md)

## Contributers

Olivier Combe

For more information on angular please check out <http://angularjs.org>
