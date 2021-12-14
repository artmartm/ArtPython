import { GREEN, BLUE, RED } from "./types"

const initialState = {
    color:'YELLOW'
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
            case RED:
                return {
                    ...state,
                    color: state.color='RED'
                }
        default:
            return state;

    }
}