import { combineReducers } from "redux";
import { teamsReducer } from "./reducers/teamsReducer";
import { colorReducer } from "./reducers/colorReducer";
import { particularTeamReducer } from "./reducers/particularTeamReducer";

const rootReducer = combineReducers({
    teamsReducer,
    colorReducer,
    particularTeamReducer
})

export default rootReducer;