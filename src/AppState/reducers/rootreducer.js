import { combineReducers } from "redux";
import { loginReducer } from "./loginreducer";

const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;