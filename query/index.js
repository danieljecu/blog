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
    const {type, data} = req.body;

    if (type==='PostCreated'){
        const {id, title}= data;
        posts[id] = { id,title, comments: new Array()}

        console.log(posts[id])
    }

    if (type ==='CommentCreated'){
        const {id, content, postId} = req.body;
        let post = posts[postId];

        post.comments.push({id, content})

        console.log(post);
    }

    res.send({});
})

app.listen(4002, ()=>{
    console.log("Listening on 4002")
})