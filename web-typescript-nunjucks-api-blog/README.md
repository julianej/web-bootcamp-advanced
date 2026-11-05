# Server-Side Rendering Blog

A simple, responsive blog application built with Express.js, TypeScript, Bun, and Nunjucks. The project uses the Start Bootstrap Clean Blog theme and demonstrates server-side rendering using Nunjucks templates.

## ✨ Features

- **Blog Listing:** Display all blog posts with their titles, images, authors, publication dates, and summaries.
- **Post Detail Pages:** Each blog post has its own readable URL generated from its title (slug).
- **Dynamic Routing:** Render individual blog posts using Express route parameters.
- **Date Formatting:** Display publication timestamps in a human-readable format.
- **Contact Page:** A contact form built with reusable Nunjucks macros.
- **Reusable Templates:** Use Nunjucks template inheritance and macros to avoid duplicated HTML.
- **Custom 404 Page:** Display a custom page for unavailable content.
- **Static Assets:** Serve CSS, JavaScript, images, and other assets using Express.
- **Responsive Design:** Based on the Bootstrap Clean Blog theme.

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| Bun | JavaScript runtime and package manager |
| TypeScript | Static typing |
| Express.js | Web application framework |
| Nunjucks | Server-side HTML templating |
| Bootstrap 5 | Responsive UI |
| Clean Blog | Website theme |

## 📁 Project Structure

```text
server-side-rendering-blog/
│
├── public/
│   ├── assets/
│   │   ├── img/
│   │   └── favicon.ico
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── scripts.js
│
├── src/
│   ├── data/
│   │   ├── blog.ts
│   │   └── types.ts
│   └── index.ts
│
├── views/
│   ├── macros/
│   │   └── forms.njk
│   ├── base.njk
│   ├── index.njk
│   ├── post.njk
│   ├── contact.njk
│   └── 404.njk
│
├── package.json
├── bun.lock
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have Bun installed.

Check your installation:

```bash
bun --version
```

If Bun is not installed, install it using:

**macOS / Linux:**

```bash
curl -fsSL https://bun.sh/install | bash
```

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd server-side-rendering-blog
```

### 2. Install dependencies

Install all dependencies using Bun:

```bash
bun install
```

Bun will install the dependencies listed in `package.json` and use `bun.lock` to resolve the project dependencies.

### 3. Start the development server

Run the application with Bun's watch mode:

```bash
bun --watch src/index.ts
```

The watch mode automatically restarts the application when source files change.

### 4. Open the application

Visit:

```text
http://localhost:3000
```

## 📜 Available Commands

| Command | Description |
|---|---|
| `bun install` | Install dependencies |
| `bun --watch src/index.ts` | Start development server with watch mode |
| `bun src/index.ts` | Start application |
| `bunx tsc --noEmit` | Run TypeScript type checking |

## 🌐 Application Routes

| Route | Description |
|---|---|
| `/` | Homepage with all blog posts |
| `/index` | Blog listing page |
| `/post/:slug` | Individual blog post |
| `/contact` | Contact page |
| `/about` | Unavailable page / 404 |

### Example Post URLs

Post URLs are generated dynamically from the post titles.

```text
/post/black-the-absence-not-the-presence-of-color
/post/flowers-natures-muse-for-design
/post/udesigns-harmony-core-purpose-and-supporting-details
```

## 🧩 Nunjucks Concepts Used

### Template Inheritance

The `base.njk` template provides the common page structure, including navigation, footer, CSS, and JavaScript references.

Individual pages extend the base template:

```njk
{% extends "base.njk" %}

{% block blogList %}
  <!-- Page-specific content -->
{% endblock %}
```

### Reusable Macros

The contact form uses a reusable macro to generate input fields.

```njk
{% from "macros/forms.njk" import formField %}

{{ formField("Name", "Enter your name...", "text") }}
{{ formField("Email", "Enter your email...", "email") }}
{{ formField("Message", "Enter your message...", "textarea") }}
```

### Dynamic Routing

Express route parameters are used to identify individual blog posts.

```typescript
app.get("/post/:slug", (req, res) => {
  const blogPost = blogPosts.find(
    (post) => slugify(post.title) === req.params.slug,
  );

  if (!blogPost) {
    return res.status(404).send("Post not found");
  }

  res.render("post.njk", { blogPost });
});
```

### Custom Nunjucks Filters

The `safe` filter renders trusted HTML content without escaping HTML tags.

```njk
{{ blogPost.content | safe }}
```

## 📝 Blog Data

Blog posts are currently stored as static data in:

```text
src/data/blog.ts
```

Each blog post contains:

- `title` – Post title
- `image` – Featured image filename
- `author` – Author name
- `createdAt` – Publication timestamp
- `teaser` – Short description
- `content` – Full HTML content

## 🔒 Security Note

Nunjucks autoescaping is enabled to protect against HTML injection.

The `safe` filter is used for blog content that intentionally contains HTML. Only trusted or properly sanitized HTML should be rendered this way.

## 📌 Future Improvements

- Add a database for persistent blog storage.
- Implement blog post creation, editing, and deletion.
- Add search and pagination.
- Implement contact form submission.
- Add input validation and error handling.
- Introduce unit and integration tests.

## 🎨 Credits

- **UI Theme:** Start Bootstrap – Clean Blog
- **CSS Framework:** Bootstrap
- **Template Engine:** Nunjucks
- **Runtime:** Bun

Built with TypeScript, Express.js, Nunjucks, and Bun.
