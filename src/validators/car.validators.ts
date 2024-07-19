import Joi from "joi";

export const createCarSchema = Joi.object({
  model: Joi.string().alphanum().min(2).max(20).required().messages({
    "string.base": "Model must be a string",
    "string.alphanum": "Model must only contain letters and numbers",
    "string.min": "Model must be at least 3 characters long",
    "string.max": "Model must be less than or equal to 30 characters",
    "any.required": "Model is required",
  }),
  price: Joi.number().integer().min(0).max(10000000).required().messages({
    "number.base": "Price must be a number",
    "number.integer": "Price must be an integer",
    "number.min": "Price must be at least 0",
    "number.max": "Price must be less than or equal to 10000000",
    "any.required": "Price is required",
  }),
  year: Joi.number().integer().min(1920).max(2024).required().messages({
    "number.base": "year must be a number",
    "number.integer": "Year must be an integer",
    "number.min": "Year must be at least 1920",
    "number.max": "Year must be less than or equal to 2024",
    "any.required": "Year is required",
  }),
});

export const updateCarSchema = Joi.object({
  model: Joi.string().alphanum().min(2).max(20).optional().messages({
    "string.base": "Model must be a string",
    "string.alphanum": "Model must only contain letters and numbers",
    "string.min": "Model must be at least 3 characters long",
    "string.max": "Model must be less than or equal to 30 characters",
  }),
  price: Joi.number().integer().min(0).max(10000000).optional().messages({
    "number.base": "Price must be a number",
    "number.integer": "Price must be an integer",
    "number.min": "Price must be at least 0",
    "number.max": "Price must be less than or equal to 10000000",
  }),
  year: Joi.number().integer().min(1920).max(2024).optional().messages({
    "number.base": "year must be a number",
    "number.integer": "Year must be an integer",
    "number.min": "Year must be at least 1920",
    "number.max": "Year must be less than or equal to 2024",
  }),
});
