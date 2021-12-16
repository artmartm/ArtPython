import { GET_TEAM, ADD_TEAM } from "./types"

import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import TeamLogo from "../../components_two/teams/teams/teamsLogo";
import Teams from "../../components_two/teams/teams/teams";
import AllTeams from "../../components_two/teams/teams/allTeams";
import take_team from "../../components_two/teams/teams/allTeams";
//import '../Model.css';



const lol = []


const initialState = {
    
    teams: ['']
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
                teams: state.teams.push[action]
            }
        default:
            return state;
    }
}
