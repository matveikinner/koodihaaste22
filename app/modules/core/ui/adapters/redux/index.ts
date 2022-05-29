import { combineReducers } from "redux";
import loaderReducer from "./loader/loader.slice";
import toastReducer from "./toast/toast.slice";

export default combineReducers({
  loader: loaderReducer,
  toast: toastReducer,
});
