import { combineReducers } from "redux";

import contactReducer from "../reducer/contactReducer";

const rootReducer = combineReducers({
  data:contactReducer,
});

export default rootReducer;
