import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
    courses,
    authors,
    apiCallInProgress
})

export default rootReducer;
