import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const take_team = [];
function AllTeams() {

    const all_teams = [];
    const [teams, setTeams] = useState([]);
        useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/teams/",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
              },
        }).then(response => {
            setTeams(response.data)
        })
    },[])

    {teams.map(item => (take_team.push(item)))}

    return(
        [{all_teams}]
    )}

export default take_team;
