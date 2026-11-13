import type { Request, Response } from 'express';

export function notFoundHandler(
  _req: Request,
  res: Response
): void {
  res.status(404).render('site/404', {
    title: 'Page not found',
    message: 'The page you are looking for does not exist.',
  });
}