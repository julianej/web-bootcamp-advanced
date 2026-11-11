// Whenever somebody visits your website, the logger records:
// - Timestamp: When the request happened.
// - Method: What kind of request (GET, POST, etc.).
// - URL: Which page or endpoint was requested.
// - Status code: Whether the request succeeded (200), failed (404), etc.
// - also called LOGGER
// - DISPLAY LOGS cat logs/access.log


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
