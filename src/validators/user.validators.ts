import Joi from "joi";

import { RoleEnum } from "../enums/role.enum";

export const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required().messages({
    "string.base": "Username must be a string",
    "string.alphanum": "Username must only contain letters and numbers",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must be less than or equal to 30 characters",
    "any.required": "Username is required",
  }),
  age: Joi.number().integer().min(0).max(120).required().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "Age must be at least 0",
    "number.max": "Age must be less than or equal to 120",
    "any.required": "Age is required",
  }),
  email: Joi.string()
    .email()
    .min(5)
    .max(50)
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email must contain @ and follow a valid format",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 6 characters long",
      "string.max": "Password must be less than or equal to 50 characters",
      "string.pattern.base":
        "Password must contain at least one letter and one digit",
      "any.required": "Password is required",
    }),
  phone: Joi.string()
    .pattern(/^[\d\+\-]+$/)
    .optional()
    .messages({
      "string.base": "Phone must be a string",
      "string.pattern.base": "Phone must only contain numbers",
    }),
  role: Joi.string()
    .valid(...Object.values(RoleEnum))
    .optional()
    .messages({
      "string.base": "Role must be a string",
      "string.valid": "Role must be one of the valid roles",
    }),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).optional().messages({
    "string.base": "Username must be a string",
    "string.alphanum": "Username must only contain letters and numbers",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must be less than or equal to 30 characters",
  }),

  age: Joi.number().integer().min(0).max(120).optional().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "Age must be at least 0",
    "number.max": "Age must be less than or equal to 120",
  }),

  email: Joi.string()
    .email()
    .optional()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email must contain @ and follow a valid format",
    }),

  phone: Joi.string().pattern(/^\d+$/).optional().messages({
    "string.base": "Phone must be a string",
    "string.pattern.base": "Phone must only contain numbers",
  }),
});
