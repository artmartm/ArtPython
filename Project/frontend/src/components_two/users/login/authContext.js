import React, {createContext, useState, useEffect} from "react";
import jwt_decode from 'jwt-decode';
import { useHistory } from "react-router";

const AuthContext = createContext();

export default AuthContext;


export const AuthProvider=({children})=> {

    let[user,setUser] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let[authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode((localStorage.getItem('authTokens'))) : null);

    let history = useHistory();
    
    let loginUser = async(e) => {
        e.preventDefault()
        console.log('asdasd')
        let response = await fetch('http://127.0.0.1:8000/api2/token/'
        , {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        if (response.status===200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history.push('/')
        } else { 
            alert('FIX!!!!')
        }

    }
    
    let logoutUser=()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

