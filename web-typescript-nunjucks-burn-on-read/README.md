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