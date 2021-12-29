import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsersProfiles } from "../../redux/actions/asyncActions/asyncAllUsersProfiles";
import AuthContext from "../general/base/AuthContext";
import SetUpModerator from "./setUpModerators";

function UserDetail({ match }) {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsersProfiles())
    }, [])

    const profiles = useSelector(state => state.usersProfilesReducer.usersProfiles)


    const [owner, setOwner] = useState({});
    const [pr, setPr] = useState([])
    const id = match.params.id;

    let { authTokens, logoutUser, user } = useContext(AuthContext)

    const content_type = '14';
    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/auth/users/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        }).then(response => {
            setOwner(response.data)
            setPr(response.data.profile)
        })
    }, [id])
    useEffect(() => {
        getProfiles()
    }, [])


    let getProfiles = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/users-profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            setPr(data)
        }
    }
    const [lol, setLol] = useState(false)
    return (
        <div>
            <h1>username: {owner.username}</h1>

            {/*  {user.moderator ? <h2>moderator</h2> :
                <SetUpModerator id={id} />} */}
            <SetUpModerator id={id} />
        </div>

    )
}

export default UserDetail;
