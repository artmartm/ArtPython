import { combineReducers } from "redux";
import { teamsReducer } from "./reducers/teamsReducer";
import { colorReducer } from "./reducers/colorReducer";
import { particularTeamReducer } from "./reducers/particularTeamReducer";
import { playersReducer } from "./reducers/playersReducer";

const rootReducer = combineReducers({
    teamsReducer,
    colorReducer,
    particularTeamReducer,
    playersReducer
})

export default rootReducer;