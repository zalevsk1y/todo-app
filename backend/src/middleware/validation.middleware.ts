import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

export const validateTodoData = (): ValidationChain[] => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isString()
      .withMessage('Name must be a string')
      .trim()
      .isLength({ max: 255 }) 
      .withMessage('Name cannot be longer than 255 characters'),
    body('status')
      .optional() 
      .isBoolean()
      .withMessage('Status must be a boolean if provided')
      .toBoolean() 
  ];
};

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
