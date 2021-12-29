import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import './SinglePost.css'

const axios = require("axios")

const SinglePost = () => {
    const {username, postId, purpose} = useParams()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [isOwner, setIsOwner] = useState(false)

    const navigate = useNavigate()
    const todayDate = new Date().toISOString().slice(0, 10);

    axios.defaults.withCredentials = true


    const loadPostContents = () =>{
        axios.get(`http://localhost:3000/blog/${username}/${postId}`)
        .then(function (response){
            setTitle(response.data.post[0].title)
            setBody(response.data.post[0].body)
            setIsOwner(response.data.isOwner)
        })
        .catch(function (error){
            if(error.response.status == "500"){
                navigate("/500")
            } else if (error.response.status == "404"){
                navigate("/404")
            }
        })
    }

    const handleBackButtonClick = ()=>{
        navigate(`/blog/${username}`)
    }

    const handleSubmitEditButton = ()=>{
        axios.put(`http://localhost:3000/blog/${username}/${postId}`, {
            title: title,
            body: body
        })
        .then(function (response){
            navigate(`/blog/${username}`)
        })
        .catch(function(error){
            if(error.response.status == "500"){
                navigate("/500")
            } else if(error.response.status == "401"){
                navigate("/401")
            }
        })
    }

    const handleCreatePostButton = ()=>{
        axios.post(`http://localhost:3000/blog/${username}`, {
            title: title,
            body: body,
            created_at: todayDate
        })
        .then((response)=>{
            navigate(`/blog/${username}`)
        })
        .catch((error)=>{
            if(error.response.status == "500"){
                navigate("/500")
            } else if(error.response.status == "401"){
                navigate("/401")
            }
        })
    }
    
    const handleTitleChange = (event)=>{
        setTitle(event.target.value)
    }

    const handleBodyChange = (event)=>{
        setBody(event.target.value)
    }
    useEffect( ()=>{
        axios.get('http://localhost:3000/signin')
        .then(function (response) {
            if(purpose == "see" || purpose == "edit"){
                loadPostContents()
            } 
        })
        .catch(function (error) {
            navigate('/signin')
        });
    }, [])


    return (
        <div id="single-post-container">
            <input id="title" type="text" value={title} disabled = {purpose == "see"} onChange={handleTitleChange} placeholder='Title'></input>
            <textarea id="body"  value={body} disabled = {purpose == "see"} onChange={handleBodyChange} placeholder='Text Body'></textarea>
            <div id="back-edit-create-buttons-container">
                <button id="back-button" onClick={handleBackButtonClick}>Back</button>
                {purpose == "edit" ? <button id="submit-edit-button" onClick={handleSubmitEditButton}>Submit Edit</button>: null}
                {purpose == "create" ? <button id="create-post-button" onClick={handleCreatePostButton}>Create Post</button>: null}
            </div>
        </div>
    );
};

export default SinglePost;