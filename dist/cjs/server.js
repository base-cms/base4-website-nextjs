'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_2 = require('./chunk-efb9fd9b.js');
var __chunk_1 = require('./chunk-9e05845b.js');
var next = _interopDefault(require('next'));
var baseWebsite = _interopDefault(require('@base-cms/base4-website-express'));
var path = require('path');
var nextRoutes = _interopDefault(require('next-routes'));

var isFn = function isFn(v) {
  return typeof v === 'function';
};

var isArray = Array.isArray;
/**
 *
 * @param {object} options The server options.
 * @param {string} options.dir The directory of the Next app.
 * @param {boolean} [options.dev] Whether to run Next is dev mode.
 * @param {array} [options.routeDefs] The route definitions.
 * @param {number} [options.port=3005] The port to run the webserver on.
 * @param {object} [options.webServerOpts] Additional options to send to the web server.
 * @param {function} [options.beforePrepare]
 * @param {function} [options.beforeListen]
 */

var server = /*#__PURE__*/
__chunk_1._asyncToGenerator(
/*#__PURE__*/
__chunk_2._regeneratorRuntime.mark(function _callee() {
  var _ref2,
      dir,
      _ref2$dev,
      dev,
      routeDefs,
      _ref2$port,
      port,
      webServerOpts,
      beforePrepare,
      beforeListen,
      routes,
      app,
      webserver,
      server,
      _args = arguments;

  return __chunk_2._regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, dir = _ref2.dir, _ref2$dev = _ref2.dev, dev = _ref2$dev === void 0 ? process.env.NODE_ENV !== 'production' : _ref2$dev, routeDefs = _ref2.routeDefs, _ref2$port = _ref2.port, port = _ref2$port === void 0 ? 3005 : _ref2$port, webServerOpts = _ref2.webServerOpts, beforePrepare = _ref2.beforePrepare, beforeListen = _ref2.beforeListen;

          if (isArray(routeDefs)) {
            _context.next = 3;
            break;
          }

          throw new Error('No route definitions were provided!');

        case 3:
          routes = nextRoutes();
          routeDefs.forEach(function (def) {
            return routes.add(def);
          }); // Create the NextJS app.

          app = next({
            dev: dev,
            dir: path.resolve(dir)
          }); // Call the `beforePrepare` hook, if specified.

          if (!isFn(beforePrepare)) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return beforePrepare(app);

        case 9:
          _context.next = 11;
          return app.prepare();

        case 11:
          // Create the Base4 Express server (but do not listen).
          webserver = baseWebsite(webServerOpts).use(routes.getRequestHandler(app)); // Call the `beforeListen` hook, if specified.

          if (!isFn(beforeListen)) {
            _context.next = 15;
            break;
          }

          _context.next = 15;
          return beforeListen(webserver, app);

        case 15:
          _context.next = 17;
          return new Promise(function (res, rej) {
            webserver.listen(port, function listen(err) {
              if (err) {
                rej(err);
              } else {
                res(this);
              }
            });
          });

        case 17:
          server = _context.sent;
          return _context.abrupt("return", {
            app: app,
            server: server
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

module.exports = server;
