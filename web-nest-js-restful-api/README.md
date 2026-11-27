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

Task01:

```bash
Reject Invalid Threads and Comments
Cyber Chat stores whatever a client sends. A thread without a title lands in the database, 
and a client that sends the id of an existing thread overwrites that thread, author included. 
Every request body gets rules, and requests that break them never reach the database.
```

Task02

```bash
Edit a Thread
Typos happen. Authors want to fix the title or the text of a thread without deleting it,
and a change follows the same rules as a new thread. The author of a thread never changes.
If your Cyber Chat can edit threads already, rebuild the route with these rules.
```

Task03

```bash
Answer with Public Fields Only
Moderators are going to keep an internal note on threads, 
for example why they watch a discussion. The note must never reach the API, 
but right now every column of a thread goes straight into the JSON.
The responses get a fixed shape that new columns cannot change.
The new column of the Thread entity:

@Column({ type: "text", nullable: true })
moderationNote: string | null;
```

Task04
```bash
Bonus: Threads Since a Date
Regular visitors only want to read what is new since their last visit.
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
