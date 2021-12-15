import { combineReducers } from "redux";
import { teamsReducer } from "./reducers/teamsReducer";
import { colorReducer } from "./reducers/colorReducer";
import { particularTeamReducer } from "./reducers/particularTeamReducer";
import { playersReducer } from "./reducers/playersReducer";
import { leaguesReducer } from "./reducers/leaguesReducer";
import { stadiumsReducer } from "./reducers/stadiumsReducer";
import { newsReducer } from "./reducers/newsReducer";
import { commentsReducer } from "./reducers/commentsReducer";


const rootReducer = combineReducers({
    teamsReducer,
    colorReducer,
    playersReducer,
    leaguesReducer,
    stadiumsReducer,
    newsReducer,
    commentsReducer,
    /////////////
    particularTeamReducer,

})

export default rootReducer;