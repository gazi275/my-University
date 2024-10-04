import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

 const validateMiddleware = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync(req.body); // Directly pass `req.body`
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          // Handle Zod validation errors
          return res.status(400).json({ errors: error.errors });
        }
  
        // If it's some other kind of error, handle it differently or rethrow it
        return res.status(500).json({ message: "Something went wrong" });
      }
    };
  };
  export default validateMiddleware