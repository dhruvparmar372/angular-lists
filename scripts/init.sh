#!/bin/bash

rm -rf node_modules
rm -rf vendor
npm install && node_modules/.bin/bower install
