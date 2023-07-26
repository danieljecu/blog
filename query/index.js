const express =require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const axios = require("axios");

const app= express();

app.use(bodyParser.json());
app.use(cors());

//posts === { 'j121212j':{id, title, comments:[ {id, content} ]}
let posts= {}

const handleEvent = (type, data)=>{
    if (type ==='PostCreated'){
        const {id, title}= data;
        posts[id] = { id,title, comments: []}

        console.log(posts[id])
    }

    if (type ==='CommentCreated'){
        const {id, content, postId, status} = data;
        let post = posts[postId];

        post.comments.push({id, content, status})

        console.log(post);
    }

    if (type === 'CommentUpdated'){
        const {id, content, postId, status} = data;
        try{
            let post = posts[postId];
            const comment = post.comments.find(comment=> comment.id===id );

            comment.status= status;
            comment.content= content;
        }catch (e) {
            // should handle the exception where posts[postId] might not have been initialized
            console.log("CommentUpdated error",e.message);
        }

    }
}

app.get('/posts', (req,res)=>{
    res.send(posts);
})

app.post('/events', (req, res)=>{
    const {type, data} = req.body;
    handleEvent(type,data);
    res.send({});
})

app.listen(4002, async ()=>{
    console.log("Listening on 4002")

    try {
        const res = await axios.get("http://localhost:4005/events");

        for (let event of res.data) {
            console.log("Processing event:", event.type);

            handleEvent(event.type, event.data);
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
})