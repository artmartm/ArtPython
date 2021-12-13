import { GREEN, BLUE, INCREMENT, DECREMENT, INPUT_TEXT, COMMENT_CREATE, COMMENT_UPDATE, GET_TEAM, ADD_TEAM } from "./types";

export function makeGreen() {
    return {
        type: GREEN
    }
}


export function makeBlue() {
    return {
        type: BLUE
    }
}

export function incrementLikes() {
    return {
        type: INCREMENT
    }
}

export function decrementLikes() {
    return {
        type: DECREMENT
    }
}

export function inputText(text) {
    return {
        type: INPUT_TEXT,
        text
    }
}

export function commentCreate(text,id) {
    return {
        type: COMMENT_CREATE,
        data: {text,id}
    }
}

export function commentUpdate(text,id) {
    return {
        type: COMMENT_UPDATE,
        data: {text,id}
    }
}

export function getTeam(team) {
    return {
        type: GET_TEAM,
        //data: {text,id}
    }
}

export function addTeam(team) {
    return {
        type: ADD_TEAM,
        data: {team}
    }
}