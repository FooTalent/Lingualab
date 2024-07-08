const handleResponses = (req, res, next) => {
  // RESPONSES
  const responses = (statusCode, isError = false , message = "", data = {}) => res.status(statusCode).json({ isError, message, data});

  // SIMPLES
  res.sendSuccess = (data, message = "Success") => responses(200, false, message, data);
  res.sendCreated = (data, message = "Created") => responses(201, false, message, data);
  res.sendNoContent = (data, message = "No content") => responses(204, false, message, data);
  res.sendUserError = (message = "Bad Request", data) => responses(400, true, message, data);
  res.sendUserUnAuthorized = (message = "Unauthorized", data) => responses(401, true, message, data);
  res.sendUserForbidden = (message = "Forbidden", data) => responses(403, true, message, data);
  res.sendNotFound = (message = "Not Found", data) => responses(404, true, message, data);
  res.sendServerError = (message = "Internal Server Error", data) => responses(500, true, message, data);

  // MULTIPLES
  res.sendSuccessOrNotFound = (variable, title = "Item") => (variable) ? res.sendSuccess(variable) : res.sendNotFound(`${title} not found`);
  res.sendCatchError = (error, message = "Internal Server Error") => res.sendServerError(message, error.toString());
  
  next();
}

export default handleResponses;