//teams
import { GET_ALL_TEAMS, GET_PARTICULAR_TEAM } from "../types/types"; 

//players
import { GET_ALL_PLAYERS, GET_PARTICULAR_PLAYER } from "../types/types";

//colors
import { MAKE_BLUE, MAKE_RED } from "../types/types";

//teams
export const getAllTeams = (payload) => ({
    type: GET_ALL_TEAMS, payload
})


export const getParticularTeam = (payload) => ({
    type: GET_PARTICULAR_TEAM, payload
})

//players
export const getAllPlayers = (payload) => ({
    type: GET_ALL_PLAYERS, payload
})


export const getParticularPlayer = (payload) => ({
    type: GET_PARTICULAR_PLAYER, payload
})


//colors


export const makeRed = () => ({
    type: MAKE_RED
})


export const makeBlue = () => ({
    type: MAKE_BLUE
})