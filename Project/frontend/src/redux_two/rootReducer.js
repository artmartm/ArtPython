import { combineReducers } from "redux";
import { teamsReducer } from "./reducers/teamsReducer";
import { colorReducer } from "./reducers/colorReducer";


const rootReducer = combineReducers({
    teamsReducer,
    colorReducer
})

export default rootReducer;