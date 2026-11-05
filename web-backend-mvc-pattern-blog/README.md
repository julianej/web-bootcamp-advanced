## MVC Pattern Challenge

### Scripts
- `npm install`
- `npm run dev` — run with `nodemon` and auto-restart on watched file changes.
- `npm run start` — run app directly with `tsx`.
- `npm run typecheck` — run TypeScript checks (`tsc --noEmit`).


## Verify the Starter Application

Follow these steps to verify that the Express application is working correctly.

### 1. Start the development server

Run the following command in your terminal:

```bash
npm run dev
```

The development server automatically restarts whenever you save a file.

### 2. Open the application

Navigate to:

```text
http://localhost:3000
```

Confirm that the blog homepage loads correctly.

### 3. Test the blog post detail page

- Click on a blog post.
- Confirm that the post detail page loads.
- Check that the publication date is displayed in a human-readable format.

### 4. Test sorting and pagination

Test the following URLs in your browser:

**Oldest posts, page 1:**

```text
http://localhost:3000/?sort=oldest&page=1
```

**Page 2:**

```text
http://localhost:3000/?page=2
```

Confirm that sorting and pagination work as expected.

### 5. Run the TypeScript type check

Open a second terminal window and run:

```bash
npm run typecheck
```

Confirm that TypeScript reports no errors.

### Verification Checklist

- [ ] Development server starts successfully.
- [ ] Server automatically restarts when files are saved.
- [ ] Blog homepage loads at `localhost:3000`.
- [ ] Blog post detail page works.
- [ ] Publication dates are human-readable. 
- [ ] Sorting by oldest posts works. `test /?sort=oldest&page=1`
- [ ] Pagination to page 2 works. `test /?page=2`
- [ ] TypeScript type checking reports no errors. `run npm run typecheck`
