import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../general/base/AuthContext';
import { useSelector } from 'react-redux';

function UsersProfilesList({ ll }) {

    const [profiles, setProfiles] = useState([]);
    const teams = useSelector(state => state.teamsReducer.teams)


    let { authTokens } = useContext(AuthContext)

    useEffect(() => {
        getNotes()
    }, [])


    let getNotes = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/users-profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            setProfiles(data)
        }
    }


    const part = []
    {
        profiles.map(e => {
            if (e.user == ll)
                part.push(e)
        })
    }

    return (
        <div>
            {teams.length > 0 ?
                <div>
                    <hr style={{ width: 500 }} />
                    {part.length > 0 ?
                        <div>
                            <h2>favorite team is</h2>
                            {part.map(e => (
                                <div>
                                    <Link className={'link'} key={e.favorite_team} to={`/teams/${e.favorite_team}`}>
                                        <img src={teams[e.favorite_team - 1].team_logo} className='stadium_main_img' />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        : <h1>no team selected</h1>}
                </div> : <></>}
        </div>
    )
}

export default UsersProfilesList;
