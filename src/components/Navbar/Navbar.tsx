import {useEffect, useState}  from "react"
import "./Navbar.css"
import userIcon from './logo-images/user_icon.png'
import { useNavigate, Link, NavigateFunction } from 'react-router-dom'

import axios, {AxiosError, AxiosResponse} from 'axios'

const Navbar = (): JSX.Element => {
    const [username, setUsername] = useState<string>("")
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [userSearch, setUserSearch] = useState<string>("")
    const navigate: NavigateFunction = useNavigate()
    const url: string = window.location.pathname.split('/').pop() as string;

    axios.defaults.withCredentials = true

    const handleSignOut: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        axios.post('https://blogged-server.herokuapp.com/signout')
        .then(function (response: AxiosResponse): void {
            setIsLoggedIn(!response.data.loggedOut)
            navigate(`/signin`) 
          })
          .catch(function (): void {
              // No need to handle any errors
          });
    }

    const handleUserSearchChange: React.ChangeEventHandler<HTMLInputElement>  = (event: React.ChangeEvent<HTMLInputElement>): void =>{
        setUserSearch(event.target.value)
    }

    const handleUserSearchClick: React.MouseEventHandler<HTMLButtonElement>= (): void =>{
        navigate(`/blog/${userSearch}`)
    }

    useEffect(() : void =>{
        axios.get('https://blogged-server.herokuapp.com/signin')
        .then(function (response: AxiosResponse): void {
            setUsername(response.data.username)
            setIsLoggedIn(response.data.loggedIn)
        })
        .catch(function (error: AxiosError): void {
            setUsername(error?.response?.data.username ?? "")
            setIsLoggedIn(error?.response?.data.loggedIn ?? false)
        });


    }, [url])

    return (
        <div id="navbar">
            <div id="left-side-nav">
                <div id="web-logo">Blogged</div>
            </div>
            { isLoggedIn ? <div id="right-side-nav">
                <input id="user-search-bar" type="text" placeholder="Insert username" onChange={handleUserSearchChange}></input>
                <button id="user-search-button" onClick={handleUserSearchClick}>Search</button>
                <Link to={`/blog/${username}`}><img id="user-icon" src={userIcon}></img></Link>
                <Link to={`/blog/${username}`} style={{ textDecoration: 'none' }}><div id="profile-identifier">{username}</div></Link>
                <button id="signout-button"onClick={handleSignOut}>Sign Out</button>
            </div> : null }
        </div>
    )
}


export default Navbar