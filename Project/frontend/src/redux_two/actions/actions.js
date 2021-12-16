//teams
import { GET_ALL_TEAMS, GET_PARTICULAR_TEAM } from "../types/types"; 
//players
import { GET_ALL_PLAYERS, GET_PARTICULAR_PLAYER } from "../types/types";
//colors
import { MAKE_BLUE, MAKE_RED } from "../types/types";
//legaues
import { GET_ALL_LEAGUES, GET_PARTICULAR_LEAGUE } from "../types/types";
//stadiums
import { GET_ALL_STADIUMS, GET_PARTICULAR_STADIUM } from "../types/types";
//news
import { GET_ALL_NEWS, GET_PARTICULAR_NEWS } from "../types/types";
//comments
import { GET_ALL_COMMENTS, GET_PARTICULAR_COMMENT } from "../types/types";
//users
import { GET_ALL_USERS, GET_PARTICULAR_USER, GET_PARTICULAR_USER_PROFILE, GET_ALL_USERS_PROFILES } from "../types/types";


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


//leagues
export const getAllLeagues = (payload) => ({
    type: GET_ALL_LEAGUES, payload
})


export const getParticularLeague = (payload) => ({
    type: GET_PARTICULAR_LEAGUE, payload
})

//stadiums
export const getAllStadiums = (payload) => ({
    type: GET_ALL_STADIUMS, payload
})


export const getParticularStadium = (payload) => ({
    type: GET_PARTICULAR_STADIUM, payload
})

//news
export const getAllNews = (payload) => ({
    type: GET_ALL_NEWS, payload
})


export const getParticularNews = (payload) => ({
    type: GET_PARTICULAR_NEWS, payload
})

//comments
export const getAllComments = (payload) => ({
    type: GET_ALL_COMMENTS, payload
})


export const getParticularComment = (payload) => ({
    type: GET_PARTICULAR_COMMENT, payload
})

//users
export const getAllUsers = (payload) => ({
    type: GET_ALL_USERS, payload
})

export const getParticularUser = (payload) => ({
    type: GET_PARTICULAR_USER, payload
})

export const getAllUsersProfiles = (payload) => ({
    type: GET_ALL_USERS_PROFILES, payload
})

////////////////

//colors


export const makeRed = () => ({
    type: MAKE_RED
})


export const makeBlue = () => ({
    type: MAKE_BLUE
})