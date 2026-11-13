# Backend Express Advanced – Introduction

## Learning Objectives

- Understand Express middleware and common edge cases.
- Receive HTML form data using `express.urlencoded()` and respond with a redirect.
- Understand what an access log is and why Express middleware is a suitable place to implement logging.
- Build log entries using request data such as HTTP method, URL, IP address, and timestamp.
- Create log files and append new entries using Node.js file system APIs.
- Use `path.join()` and startup checks to store log files in a predictable location.
- Read environment variables using `process.env` and understand when to use `.env` files.
- Debug an Express application using `console.log()` and the Bun Inspector.

## Overview

Express applications often need to perform tasks for every incoming request, rather than inside individual route handlers.

Examples include:

- Logging requests: logger.ts
- Checking authentication: requireApiKey.ts 
- Parsing incoming data
- Handling errors: errorHandler.ts

**Express middleware** provides a central place to implement this shared logic instead of repeating the same code in multiple routes.

### What is an Access Log?

An access log is a record of requests that reach the server.

It helps developers investigate problems such as:

- Routes returning incorrect HTTP status codes.
- Pages failing to load.
- Unexpected server behavior.
- User-reported errors.

A typical log entry contains:

- HTTP method (`GET`, `POST`, etc.)
- Requested URL
- Client IP address
- Timestamp

### Why Use Middleware for Logging?

Logging is a **cross-cutting concern**, meaning it affects multiple parts of an application.

Instead of implementing logging separately in every route handler, middleware allows us to execute the same logging logic centrally for every incoming request.

### Working with HTML Forms

The middleware handout also introduces `express.urlencoded()`.

This middleware parses data submitted through HTML forms and makes it available through `req.body`.

After processing the form data, the server can respond with a redirect using `res.redirect()`.

### Managing Log Files

The next step is working with the Node.js file system APIs.

We will learn how to:

1. Create a log file.
2. Check whether the file already exists.
3. Append new log entries without overwriting existing content.
4. Use `path.join()` to build reliable file paths.
5. Ensure the log file is stored in a predictable location, regardless of where the server is started.

### Environment Variables

Environment variables allow us to store configuration values outside the source code.

For example, instead of hardcoding the server port, we can access it through:

```ts
process.env.PORT
```

A `.env` file can be used during development to define environment variables.

### Debugging

Finally, we will use debugging techniques to inspect the Express application while developing the logger.

Tools and techniques include:

- `console.log()` for inspecting values.
- The Bun Inspector for debugging application execution.
- Inspecting request objects and tracing errors.

## Key Concepts

| Concept | Description |
|---|---|
| Middleware | A function executed during the request-response cycle. |
| Access Log | A record of incoming HTTP requests. |
| `req` | The request object containing information about the incoming request. |
| `res` | The response object used to send a response to the client. |
| `express.urlencoded()` | Parses URL-encoded HTML form data. |
| `res.redirect()` | Redirects the client to another URL. |
| `fs` | Node.js module for file system operations. |
| `path.join()` | Combines path segments into a platform-independent path. |
| `process.env` | Provides access to environment variables. |
| `.env` | A file commonly used to store environment variables during development. |

## Main Takeaway

Middleware is especially useful for functionality that should run independently of a specific route.

Logging is a perfect example: every incoming request should be recorded, regardless of whether the user visits `/`, `/about`, or `/api/trails`.