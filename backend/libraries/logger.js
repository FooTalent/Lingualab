import winston from 'winston'
const mode = 'development'

const { simple, combine, timestamp, colorize, errors } = winston.format;

const customOption = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal:'red',
    error:'red',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'white'
  }
}
const transportOption = {
  development: [
    new winston.transports.Console({
      level: 'debug',
      format: combine(
        errors({ stack: true }),
        colorize({colors: customOption.colors}),
        simple(),
        timestamp()
      )
    }),
  ],
  production: [
    new winston.transports.Console({
      level: 'info',
      format: combine(
        colorize({colors: customOption.colors}),
        simple(),
        timestamp()
      )
    }),
    new winston.transports.File({
      filename: './errors.log',
      level: 'error',
      format: combine(
        simple(),
        timestamp()
    )})
  ]
}

export const logger = winston.createLogger({
  levels: customOption.levels,
  transports: transportOption[mode]
})

export const addLogger = (req, res, next) => {
  req.logger = logger
  req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)


  next()
}