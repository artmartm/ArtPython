import { combineReducers } from "redux";
import { likeReducer } from "./likesReducer";
import { inputReducer } from "./textReducer";
import { commentReducer } from "./commentReducer";
import { teamReducer } from "./teamReducer";
import { colorReducer } from "./colorReducer";
import { customerReducer } from "./customerReducer";
import { addTeamReducer } from "./addTeam";


const rootReducer = combineReducers({
   likeReducer,
   inputReducer,
   commentReducer,
   teamReducer,
   colorReducer,
   customerReducer,
   addTeamReducer
})

export default rootReducer;