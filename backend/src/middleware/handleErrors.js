import { logger } from "./logger.js";

export const handleEspecificErrors = (err, req, res, next) => {
  // console.log('handleEspecificErrors');
  // SyntaxError JSON
  if (err instanceof SyntaxError) {
    logger.error(`Status 400 - ${err.toString()}`);
    return res.status(400).json({ isError: true, message:'JSON mal formateado'});
  } else {
    next(err);
  }
}

export const handleMulterErrors = (err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    logger.error(`Status 413 - ${err.toString()}`)
    return res.status(413).json({ isError: true, message: err.message});
  } else {
    next(err)
  }
};

export const handleGenericErrors = (err, req, res, next) => {
  //console.log(err);
  // console.log('handleGenericErrors');
  err.statusCode = err.statusCode || 500;
  logger.error(`Status ${err.statusCode} - ${err.toString()}`);

  return res.status(err.statusCode).json({ isError: true, message: err.message});
};

//res.status(statusCode).json({ isError: true, message, data});