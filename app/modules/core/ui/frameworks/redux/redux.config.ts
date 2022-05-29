import { configureStore, combineReducers } from "@reduxjs/toolkit";

import rootSaga from "@core/ui/adapters/redux-saga";
import coreRootReducer from "@core/ui/adapters/redux";
import lunchbreakRootReducer from "@lunchbreak/ui/adapters/redux";
import sagaMiddleware from "../redux-saga/redux-saga.config";

const rootReducer = combineReducers({
  core: coreRootReducer,
  lunchbreak: lunchbreakRootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({ reducer: rootReducer, middleware: [sagaMiddleware] });

sagaMiddleware.run(rootSaga);

export default store;
