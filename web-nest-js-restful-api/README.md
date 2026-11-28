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

Done when
POST /threads with { "title": "", "author": "ada", "body": "Hi" }
answers with 400 and the message title should not be empty.
```

<img width="2560" height="1002" alt="Bildschirmfoto 2026-11-28 um 11 14 45" src="https://github.com/user-attachments/assets/8984ab16-5102-4f6d-9b3f-06a8ab9de2b1" />


Task02

```bash
Edit a Thread
Typos happen. Authors want to fix the title or the text of a thread without deleting it,
and a change follows the same rules as a new thread. The author of a thread never changes.
If your Cyber Chat can edit threads already, rebuild the route with these rules.

Done when
After PATCH /threads/<id> with { "title": "Fixed" },
GET /threads/<id> shows the new title and the old body.
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
Status Codes That Tell the Truth
Developers who build clients for Cyber Chat read the status codes, not the bodies. 
Deleting a thread answers with 200 and an empty body, and a mistyped ID in a URL answers with 404,
as if the thread had been deleted. Both mislead their code.

Done when
DELETE /threads/<id> answers with 204 and an empty body,
and GET /threads/abc answers with 400.
```

Task05
```bash
Bonus: Threads Since a Date
Regular visitors only want to read what is new since their last visit.

Done when
GET /threads?since=2099-01-01 returns an empty array,
and GET /threads?since=yesterday answers with 400.
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

Add your API requests

```bash
Create these requests in Bruno. Use your existing API routes:
Request	Method	Endpoint	Expected
Get all threads	GET	/threads	200
Get one thread	GET	/threads/{{threadId}}	200
Create thread	POST	/threads	201
Create comment	POST	/threads/{{threadId}}/comments	201
Update thread	PATCH	/threads/{{threadId}}	200
Delete thread	DELETE	/threads/{{threadId}}	200 or 204, depending on your implementation
Get authors	GET	/authors	200
Invalid thread	POST	/threads	400
```

<img width="2554" height="1064" alt="Bildschirmfoto 2026-11-28 um 11 30 41" src="https://github.com/user-attachments/assets/10c845f9-e757-4d8e-bd1c-caa110cd88a5" />



