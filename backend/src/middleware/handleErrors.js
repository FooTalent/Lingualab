import { logger } from "./logger.js";

export const handleEspecificErrors = (err, req, res, next) => {
  // console.log('handleEspecificErrors');
  // SyntaxError JSON
  if (err instanceof SyntaxError) {
    logger.error(err.toString());
    return res.status(400).json({ isError: true, message:'JSON mal formateado'});
  }
  next(err);
}

export const handleGenericErrors = (err, req, res, next) => {
  //console.log(err);
  // console.log('handleGenericErrors');
  err.statusCode = err.statusCode || 500;
  logger.error(err.toString());

  res.status(err.statusCode).json({ isError: true, message: err.message});
};

//res.status(statusCode).json({ isError: true, message, data});