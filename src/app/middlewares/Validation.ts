import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

 const validateMiddleware = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync(req.body); // Directly pass `req.body`
        next();
      } catch (error) {
        return res.status(400).json({ error: error.errors }); // Respond with a 400 and validation errors
      }
    };
  };
  export default validateMiddleware