const express = require("express");
const axios = require("axios");
const app = express();
const port = 4000;

const baseUrl = "https://jsonplaceholder.typicode.com";

const postsUrl = "/posts";
const commentsUrl = "/comments";
const postObjects = {};

function getPosts() {
  axios.get(baseUrl + postsUrl).then((res) => {
    for (let index = 0; index < res.data.length; index++) {
      postObjects[res.data[index].id] = res.data[index];
    }
    axios.get(baseUrl + commentsUrl).then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        let comments = postObjects[res.data[index].postId].comments;
        if (!comments) {
          comments = [];
        }
        comments.push(res.data[index]);

        postObjects[res.data[index].postId].comments = comments;
      }
    });

    app.listen(port, () => {
      console.log(`server is listening at http://loclhost:${port}`);
    });
  });
}

app.use(express.json());

app.get(postsUrl, (req, res) => {
  res.json(postObjects);
});

app.get("/:postId", (req, res) => {
  const { postId } = req.params;
  const post = postObjects[postId];
  res.json(post || { msg: "post was not found" });
});

// Create a GET request that will return all the comments for a specific post based on the id of the post.

app.get("/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const comments = postObjects[postId].comments;
  console.log(comments);
  res.json(comments || { msg: "comments were not found" });
});

// Create a PUT request that will update a specific comment on a post based on the id of the post and ID of the comment. Can take the following fields: name, email, body in the PUT body.

app.put("/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  console.log(req.body);
  const { name, email, body } = req.body;

  let comment = postObjects[postId].comments.find((c) => +commentId === c.id);

  if (!comment) {
    res.status(404).send("Resource not found.");
    return;
  }

  comment = { ...comment, name, email, body };
  const comments = postObjects[postId].comments.filter(
    (c) => +commentId !== c.id
  );
  comments.push(comment);
  postObjects[postId].comments = comments;

  res.status(202).send("Resource Replaced.");
});

function createPostId() {
  let array = Object.keys(postObjects);
  let maxId = 0;
  for (let index = 0; index < array.length; index++) {
    const id = parseInt(array[index], 10);
    if (id > maxId) {
      maxId = id;
    }
  }
  maxId++;
  return "" + maxId;
}

app.post(postsUrl, (req, res) => {
  let id = createPostId();
  console.log(id);
  const { userId, title, body } = req.body;
  postObjects[id] = { userId, title, body, comments: [] };

  res.status(201).json(postObjects[id]);
  console.log(postObjects[id]);
});

app.delete(commentsUrl+"/:postId/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const comments = postObjects[postId].comments.filter((c) => +commentId !== c.id);
  postObjects[postId].comments = comments;
  console.log(postObjects[postId].comments);
  res.status(200)
  res.send("Comment Deleted");
});

app.delete(postsUrl + ":id", (req, res) => {
  delete postObjects[req.params.id];
  res.send("Post Deleted");
});

getPosts();
