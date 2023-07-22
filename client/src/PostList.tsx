import React, {useEffect, useState} from "react";
import axios from "axios";
import CommentCreate from './CommentCreate';
import CommentsList from "./CommentsList";

const PostList = () => {
    let [posts, setPosts]= useState<Object>({});
    const renderPosts = Object.values(posts).map( post => {
        return (
                <div key={post.id} className="card" style={{width: '30%', marginBottom: '20px'}}>
                    <div className="card-body">
                        <h3>{post.title}</h3>
                        <CommentsList comments={post.comments}/>
                        <CommentCreate postId={post.id} />
                    </div>
                </div>);
        }
    );

    useEffect(() => {
        fetchPosts()
    },[setPosts])

    const fetchPosts = async ()=>{
       const res=  await axios.get("http://localhost:4002/posts");
       console.log("fetch posts", res.data);
       setPosts(res.data);
    }
    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderPosts}
    </div>;
}

export default PostList;