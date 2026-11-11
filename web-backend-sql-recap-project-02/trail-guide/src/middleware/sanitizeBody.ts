
import type { Request, Response, NextFunction } from 'express';

// SANITIZE STRING VALUES
function sanitizeValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return value
      .trim()
      .replace(/<[^>]*>/g, '');
  }

  // HANDLE ARRAYS
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  // HANDLE OBJECTS
  if (value !== null && typeof value === 'object') {
    return sanitizeObject(value as Record<string, unknown>);
  }

  // KEEP NUMBERS, BOOLEANS AND NULL UNCHANGED
  return value;
}

// SANITIZE OBJECT PROPERTIES
function sanitizeObject(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = sanitizeValue(value);
  }

  return sanitized;
}

// EXPRESS MIDDLEWARE
export function sanitizeBody(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }

  next();
}
