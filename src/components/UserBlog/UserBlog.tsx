import {useEffect, useState} from 'react';
import {useParams, useNavigate, Link, NavigateFunction} from 'react-router-dom'
import './UserBlog.css'

import axios, {AxiosResponse, AxiosError} from 'axios'

interface Post {
    post_id: string,
    created_at: string,
    title: string,
    body: string
}

const UserBlog = (): JSX.Element => {
    const {username}: {[key: string]: string|undefined} = useParams()
    const navigate: NavigateFunction = useNavigate()
    const [posts, setPosts] = useState<Post[]>([])
    const [isOwner, setIsOwner] = useState<boolean>(false)

    const url: string|undefined = window.location.pathname.split('/').pop();

    axios.defaults.withCredentials = true
    
    const loadPosts = (): void =>{
        axios.get(`https://blogged-server.herokuapp.com/blog/${username}`)
        .then(function(response: AxiosResponse) {
            setPosts(response.data.posts)
            setIsOwner(response.data.isOwner)
        })
        .catch(function(error: AxiosError) {
            if(error?.response?.status.toString() ?? "500" == "500"){
                navigate("/500")
            } else if (error?.response?.status.toString() == "404"){
                navigate("/404")
            }
        })
    }

    const handleEditClick = (post_id: string): React.MouseEventHandler<HTMLButtonElement> =>{
        return function () {
            navigate(`/blog/${username}/${post_id}/edit`)
        }
    }

    const handleDeleteClick = (post_id: string): React.MouseEventHandler<HTMLButtonElement> =>{
        return function () {
            axios.delete(`https://blogged-server.herokuapp.com/blog/${username}/${post_id}`)
            .then(function (){
                loadPosts()
            })
            .catch(function (){
                navigate("/500")

            })
        }
    }

    const handleCreatePostClick: React.MouseEventHandler<HTMLButtonElement> = (): void =>{
        navigate(`/blog/${username}/create`)
    }

    useEffect((): void =>{
        axios.get('https://blogged-server.herokuapp.com/signin')
        .then(function () {
            loadPosts()
        })
        .catch(function () {
            navigate(`/signin`) 
        });
    }, [url, username])

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