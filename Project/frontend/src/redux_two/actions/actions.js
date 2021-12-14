import { GET_ALL_TEAMS } from "../types/types"; 


export const getAllTeams = (payload) => ({
    type: GET_ALL_TEAMS, payload
})