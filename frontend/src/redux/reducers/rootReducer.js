import { combineReducers } from "redux";
import stateReducer from "./stateReducer";

const rootReducer = combineReducers({
    stateStore: stateReducer
})

export default rootReducer