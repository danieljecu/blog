const express =require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app= express();

app.use(bodyParser.json());
app.use(cors());

//posts === { 'j121212j':{id, title, comments:[ {id, content} ]}
let posts= {}

app.get('/posts', (req,res)=>{
    res.send(posts);
})

app.post('/events', (req, res)=>{

    if (req.body.type ==='PostCreated'){
        const {id, title}= req.body.data;
        posts[id] = { id,title, comments: []}

        console.log(posts[id])
    }

    if (req.body.type ==='CommentCreated'){
        const {id, content, postId, status} = req.body.data;
        let post = posts[postId];

        post.comments.push({id, content, status})

        console.log(post);
    }

    res.send({});
})

app.listen(4002, ()=>{
    console.log("Listening on 4002")
})