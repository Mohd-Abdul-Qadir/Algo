import { log, play, nav, programState, arrayState, speed } from "./Reducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  log,
  play,
  nav,
  programState,
  arrayState,
  speed,
});
export default rootReducer;
