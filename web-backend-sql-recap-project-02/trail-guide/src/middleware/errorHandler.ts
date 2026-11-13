
import type { Request, Response, NextFunction } from 'express';

// ========================================
// GLOBAL ERROR HANDLER
// ========================================

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Application error:', err);

  res.status(500).render('site/error', {
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again later.',
  });
}
