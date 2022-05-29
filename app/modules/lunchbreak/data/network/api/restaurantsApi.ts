import { inject, injectable } from "inversify";
import { from, map, Observable } from "rxjs";
import HttpService from "@core/data/services/http.service";
import CORE_BINDINGS from "@core/di/core.bindings";
import RestaurantsNetwork from "../models/restaurantsNetwork";

@injectable()
class RestaurantsApi {
  @inject(CORE_BINDINGS.HttpService) private httpService!: HttpService;

  getRestaurants = (city: string): Observable<RestaurantsNetwork.GetResponse> =>
    from(
      this.httpService.httpClient.get<RestaurantsNetwork.GetResponse>(`/api/v1/restaurants/${city}`, {
        withCredentials: true,
      })
    ).pipe(map((response) => response.data));
}

export default RestaurantsApi;
