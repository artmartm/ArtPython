import { GET_TEAM, ADD_TEAM } from "./types"

import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import TeamLogo from "../../components_two/teams/teams/teamsLogo";
import Teams from "../../components_two/teams/teams/teams";
import AllTeams from "../../components_two/teams/teams/allTeams";
//import '../Model.css';

function Teams1() {

    const [teams, setTeams] = useState([]);

   useEffect(()=> {
    getNotes()
}, [])


let getNotes = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/teams/', {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            //'Authorization':'Bearer ' + String(authTokens.access)
        }
    })
    let data = await response.json()
    if(response.status ){
        setTeams(data)
    }
    
}
    return({teams})
}

const lol = []


const initialState = {
    
    teams: Teams1
}

export const teamReducer=(state=initialState, action) => {
    switch (action.type) {
        case GET_TEAM:
            return {
                state,
               // teams: state.teams
            }
        case ADD_TEAM:
            return {
                ...state,
                teams: state.teams
            }
        default:
            return state;
    }
}
