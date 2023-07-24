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

    if (req.body.type === 'CommentUpdated'){
        const {id, content, postId, status} = req.body.data;
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
    res.send({});
})

app.listen(4002, async ()=>{
    console.log("Listening on 4002")
    // try {
    //     const res = await axios.get("http://localhost:4005/events");
    //
    //     for (let event of res.data) {
    //         console.log("Processing event:", event.type);
    //
    //         handleEvent(event.type, event.data);
    //     }
    // } catch (error) {
    //     console.log(error.message);
    // }
})