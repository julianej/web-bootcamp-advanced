import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";

import { createMessage, consumeMessage } from "./services/messageStore.js";

const app = express();
const PORT = 3000;

// Parse form submissions.
// 2. Prevent HTML injection (XSS)
app.use(express.urlencoded({ extended: false }));

// Static files.
app.use(express.static(path.resolve("public")));

// Nunjucks.
nunjucks.configure(path.resolve("views"), {
  autoescape: true,
  express: app,
  watch: false,
});

// Home page.
app.get("/", (req, res) => {
  res.render("index.njk");
});

// Create a message.
app.post("/messages", async (req, res, next) => {

  try {
    const content = req.body.message;

    if (typeof content !== "string" || content.trim().length === 0) {
      return res.status(400).send("Please enter a message.");
    }

    const id = await createMessage(content.trim());

    const link = `${req.protocol}://${req.get("host")}/messages/${id}`;

// my route handler for creating a message now renders the "created.njk" 
// template and passes the generated link to it. 
// This allows the user to see the link to their message after it's created.
    res.render("created.njk", { link });
  } catch (error) {
    next(error);
  }
});

// Open a message exactly once.
app.get("/messages/:id", async (req, res, next) => {
  try {
    const message = await consumeMessage(req.params.id);

    if (!message) {
      return res.status(404).render("not-found.njk");
    }

    res.render("message.njk", { message: message.content });
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});