import React, {useEffect} from 'react';
import { useParams, useNavigate, Params, NavigateFunction } from 'react-router-dom';
import './ErrorPage.css'

interface errorsMap {
    [key: string]: string
}

const ErrorPage = (): JSX.Element => {
    const {errorNum}: Readonly<Params<string>> = useParams()
    const navigate: NavigateFunction = useNavigate()
    const errorMessages: errorsMap = {"404": "Resource/User not found", "500": "Server Error", "401": "Unauthorized Access"}

    useEffect((): void =>{
        if(errorNum !== "404" && errorNum !== "500" && errorNum !== "401"){
            navigate("/404")
        }
    }, [])
    return (
        <div id="error-message">
            {errorNum + " " + errorMessages[errorNum as string]}
        </div>
    );
};

export default ErrorPage;