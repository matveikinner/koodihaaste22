import { combineReducers } from "redux";
import restaurantReducer from "./restaurants/restaurants.slice";
import resultsReducer from "./results/results.slice";
import voteReducer from "./vote/vote.slice";
import ymparistoReducer from "./ymparisto/ymparisto.slice";

export default combineReducers({
  restaurant: restaurantReducer,
  results: resultsReducer,
  vote: voteReducer,
  ymparisto: ymparistoReducer,
});
