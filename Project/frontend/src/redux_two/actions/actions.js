//teams
import { GET_ALL_TEAMS, GET_PARTICULAR_TEAM } from "../types/types"; 
//colors
import { MAKE_BLUE, MAKE_RED } from "../types/types"; 

//teams
export const getAllTeams = (payload) => ({
    type: GET_ALL_TEAMS, payload
})


export const getParticularTeam = (payload) => ({
    type: GET_PARTICULAR_TEAM, payload
})

//colors


export const makeRed = () => ({
    type: MAKE_RED
})


export const makeBlue = () => ({
    type: MAKE_BLUE
})