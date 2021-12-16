import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsersProfiles } from "../../redux_two/actions/asyncActions/asyncAllUsersProfiles";
import AuthContext from "../general/base/AuthContext";

function UserDetail({ match }) {
    

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchUsersProfiles())
    }, [])

    const profiles = useSelector(state => state.usersProfilesReducer.usersProfiles)


    const[user, setUser] = useState({});
    const[pr,setPr] = useState([])
    const id = match.params.id;

    let {authTokens, logoutUser} = useContext(AuthContext)

    const content_type = '14';
    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/auth/users/${id}`,
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        }).then(response=>{
            setUser(response.data)
            setPr(response.data.profile)
        })
    },[id])
    
    return(
        <div>
            <h1>username: {user.username}</h1>
            <h1>profile: </h1>
            {profiles.map(e=>(<p>{e.ban}!</p>))}   
        </div>

    )
}

export default UserDetail;
