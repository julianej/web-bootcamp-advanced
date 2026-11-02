# web-typescript-backend-nunjucks

To install dependencies:
```bash
$ npm install nunjucks
```

```bash
bun install
```

To run:

```bash
bun run index.js
```

To type check:

```bash
bun check
```

Run `bun fmt` to format the code.

This project was created using `bun init` in bun v1.4.4. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.


my-express-app/
│
├── .prettierrc       ← NEW FILE
├── package.json
├── tsconfig.json
│
├── src/
│   └── app.ts
│
└── views/
    └── app.njk



bun install --dev prettier prettier-plugin-jinja-template
bun run src/app.ts
bun install cors
bun add -d @types/cors
bun install --dev @types/cors

npm run dev          
> web-typescript-backend-nunjucks@1.0.0 dev
> bun --watch src/app.ts


~/Doc/G/web-bootcamp-advanced/web-typescript-backend-nunjucks on main ?1 ❯ find . -maxdepth 2 -not -path './node_modules*' -not -path './.git*' -type f
./index.js
./bun.lock
./README.md
./package.json
./.env
./.prettierrc
./view/app.njk
./tsconfig.json
./CLAUDE.md
./src/app.ts
~/Doc/G/web-bootcamp-advanced/web-typescript-backend-nunjucks on main ?1 ❯  at 13:27:28