var morgan = require('morgan'), // used for logging incoming request
  bodyParser = require('body-parser'),
  path = require('path'),
  helpers = require('./helpers.js');


module.exports = function(app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var apiRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, '../../app')));
  app.use('/bower_components', express.static(path.join(__dirname, '../../bower_components')));

  app.use('/api', apiRouter); // use user router for all user request

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../api/apiRoutes.js')(apiRouter);
};
