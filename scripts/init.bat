rd /s /q node_modules
rd /s /q vendor
npm install && %~dp0/../node_modules/.bin/bower install
