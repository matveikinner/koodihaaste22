import { all } from "redux-saga/effects";
import lunchreakRootSaga from "@lunchbreak/ui/adapters/redux-saga";

export default function* rootSaga() {
  yield all([lunchreakRootSaga()]);
}
