import type { Request, Response, NextFunction } from 'express';

export function apiKeyAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const apiKey = req.headers['x-api-key'];

  if (!process.env.API_KEY || apiKey !== process.env.API_KEY) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized. Invalid API key.',
    });
    return;
  }

  next();
}
