import { inject, injectable } from "inversify";
import { from, map, Observable } from "rxjs";
import HttpService from "@core/data/services/http.service";
import CORE_BINDINGS from "@core/di/core.bindings";
import VotesNetwork from "../models/votesNetwork";

@injectable()
class VotesApi {
  @inject(CORE_BINDINGS.HttpService) private httpService!: HttpService;

  submitVote = (restaurantId: string): Observable<VotesNetwork.PostResponse> =>
    from(
      this.httpService.httpClient.post<void>(`/api/v1/vote/${restaurantId}`, undefined, { withCredentials: true })
    ).pipe(map((response) => response));
}

export default VotesApi;
