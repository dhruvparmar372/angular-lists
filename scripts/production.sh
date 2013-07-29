#!/bin/bash

rm -rf public
node_modules/.bin/brunch build -o
