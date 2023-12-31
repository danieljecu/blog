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
  comments.push({id:commentId, content, status:'pending'});

  commentsByPostId[postId] = comments;

  await axios.post('http://localhost:4005/events', {type: "CommentCreated", data: { id:commentId, content , postId, status: 'pending'} })

  res.send(comments);
});

app.post('/events', async (req,res)=>{
  console.log("Recieved Event", req.body.type);

  const {type, data} = req.body;

  if (type === 'CommentModerated'){
    const {postId, id, status, content} = data;
    const comments= commentsByPostId[postId];
    const comment = comments.find(comment=>{return comment.id === id});

    comment.status = status;
     try{
        await axios.post('http://localhost:4005/events', {
          type: 'CommentUpdated',
          data:{
            id,
            status,
            postId,
            content
          }
        })
      }catch (e) {
        console.log("CommentModerated error",e.message);
      }

  }
  res.send({})
})

app.listen(4001, () => {
  console.log("listening on 4001");
});
