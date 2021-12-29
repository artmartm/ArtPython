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
        let response = await fetch('http://127.0.0.1:8000/api/users-special-fields/', {
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
    const part = []

    {
        profiles.map(e => {
            if (e.user == owner.id)
                part.push(e)
        })
    }
    return (
        <div>
            {owner.id}
            <h1>username: {owner.username}</h1>
            {part.length > 0 ? <h1>moderator</h1> : <SetUpModerator id={id} />}
        </div>

    )
}

export default UserDetail;

/* handleClick() {
    this.setState(prevState => {
      return {
        isMusicPlaying: !prevState.isMusicPlaying
      };
    });
  }; */