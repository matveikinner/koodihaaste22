import { inject, injectable } from "inversify";
import { from, map, Observable } from "rxjs";
import HttpService from "@core/data/services/http.service";
import CORE_BINDINGS from "@core/di/core.bindings";
import ResultsNetwork from "../models/resultsNetwork";

@injectable()
class ResultsApi {
  @inject(CORE_BINDINGS.HttpService) private httpService!: HttpService;

  getResults = (date?: string): Observable<ResultsNetwork.GetResponse> =>
    from(
      this.httpService.httpClient.get<ResultsNetwork.GetResponse>(`/api/v1/results/${date || ""}`, {
        withCredentials: true,
      })
    ).pipe(map((response) => response.data));
}

export default ResultsApi;
