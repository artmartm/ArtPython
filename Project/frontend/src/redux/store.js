import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from './redux/rootReducer'

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))