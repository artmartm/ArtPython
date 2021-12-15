import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
//reducers
import { teamsReducer } from "./reducers/teamsReducer";
import { colorReducer } from "./reducers/colorReducer";
import { particularTeamReducer } from "./reducers/particularTeamReducer";
import { playersReducer } from "./reducers/playersReducer";
import { leaguesReducer } from "./reducers/leaguesReducer";
import { stadiumsReducer } from "./reducers/stadiumsReducer";
import { newsReducer } from "./reducers/newsReducer";
import { commentsReducer } from "./reducers/commentsReducer";
import { usersReducer } from "./reducers/usersReducer"


const rootReducer = combineReducers({
    routing: routerReducer,
    //reducers
    teamsReducer,
    colorReducer,
    playersReducer,
    leaguesReducer,
    stadiumsReducer,
    newsReducer,
    commentsReducer,
    /////////////
    usersReducer,

    particularTeamReducer,


})

export default rootReducer;