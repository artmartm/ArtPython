import { combineReducers } from "redux";
import { teamsReducer } from "./reducers/teamsReducer";


const rootReducer = combineReducers({
    teamsReducer,
})

export default rootReducer;