const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(cors());

const { randomBytes } = require("crypto");


const commentsByPostId ={}

// /posts/:id/comments GET // retrieve
app.get("/posts/:id/comments", (req, res) => {

  const comments = commentsByPostId[req.params.id] || [];


  res.send(comments);
});

// /posts/:id/comments POST {content:string} // create a post associated with a given post id
app.post("/posts/:id/comments", (req, res) => {
  const commentId= randomBytes(4).toString('hex');
  const comments = commentsByPostId[req.params.id] || [];
  const { content } = req.body;
  comments.push({id:commentId, content});


  commentsByPostId[req.params.id] = comments;

  res.send(comments);
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
