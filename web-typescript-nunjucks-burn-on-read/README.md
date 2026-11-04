# Burn-on-Read Service

A small Express application built with TypeScript and Nunjucks that allows a user to create a secret message and share it through a unique, one-time link.

Once the recipient opens the link, the message is displayed and its stored file is deleted. The link cannot be used again.

## Features

- Create a secret message using a text field.
- Generate a unique ID for every message using Node.js `randomUUID()`.
- Store messages as JSON files.
- Generate a unique URL for each stored message.
- Display the generated link to the sender.
- Allow a recipient to open a message exactly once.
- Delete the message file after it has been opened.
- Prevent HTML injection using Nunjucks autoescaping.
- Display an error page if a message is missing or has already been opened.

## Tech Stack

- **TypeScript** – application logic and type safety.
- **Express.js** – HTTP server and routing.
- **Nunjucks** – server-side HTML templating.
- **Node.js File System API** – file-based message storage.
- **Node.js Crypto API** – UUID generation.
- **CSS** – application styling.
- **Bun** – development runtime.

## Project Structure

```text
web-typescript-nunjucks-burn-on-read/
├── data/
│   └── messages/
├── public/
│   └── css/
│       └── styles.css
├── src/
│   ├── services/
│   │   └── messageStore.ts
│   ├── routes/
│   ├── app.ts
│   └── types.ts
├── views/
│   ├── layouts/
│   │   └── base.njk
│   ├── index.njk
│   ├── created.njk
│   ├── message.njk
│   └── not-found.njk
├── package.json
└── tsconfig.json
```

## Application Workflow

1. The sender opens the home page.
2. The sender enters a message into the text field.
3. Express receives the form submission through a POST request.
4. The message storage service generates a unique UUID.
5. The message is saved as a JSON file in `data/messages/`.
6. Express generates a unique URL containing the UUID.
7. The sender receives the link and can share it with the recipient.
8. The recipient opens the link through a GET request.
9. The application retrieves and deletes the message file.
10. The message is displayed to the recipient.
11. Subsequent requests to the same link return a 404 response.

## Implementation Details

### 1. Message ID generation

The message storage service generates a unique identifier using Node.js `randomUUID()`.

```typescript
import { randomUUID } from "node:crypto";

const id = randomUUID();
```

The storage service is responsible for generating IDs because it manages file creation and persistence.

### 2. File storage

Messages are stored as JSON files in:

```text
data/messages/
```

The filename is generated using the UUID:

```typescript
const filePath = path.join(storageDirectory, `${id}.json`);
```

The message is written using Node.js `writeFile()`:

```typescript
await writeFile(filePath, JSON.stringify(message), {
  encoding: "utf-8",
  flag: "wx",
});
```

### 3. Unique link generation

After storing the message, the Express route generates a unique URL:

```typescript
const id = await createMessage(content);

const link = `${req.protocol}://${req.get("host")}/messages/${id}`;
```

The generated link is passed to the Nunjucks template and displayed to the sender.

### 4. HTML injection protection

Nunjucks is configured with automatic escaping:

```typescript
nunjucks.configure(path.resolve("views"), {
  autoescape: true,
  express: app,
  watch: false,
});
```

User-submitted messages are displayed using normal Nunjucks interpolation:

```njk
{{ message }}
```

This ensures that HTML characters are escaped instead of being interpreted as executable markup.

The `safe` filter is intentionally not used for user-submitted content.

### 5. One-time message consumption

The `consumeMessage()` function in `messageStore.ts` handles retrieving and deleting messages.

The implementation uses:

- `rename()` to atomically claim the original file.
- `readFile()` to retrieve the message content.
- `unlink()` to delete the claimed file.

Renaming the file before reading it prevents two concurrent requests from successfully consuming the same message.

If the original file does not exist, the service returns `null`.

### 6. Handling unavailable messages

If a message is missing or has already been opened, Express returns:

```typescript
return res.status(404).render("not-found.njk");
```

The recipient sees an explanatory error page instead of the message.

## Routes

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Displays the message creation form |
| POST | `/messages` | Creates and stores a message |
| GET | `/messages/:id` | Opens and consumes a message |

## Review Questions

### Which part of the app should create the file name or ID?

The message storage service (`messageStore.ts`) generates the UUID using `randomUUID()`.

This separates file management from HTTP request handling and ensures that IDs are generated internally.

### Where should files be stored so the path stays predictable?

Messages are stored in the dedicated `data/messages/` directory.

The storage path is constructed using Node.js `path.resolve()` and `path.join()`.

### What should happen if a user opens an expired or missing link?

The application returns HTTP `404 Not Found` and displays an explanatory page.

The message must not be accessible again after it has been consumed.

### Which requests should appear in the access log?

The application should log:

- Successful message creation.
- Successful message consumption.
- Attempts to access missing or already-consumed messages.
- Unexpected server errors.

The actual message content should never be written to the logs.

## Testing

The application can be tested manually in the browser.

1. Open the home page.
2. Enter a message and submit the form.
3. Verify that a unique link is generated.
4. Check that a JSON file appears in `data/messages/`.
5. Open the generated link.
6. Verify that the message is displayed.
7. Check that the JSON file has been deleted.
8. Open the same link again and verify that the application returns HTTP 404.
9. Submit HTML such as `<script>alert("XSS")</script>` and verify that it is displayed as text rather than executed.

## Running the Application

Install dependencies:

<<<<<<< HEAD
```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Open the application:

```text
http://localhost:3000
```

Run the TypeScript check:

```bash
bun run check
```
=======
'bun install # Install dependencies
'bun run dev # Start development server with watch mode'
'bun run start # Start the application'
'bun run typecheck # Check TypeScript types'
>>>>>>> a510d3a24a422583be1032c23114109b1da61f58

---

<<<<<<< HEAD
**Project goal:** Demonstrate server-side rendering, Express routing, TypeScript, filesystem operations, unique identifier generation, secure output escaping and one-time resource consumption.
=======
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

>>>>>>> a510d3a24a422583be1032c23114109b1da61f58
