const express = require("express");
const app = express();
const port = 3000;

const users = require("./data/users");
const posts = require("./data/posts");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//ALL Routes
app
  .route("/api/users")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
    // Within the POST request route, we create a new
    // user with the data given by the client.
    // We should also do some more robust validation here,
    // but this is just an example for now.
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        res.json({ error: "Username Already Taken" });
        return;
      }

// Index Route for users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Show route for Users
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (user) res.json(user);
  else {
    res.send("Post Not Found");
  }
});

//Index route for posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

//Show route for posts
app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.send("Post Not Found");
  }
});

app.get("/", (req, res) => {
  res.send("All usable routes start with/api");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
