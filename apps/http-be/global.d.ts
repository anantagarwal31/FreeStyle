import "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // now req.userId is recognized everywhere
    }
  }
}
