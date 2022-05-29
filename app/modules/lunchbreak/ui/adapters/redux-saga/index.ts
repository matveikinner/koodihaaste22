import { all, takeLatest } from "@redux-saga/core/effects";
import { exceptionHandlerSaga } from "@core/ui/utils/exceptionHandlerSaga";
import { getRestaurantsRequest } from "../redux/restaurants/restaurants.slice";
import { getRestaurantsRequestSaga } from "./restaurants/getRestaurantsRequestSaga";
import { getResultsRequest, getResultsWithRestaurantsRequest } from "../redux/results/results.slice";
import { getResultsRequestSaga } from "./results/getResultsRequestSaga";
import { getResultsWithRestaurantsRequestSaga } from "./results/getResultsWithRestaurantsRequestSaga";
import { submitVoteRequest } from "../redux/vote/vote.slice";
import { submitVoteRequestSaga } from "./votes/submitVoteRequestSaga";
import { getMunicipalitiesRequest } from "../redux/ymparisto/ymparisto.slice";
import { getMunicipalitiesRequestSaga } from "./ymparisto/getMunicipalitiesRequestSaga";

export default function* root() {
  yield all([
    takeLatest(getRestaurantsRequest.type, exceptionHandlerSaga(getRestaurantsRequestSaga)),
    takeLatest(getResultsRequest.type, exceptionHandlerSaga(getResultsRequestSaga)),
    takeLatest(getResultsWithRestaurantsRequest.type, exceptionHandlerSaga(getResultsWithRestaurantsRequestSaga)),
    takeLatest(submitVoteRequest.type, exceptionHandlerSaga(submitVoteRequestSaga)),
    takeLatest(getMunicipalitiesRequest.type, exceptionHandlerSaga(getMunicipalitiesRequestSaga)),
  ]);
}
