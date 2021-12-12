import { combineReducers } from "redux";
import { likeReducer } from "./likesReducer";
import { inputReducer } from "./textReducer";
import { commentReducer } from "./commentReducer";
export const rootReducer = combineReducers({
   likeReducer,
   inputReducer,
   commentReducer
})