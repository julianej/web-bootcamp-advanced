# web-typescript-nunjucks-burn-on-read

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

To type check:

```bash
bun check
```

Run `bun fmt` to format the code.

This project was created using `bun init` in bun v1.4.4. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

1. Generate ID
randomUUID()

2. Store message
data/messages/{id}.json

3. Generate URL
/messages/{id}

4. Show URL
created.njk

5. Recipient opens URL
req.params.id

Burn After Reading – Express.js & TypeScript
A simple Burn After Reading web application built with Express.js, TypeScript, Bun, and Nunjucks.

A sender submits a message and receives a unique URL. The recipient can open that URL once. The server reads the message from a text file, deletes the file, and displays the message. Subsequent requests show an unavailable-message page.

Features
Create a secret message through a web form.
Generate a unique UUID-based URL for each message.
Store each message as a separate .txt file in the project-root messages/ directory.
Show the generated URL to the sender.
Read and delete a message when its URL is opened.
Display an unavailable page if the message does not exist or has already been opened.
Render HTML with Nunjucks template inheritance.
Enable Nunjucks autoescaping to help prevent HTML injection and cross-site scripting (XSS).
Log HTTP request information to logs/logs.txt.
Serve static assets from public/.
Tech stack
Bun – JavaScript runtime and package manager
Express 5 – HTTP server and routing
TypeScript – static typing
Nunjucks – server-side HTML templates
Bootstrap 5 – responsive UI styling
Node.js built-in modules – file-system operations, paths, and UUID generation
Requirements
Install Bun before running the project: https://bun.sh/docs/installation

Check that Bun is available:

bun --version
Installation
Clone or download the project, then open a terminal in the project root (the directory containing package.json).

Install dependencies:

bun install
Run the application
Start the development server with file watching:

bun run dev
The application is available at:

http://localhost:3000

To start without watch mode:

bun run start
To run the TypeScript type check:

bun run typecheck
The port defaults to 3000. You can override it with the PORT environment variable.

Project structure
backend-express-advanced-burn-on-read-service/
├── logs/
│   └── logs.txt                  # HTTP request log
├── messages/                     # Stored messages (one file per message)
├── middleware/
│   └── loggerMiddleWare.ts       # Request logging middleware
├── public/
│   └── css/
│       └── style.css             # Custom styles
├── src/
│   ├── index.ts                  # Express application and routes
│   └── service/
│       └── fileService.ts        # Message file operations
├── views/
│   ├── base.njk                  # Shared page layout
│   ├── message.njk               # Message creation form
│   ├── message-created.njk       # Generated link shown to sender
│   └── message-view.njk          # Message shown to recipient
├── .gitignore
├── package.json
├── bun.lock
└── tsconfig.json
How it works
1. Create a message
Open http://localhost:3000. The home page renders views/message.njk, which contains a form that submits the message to:

POST /messages
Content-Type: application/x-www-form-urlencoded
The form field is named message. The route rejects an empty or non-string message with HTTP 400.

2. Store the message and generate a link
The POST route calls storeMessage() in src/service/fileService.ts.

The service:

Generates a UUID using randomUUID().
Builds a file path under the project-root messages/ directory.
Creates the directory if it does not exist.
Writes the message to <uuid>.txt.
Uses the wx write flag so an existing file is not overwritten.
Returns the UUID to the route.
The route builds a URL in this format:

http://localhost:3000/messages/<uuid>
It renders views/message-created.njk and passes the URL as messageUrl. The sender can copy and share this link.

3. Open the message
The recipient opens:

GET /messages/:id
The route calls readAndDeleteMessage(id).

The service validates the ID format, reads the corresponding text file, and deletes it with unlink(). It returns the message text to the route. If the ID is invalid, the file cannot be read, or the file does not exist, the service returns null.

The route renders views/message-view.njk with the message. When the value is null, the template displays an unavailable-message notice.

4. Open the link again
After a successful read and deletion, the file is no longer present. A later request for the same URL therefore receives null from the service and sees the unavailable-message page.

Routes
Method	Path	Description
GET	/	Displays the message creation form
GET	/contact	Displays the message creation form
POST	/messages	Validates and stores a message, then displays its unique link
GET	/messages/:id	Reads and deletes the message, then displays it
Message storage
Messages are stored in the messages/ directory at the project root:

messages/
├── 550e8400-e29b-41d4-a716-446655440000.txt
└── 8d6a8c5e-6c2b-4c2e-9d4e-7b0b7f8f1234.txt
The directory is resolved using:

const MESSAGE_DIRECTORY = path.join(process.cwd(), "messages");
Run the application from the project root so process.cwd() points to the expected directory.

The message files contain plaintext. Do not use this storage approach for highly sensitive production data without adding appropriate encryption, access controls, and operational safeguards.

HTML injection protection
Nunjucks is configured with autoescaping enabled in src/index.ts:

nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app,
  watch: true,
});
The recipient template displays the message using normal Nunjucks interpolation:

{{ message }}
Do not use the safe filter for user-submitted message content:

{# Avoid this for untrusted input #}
{{ message | safe }}
With autoescaping enabled, HTML characters in a submitted message are escaped instead of being interpreted as markup. For example, a submitted <script> tag is displayed as text rather than executed.

Request logging
The logger middleware is defined in middleware/loggerMiddleWare.ts and registered in src/index.ts.

It writes a line to logs/logs.txt after each response finishes. Each entry includes:

Timestamp
HTTP method
Client IP address
Request URL
HTTP response status code
The log file is created if it does not already exist.

The logger records the request URL, which includes the message UUID for message links. It does not intentionally log the submitted message body. Treat log files as operational data and protect them accordingly.

Important limitations and production considerations
This project demonstrates a basic file-based, one-time message workflow. It is not yet a hardened production secret-sharing service.

Concurrent requests: The current read-then-delete implementation uses separate readFile() and unlink() operations. Two requests arriving at nearly the same time could both read the file before either deletes it. Use an atomic claim operation (for example, an atomic rename to a uniquely claimed filename) or a suitable locking/storage mechanism to guarantee one-time access under concurrency.
Plaintext storage: Messages are stored as plaintext files. Consider encryption at rest and strict filesystem permissions for sensitive use cases.
Link security: Anyone who obtains the URL can attempt to open the message. Share links only with the intended recipient and use HTTPS when deployed.
Link previews and scanners: Messaging platforms, email security tools, and browser features may automatically request links. Since opening the URL consumes the message, an automated preview could burn it before the recipient views it. A production design should account for this behavior, for example with a separate confirmation step or a carefully designed retrieval flow.
Expiration: The current implementation does not expire unopened messages. Add a cleanup process and an expiration policy if messages should be removed after a period of time.
Error handling: Add centralized Express error handling and handle filesystem/logging errors robustly before production deployment.
Deployment: The messages/ directory must be on persistent storage. Ephemeral deployment filesystems may lose messages on restart or redeployment.
Logging: Avoid logging message contents, and define retention and access policies for logs.
Useful development commands
bun install          # Install dependencies
bun run dev          # Start development server with watch mode
bun run start        # Start the application
bun run typecheck    # Check TypeScript types
License
No license is specified in this project.
