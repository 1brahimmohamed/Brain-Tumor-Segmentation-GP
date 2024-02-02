import Pino from 'pino';

const logger = Pino({
    prettyPrint: {
        colorize: true,
    },
    formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
    },
});


export default logger;

