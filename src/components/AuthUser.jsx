import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthUser = () => {
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        // navigate('/closed');
        navigate('/redirectUser');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }   



    const http = axios.create({
        // baseURL:"http://127.0.0.1:8000/api",
        baseURL:"https://amcodepot.com/api/public/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest',
        }
    });
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}

export default AuthUser;