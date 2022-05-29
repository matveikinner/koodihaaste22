import { put } from "@redux-saga/core/effects";
import { lastValueFrom, Observable } from "rxjs";
import lunchbreakContainer from "@lunchbreak/di/lunchbreak.container";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import { Municipality } from "@lunchbreak/domain/models";
import GetMunicipalitiesUseCase from "@lunchbreak/domain/usecases/getMunicipalitiesUseCase";
import { getMunicipalitiesFailure, getMunicipalitiesSuccess } from "../../redux/ymparisto/ymparisto.slice";

export function* getMunicipalitiesRequestSaga() {
  const getMunicipalitiesUseCase = lunchbreakContainer.get<GetMunicipalitiesUseCase>(
    LUNCHBREAK_BINDINGS.GetMunicipalitiesUseCase
  );

  try {
    const response = (yield lastValueFrom(
      (yield getMunicipalitiesUseCase.invoke()) as Observable<Municipality[]>
    )) as Municipality[];

    yield put(getMunicipalitiesSuccess(response));
  } catch (err) {
    yield put(getMunicipalitiesFailure());
    console.log(err);
    throw err;
  }
}
