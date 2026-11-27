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

This project was created using `bun init` in bun v1.4.4. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

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
