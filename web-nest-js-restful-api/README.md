# web-nest-js-typeorm

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
This project was created using `bun init` in bun v1.4.4.
[Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

Task:

```bash
Reject Invalid Threads and Comments
Cyber Chat stores whatever a client sends. A thread without a title lands in the database, 
and a client that sends the id of an existing thread overwrites that thread, author included. 
Every request body gets rules, and requests that break them never reach the database.
```

Test with Bruno:

```bash
web-nest-js-typeorm/
├── bruno/
│   ├── bruno.json
│   ├── environments/
│   │   └── local.bru
│   ├── threads/
│   │   ├── get-threads.bru
│   │   ├── get-thread.bru
│   │   ├── create-thread.bru
│   │   ├── update-thread.bru
│   │   ├── delete-thread.bru
│   │   └── create-comment.bru
│   └── authors/
│       └── get-authors.bru
├── src/
├── package.json
└── ...
```
