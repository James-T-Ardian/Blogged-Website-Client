import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ErrorPage.css'

const ErrorPage = () => {
    const {errorNum} = useParams()
    const navigate = useNavigate()
    const errorMessages = {"404": "Resource/User not found", "500": "Server Error", "401": "Unauthorized Access"}

    useEffect(()=>{
        if(errorNum !== "404" && errorNum !== "500" && errorNum !== "401"){
            navigate("/404")
        }
    }, [])
    return (
        <div id="error-message">
            {errorNum + " " + errorMessages[errorNum]}
        </div>
    );
};

export default ErrorPage;