const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(cors());

const { randomBytes } = require("crypto");

const axios = require("axios");

const commentsByPostId ={}

// /posts/:id/comments GET // retrieve
app.get("/posts/:id/comments", (req, res) => {

  const comments = commentsByPostId[req.params.id] || [];


  res.send(comments);
});

// /posts/:id/comments POST {content:string} // create a post associated with a given post id
app.post("/posts/:id/comments", async(req, res) => {
  const commentId= randomBytes(4).toString('hex');
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  const { content } = req.body;
  comments.push({id:commentId, content});


  commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4005/events', {type: "CommentCreated", data: { id:commentId, content , postId} })

  res.send(comments);
});

app.post('/events', (req,res)=>{
  console.log("Recieved Event", req.body.type);
  res.send({})
})

app.listen(4001, () => {
  console.log("listening on 4001");
});
