import { inject, injectable } from "inversify";
import { from, map, Observable } from "rxjs";
import HttpService from "@core/data/services/http.service";
import CORE_BINDINGS from "@core/di/core.bindings";
import YmparistoNetwork from "../models/ymparistoNetwork";

@injectable()
class MunicipalitiesApi {
  @inject(CORE_BINDINGS.HttpService) private httpService!: HttpService;

  getMunicipalities = (): Observable<YmparistoNetwork.GetMunicipalitiesResponse> =>
    from(
      this.httpService.httpClient.get<YmparistoNetwork.GetMunicipalitiesResponse>(
        "/api/Hakemistorajapinta/1.0/odata/Kunta",
        {
          baseURL: "https://rajapinnat.ymparisto.fi",
        }
      )
    ).pipe(map((response) => response.data));
}

export default MunicipalitiesApi;
