import config from 'config'
import winston from 'winston'

const isDev = config.get<boolean>('api.isDevEnvironment')

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'grey',
})

const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  level: isDev ? 'debug' : 'info',
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'MMM DD, YYYY HH:mm:ss:ms' }),
    winston.format.printf((info) => `${info.level} ${info.timestamp} ${info.message}`)
  ),
})

export default logger
