# angular-brunch-seed-no-fuss
### A starter project for AngularJS using Brunch.io

[AngularJS](http://angularjs.org) + [Brunch](http://brunch.io)

Features:
* Full JS & HTML (no Coffeescript, no Jade) / SASS / SCSS automatically compiled on save
* HTML5BP, Modernizr, and all the goodness of [initializr](http://www.initializr.com)
* [Compass-Twitter-Bootstrap](https://github.com/vwall/compass-twitter-bootstrap) integration
* auto-reload during development saves you from manually refreshing the page
* Javascript / CSS minification for production
* [karma](http://karma-runner.github.io) integration for unit & e2e tests
* Bootstrap integration with themes & font awesome.

## Alternate Versions

- [Original angular-brunch-seed](https://github.com/scotch/angular-brunch-seed)
- [Livescript](https://github.com/clkao/angular-brunch-seed-livescript) by [Chia-liang Kao](https://github.com/clkao)
- [angular-brunch-true-north: CoffeeScript + Jade] (https://github.com/scoarescoare/angular-brunch-true-north) - the base for this project

## How to use angular-brunch-seed-no-fuss

* `git clone https://github.com/ocombe/angular-brunch-seed-no-fuss` to clone the **angular-brunch-seed-no-fuss** repository
* `cd angular-brunch-seed-no-fuss`
* `./scripts/init.sh` to install node packages (or `./scripts/init.bat` on Windows).

or if you have **Brunch** installed run:

`brunch new myapp --skeleton https://github.com/ocombe/angular-brunch-seed-no-fuss`

### Running the app during development

* `./scripts/server.sh` to serve using **Brunch** (or `./scripts/server.bat` on Windows).

Then navigate your browser to [http://localhost:3333](http://localhost:3333)

NOTE: Occasionally the scripts will not load properly on the initial
load. If this occurs, refresh the page. Subsequent refresh will render
correctly.
The first compilation is always longer.

### Running the app in production

* `./scripts/production.sh` to minify javascript and css files (or `./scripts/production.bat` on Windows).

Please be aware of the caveats regarding Angular JS and minification, take a look at [Dependency Injection](http://docs.angularjs.org/guide/di) for information.

### Running unit tests

* `./scripts/test.sh` to run unit tests with [karma](http://karma-runner.github.io) (or `./scripts/test.bat` on Windows)
* Open the browser you would like to test to [http://localhost:3334](http://localhost:3334)

Notes:

- Karma will run tests on save. To insure that changes are saved be sure to have `./script/server.sh` or `./script/development.sh` running in the console (or `./script/server.bat` or `./script/development.bat` on Windows).
- You can set the browsers that you would like to target in the `/test/karma_conf.js` file E.g. `browser = ["ChromeCanary", "Firefox"]`

### End to end testing

* Run the app in development mode as described above using a separate terminal
* `./scripts/test-e2e.sh` to run e2e tests with [karma](http://karma-runner.github.io) using angular's scenario runner (or `./scripts/test-e2e.bat` on Windows)
* Be aware that changing the SASS files will compile the new CSS while the server is running, but that it won't trigger a e2e test reload, you'll have to manually relaunch the test server fow now

### Generate documentation

* Make sure that your _public folder is not in production mode (concatenated & without comments)
* `./scripts/docco.sh` to run documentation generation using [docco](http://jashkenas.github.io/docco/) (or `./scripts/docco.bat` on Windows)
* The documentation will be generated in the docs folder

### Common issues

Initial load does not render correctly; scripts are not loading. 
- Occasionally the scripts will not load properly on the initial load. If this occurs, refresh the page. Subsequent refresh will render correctly.

`EMFILE` error
- EMFILE means there are too many open files. Brunch watches all your project files and it's usually a pretty big number. You can fix this error with setting max opened file count to bigger number with command ulimit -n <number> (10000 should be enough).

The complete [Brunch FAQ](https://github.com/brunch/brunch/blob/master/docs/faq.md)

### Receiving updates from upstream

When we upgrade angular-seed's repo with newer angular or testing library code, you can just
fetch the changes and merge them into your project with git.

`git pull origin master`

## Directory Layout

    _public/                  --> Contains generated file for servering the app
                                  These files should not be edited directly
    app/                      --> all of the files to be used in production

      assets                  --> a place for static assets. These files will be copied to
                                  the public directory un-modified.
        font/                 --> [fontawesome](http://fortawesome.github.com/Font-Awesome/) rendering icons
          fontawesome-webfont.*
        img/                  --> image files

      assets/partials/        --> HTML partial files
      assets/index.html       --> Index file
      scripts/                --> base directory for app scripts
        controllers.js        --> application controllers
        directives.js         --> custom angular directives
        filters.js            --> custom angular filters
        services.js           --> custom angular services

      styles/                 --> all custom styles. Acceptable files types inculde: less, sass, scss and stylus
        themes/               --> a place for custom themes
          custom/             --> starter theme **NOTE the underscore (_). Files begining with an underscore will not automatically be compiled, they must be imported.
            _override.sass    --> styles that should beloaded after bootstrap.
            _variables.sass   --> bootstrap variables to be used during the compilation process
        app.scss              --> a file for importing styles.
        _custom.scss          --> a file with a custom style example
      app.js                  --> application definition and routes

    node_modules              --> NodeJS modules

    scripts/                  --> handy shell scripts
      development.sh          --> compiles files and watches for changes
      init.sh                 --> installs node modules
      production.sh           --> compiles and compresses files for production use
      server.sh               --> runs a development server at `http://localhost:3333`
      test.sh                 --> runs all unit tests

    test/                     --> test source files and libraries
      e2e/
        app/
          scenario.js         --> end-to-end specs
      unit/
        controllers.spec.js   --> specs for controllers
        directives.spec.js    --> specs for directives
        filters.spec.js       --> specs for filters
        services.spec.js      --> specs for services
      vendor/
        angular/              --> angular testing libraries
          angular-mocks.js    --> mocks that replace certain angular services in tests
      karma.conf.js           --> unit tests config file
      karma-e2e.conf.js       --> e2e tests config file

    vendor/
      scripts/                --> angular and 3rd party javascript libraries
        angular/                  files are compiled to `vendor.js`
          angular.js          --> the latest angular js
          angular-*.js        --> angular add-on modules
        bootstrap/            --> for responsive layout
          bootstrap-*.js      --> bootstrap js modules
        console-helper.js     --> makes it safe to do `console.log()` always
        jquery.js             --> jquery lib (required by bootstrap)
        modernizr.js          --> to support your progressive enhancement
        respond.js            --> provide media queries support for old browser (ie6/7/8)
      styles/                 --> sapling / sapling themes and 3 party CSS
        bootstrap/            --> boostrap sass files
        font-awesome/         --> font awesome sass files

## Contributers

Olivier Combe

For more information on angular please check out <http://angularjs.org>
