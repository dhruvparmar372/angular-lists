module.exports = {
	startServer: function() {
		var express = require('express'),
			app = express();

		app.configure(function() {

			app.use(express.errorHandler({
				dumpExceptions: true,
				showStack: true
			}));

			app.use(express.logger({
				format: ':method :url'
			}));

			app.use(express.bodyParser());

			// Gzip content
			app.use(express.compress());

			app.use(express.static(__dirname + "/public"));

			return app.use(express.methodOverride());
		});

		app.get('/', function(request, response) {
			return response.sendfile('public/index.html');
		});

		return app.listen(process.env.PORT || 3333, function() {
			return console.log("Listening on port 3333…");
		});
	}
};