import { GREEN, BLUE } from "./types"

const initialState = {
    color:'GREEN'
}

export const colorReducer=(state=initialState, action) => {
    switch(action.type) {
        case GREEN:
            return {
                ...state,
                color: state.color='GREEN'
            }
        case BLUE:
            return {
                ...state,
                color: state.color='BLUE'
            }
        default:
            return state;

    }
}