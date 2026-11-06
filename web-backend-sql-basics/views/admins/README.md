## 2. Admin Panel CRUD

Build an admin section on top of the refactored blog project that allows a content editor to manage blog posts using CRUD operations (Create, Read, Update, Delete).

The admin panel does not require authentication for this task.

### Features

- **View Posts:** Display all existing blog posts in an admin overview.
- **Create Posts:** Add new blog posts using an empty form.
- **Edit Posts:** Update existing blog posts using a pre-filled form.
- **Delete Posts:** Remove existing blog posts.


## 2. Admin Panel CRUD

Build an admin section on top of the refactored blog project that allows a content editor to manage blog posts using CRUD operations (Create, Read, Update, Delete).

The admin panel does not require authentication for this task.

### Project Structure

Extend the existing MVC project with the following structure:

```text
web-backend-mvc-pattern-blog/
│
├── controllers/
│   ├── postController.ts
│   └── adminController.ts
│
├── routes/
│   ├── index.ts
│   └── admin.ts
│
├── data/
│   └── post.ts
│
├── utils/
│   └── helper.ts
│
├── views/
│   ├── layouts/
│   │   └── base.njk
│   │
│   ├── components/
│   │   ├── postPreview.njk
│   │   ├── pageHeader.njk
│   │   └── formField.njk
│   │
│   ├── admin/
│   │   ├── index.njk
│   │   └── postForm.njk
│   │
│   ├── index.njk
│   ├── post.njk
│   ├── postExample.njk
│   ├── about.njk
│   └── contact.njk
│
└── app.ts
```

### Features

- **View Posts:** Display all existing blog posts in an admin overview.
- **Create Posts:** Add new blog posts using an empty form.
- **Edit Posts:** Update existing blog posts using a pre-filled form.
- **Delete Posts:** Remove existing blog posts.

### Routes

Implement the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin` | Renders a list of all posts with edit and delete buttons next to each entry. |
| `GET` | `/admin/posts/new` | Renders an empty form for creating a new post. |
| `POST` | `/admin/posts` | Creates a new post from the form submission and redirects to `/admin`. |
| `GET` | `/admin/posts/:slug/edit` | Renders a form pre-filled with the existing post data. |
| `POST` | `/admin/posts/:slug` | Saves the edited post and redirects to `/admin`. |
| `POST` | `/admin/posts/:slug/delete` | Deletes the selected post and redirects to `/admin`. |

### Expected Functionality

1. The admin overview displays all available posts.
2. Each post has an edit button that opens its corresponding edit form.
3. Each post has a delete button that submits a POST request to remove it.
4. The create button opens an empty post form.
5. Submitting the create form saves the new post.
6. Submitting the edit form updates the existing post.
7. After creating, updating, or deleting a post, the user is redirected to `/admin`.

### Technical Requirements

- Follow the existing MVC architecture.
- Keep route definitions separate from controller logic.
- Handle post data operations in the data layer.
- Use Nunjucks templates for rendering the admin interface and forms.
- Use URL slugs to identify individual posts.
- Reuse the existing