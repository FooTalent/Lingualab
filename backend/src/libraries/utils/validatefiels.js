import AppError from "../../config/AppError.js";

const validateFields = (fields, requiredFields) => {
  const missingFields = [];

  for (const field of requiredFields) {
    if (!fields[field]) {
      missingFields.push(field);
    }
  }
  if (missingFields.length > 0) {
    throw new AppError(`Debe completar los siguientes campos: ${missingFields.join(', ')}`, 400);
  }
  return fields;
};

export default validateFields;