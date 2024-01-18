const log = (level, message) => {
    const colors = {
        error: '\x1b[31m', // red
        warn: '\x1b[33m', // yellow
        info: '\x1b[37m', // white
        success: '\x1b[32m' // green
    };

    const logLevel = colors[level] || '';
    const logMessage = `${logLevel}[${new Date().toLocaleString()}] ${message}\x1b[0m`;

    console.log(logMessage);
};

exports.error = (message) => log('error', message);
exports.warn = (message) => log('warn', message);
exports.info = (message) => log('info', message);
exports.success = (message) => log('success', message);
