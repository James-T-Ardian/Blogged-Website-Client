import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom'
import './UserBlog.css'

const axios  = require('axios')

const UserBlog = () => {
    const {username} = useParams()
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [isOwner, setIsOwner] = useState(false)

    const url = window.location.pathname.split('/').pop();

    axios.defaults.withCredentials = true
    
    const loadPosts = ()=>{
        axios.get(`http://localhost:3000/blog/${username}`)
        .then(function(response) {
            setPosts(response.data.posts)
            setIsOwner(response.data.isOwner)
        })
        .catch(function(error) {
            if(error.response.status == "500"){
                navigate("/500")
            } else if (error.response.status == "404"){
                navigate("/404")
            }
        })
    }

    const handleEditClick = (postId)=>{
        return function (e) {
            navigate(`/blog/${username}/${postId}/edit`)
        }
    }

    const handleDeleteClick = (postId)=>{
        return function (e) {
            axios.delete(`http://localhost:3000/blog/${username}/${postId}`)
            .then(function (response){
                loadPosts()
            })
            .catch(function (error){
                if(error.response.status(500)){
                    navigate("/500")
                }
            })
        }
    }

    const handleCreatePostClick = ()=>{
        navigate(`/blog/${username}/create`)
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/signin')
        .then(function (response) {
            loadPosts()
        })
        .catch(function (error) {
            navigate(`/signin`) 
        });
    }, [url])

    return (
        <div id="blog-container">
            <div id="user-identifier">{username}'s posts</div>
            {isOwner ? <button id="add-post-button" onClick={handleCreatePostClick}>Add Post</button>: null}
            <div id="posts-container">
                {posts.map((post) => {
                    return (
                        <div className='post-with-buttons-container'>
                            <Link className="post-title-time" to={`/blog/${username}/${post.post_id}/see`} >
                                <div className="post-title">{post.title}</div>
                                <div className="post-time">Posted on: {post.created_at.slice(0,10)}</div>
                            </Link>

                            {isOwner ? 
                                <div className="edit-delete-buttons-container">
                                    <button  onClick={handleEditClick(post.post_id)}>Edit</button>
                                    <button  onClick={handleDeleteClick(post.post_id)}>Delete</button>
                                </div>
                                : null 
                            }
                        </div>
                    )
                })}
            </div>
        </div>
        
            
    );
};

export default UserBlog;