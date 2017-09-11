const tracer = require('tracer');
const debug = require('debug');

const defaultOpts = {
  dateformat: "yyyy-mm-dd HH:MM:ss.L",
  color: true,
  file: true,
}

const getLogger = function(_opts) {
  let opts = Object.assign({}, defaultOpts, _opts);
  let fn;
  if(opts.color) {
    fn = tracer.colorConsole;
  }else {
    fn = tracer.console;
  }
  let settings = {
    dateformat: opts.dateformat,
    inspectOpt: {
      showHidden: false,
      depth: null
    }
  };
  
  let logger = fn(settings);
  let daily = tracer.dailyfile({root:'./logs', maxLogFiles: 10, allLogsFileName: 'app'});

  let wrap = function(method) {
    return function(...args) {
      if(opts.file) {
        daily[method](...args);
      }
      logger[method](...args);
    }
  }

  return {
    log: wrap('log'),
    trace: wrap('trace'),
    debug: wrap('debug'),
    info: wrap('info'),
    warn: wrap('warn'),
    error: wrap('error'),
  };
}

module.exports = getLogger;
