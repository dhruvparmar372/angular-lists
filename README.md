### Angular Lists. Angular project with Brunch.

[AngularJS](http://angularjs.org) + [Brunch](http://brunch.io)

Demo - http://dhruvparmar372.github.io/angular-lists

Features:
* Maintain user lists for any organization.
* Search for users.
* Tag Based search - e.g "Role:Admin,Status:Inactive". Live filtering
* All records stored localStorage.  
* Paginated Records.
* Smooth Transitions using Angular Animate.
* Responsive Design.
* [karma](http://karma-runner.github.io) integration for unit & e2e tests


## How to Deploy

* `git clone https://github.com/dhruvparmar372/angular-test` to clone repository
* `cd angular-test`
* `npm install` to install node & bower packages
* if prompted for angular version choose 1.2.16

### Running the app during development

* `npm start` to serve using **Brunch**

Then navigate your browser to [http://localhost:3333](http://localhost:3333)
If you use your own server, you can use the development script :

* `npm run-script dev`

### Running the app in production

* `npm run-script prod` to minify javascript and css files for production deployment


### Running unit tests

* `npm test` to run unit tests with [karma](http://karma-runner.github.io)
* Open the browser you would like to test to [http://localhost:3334](http://localhost:3334)


This project has been forked from the following starter kit https://github.com/ocombe/angular-brunch-seed-no-fuss.
