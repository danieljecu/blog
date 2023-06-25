import React, {useEffect, useState} from "react";
import axios from "axios";
import CommentCreate from './CommentCreate';
import CommentsListByPost from "./CommentsListByPost";

export default () => {
    let [posts, setPosts]= useState<Object>({});
    const renderPosts = Object.values(posts).map( post => {
        return (
                <div key={post.id} className="card" style={{width: '30%', marginBottom: '20px'}}>
                    <div className="card-body">
                        <h3>{post.title}</h3>
                        <CommentCreate postId={post.id} />
                        <CommentsListByPost postId={post.id}/>
                    </div>
                </div>);
        }
    );

    useEffect(() => {
        fetchPosts()
    },[setPosts])

    const fetchPosts = async ()=>{
       const res=  await axios.get("http://localhost:4000/posts");
       setPosts(res.data);
        console.log(posts)
    }
    return <div className="f-flex flex-row flex-wrap justify-content-between">
        {renderPosts}
    </div>;
}