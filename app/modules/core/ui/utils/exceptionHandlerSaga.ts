import { put } from "redux-saga/effects";
import axios, { AxiosError } from "axios";
import { t } from "i18next";
import { createLoader, removeLoader } from "../adapters/redux/loader/loader.slice";
import { createErrorToast } from "../adapters/redux/toast/toast.slice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exceptionHandlerSaga = (childrenSaga: (...args: any[]) => Generator) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function* (...args: any[]) {
    yield put(createLoader());

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      yield childrenSaga(...args);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.code) {
          case AxiosError.ERR_NETWORK:
            yield put(createErrorToast(`${t(["error:apiErrors.err_network", "error:apiErrors.unknown"])}`));
            break;
          default:
            yield put(createErrorToast(`${t("error:apiErrors.unknown")}`));
        }
      } else if (err instanceof Error) {
        yield put(createErrorToast(`${t("error:appErrors.unknown")}`));
      } else {
        yield put(createErrorToast(`${t("error:apiErrors.unknown")}`));
      }
    } finally {
      yield put(removeLoader());
    }
  };
