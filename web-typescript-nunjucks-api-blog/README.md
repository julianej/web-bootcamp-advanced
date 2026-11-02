web-typescript-backend-clean-blog/
├── src/
│   ├── app.ts
│   ├── posts.json
│   └── utils/
│       └── slugify.ts
├── views/
│   ├── layouts/
│   │   └── base.njk
│   ├── macros/
│   │   └── forms.njk
│   ├── index.njk
│   ├── post.njk
│   └── contact.njk
├── public/
│   ├── css/
│   ├── assets/
│   └── img/
├── package.json
└── tsconfig.json


1. bun init

2. Download the Clean Blog theme
mkdir -p public
mkdir -p public/img

3. Download the Clean Blog theme
git clone https://github.com/StartBootstrap/startbootstrap-clean-blog.git /tmp/startbootstrap-clean-blog

4. Copy the theme's assets into your project:
cp -R /tmp/startbootstrap-clean-blog/dist/assets public/

5. bun add express nunjucks