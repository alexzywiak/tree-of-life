var express     = require('express');

var app = express();

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js

var port = process.env.PORT || 4568;

app.listen(port, '104.131.49.98');

console.log('Making Digital Magic on 104.131.49.98' + port);

module.exports = app;