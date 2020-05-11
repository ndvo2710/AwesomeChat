import log4js from 'log4js';

const defaultLevel = 'debug';

// eslint-disable-next-line no-console
console.log('http://localhost:3000');
console.log('https://localhost:3000');
// eslint-disable-next-line no-console
console.log(`log default level is :  ${defaultLevel}`);

log4js.configure({
  levels: { info: { value: 20000, colour: 'green' } },
  appenders: { err: { type: 'stderr' } },
  categories: { default: { appenders: ['err'], level: defaultLevel } },
});

const { getLogger } = log4js;
const { connectLogger } = log4js;
const expressLogger = log4js.connectLogger(log4js.getLogger('express'), {
  level: log4js.levels.INFO,
  format: (req, res, format) => {
    let logSwitch = true;
    const excludeUrlPatterns = ['bower_components', '/css', '/js', '/images'];
    excludeUrlPatterns.forEach((ePattern) => {
      if (req.originalUrl.includes(ePattern)) {
        logSwitch = false;
      }
    });
    if (logSwitch) {
      return format(
        `":method :url"\n_query: ${JSON.stringify(
          req.query,
          null,
          2
        )}\n_body(post method only): ${JSON.stringify(
          req.body,
          null,
          2
        )}\n_session:${JSON.stringify(req.session, null, 2)}`
      );
    }
  },
});

export { getLogger, connectLogger, expressLogger };
