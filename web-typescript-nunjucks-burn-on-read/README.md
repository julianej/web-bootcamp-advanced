# web-typescript-nunjucks-burn-on-read

To install dependencies:

bun install          # Install dependencies
bun run dev          # Start development server with watch mode
bun run start        # Start the application
bun run typecheck    # Check TypeScript types

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

