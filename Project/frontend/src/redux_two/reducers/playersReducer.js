import { GET_ALL_PLAYERS, GET_PARTICULAR_PLAYER } from "../types/types";

const initialState = {
    players: []
}

export const playersReducer=(state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_PLAYERS:
            return {
                ...state, players: [...state.players, ...action.payload]
            }
        case GET_PARTICULAR_PLAYER:
            return {
                state
            }
        default:
            return state;
    }
}
