import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
//reducers
import { teamsReducer } from "./reducers/teamsReducer";
import { particularTeamReducer } from "./reducers/particularTeamReducer";
import { playersReducer } from "./reducers/playersReducer";
import { leaguesReducer } from "./reducers/leaguesReducer";
import { stadiumsReducer } from "./reducers/stadiumsReducer";
import { newsReducer } from "./reducers/newsReducer";
import { commentsReducer } from "./reducers/commentsReducer";
import { usersReducer } from "./reducers/usersReducer"
import { particularUserReducer } from "./reducers/particularUserReducer";
import { usersProfilesReducer } from "./reducers/usersProfilesReducer";
import { usersSpecialFieldsReducer } from "./reducers/usersSpecialFieldsReducer";

const rootReducer = combineReducers({
    routing: routerReducer,
    teamsReducer,
    playersReducer,
    leaguesReducer,
    stadiumsReducer,
    newsReducer,
    commentsReducer,
    usersReducer,
    particularUserReducer,
    usersProfilesReducer,
    particularTeamReducer,
    usersSpecialFieldsReducer,
})

export default rootReducer;