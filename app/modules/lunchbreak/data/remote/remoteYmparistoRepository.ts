import { inject, injectable } from "inversify";
import { map } from "rxjs";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import YmparistoRepository from "@lunchbreak/domain/repositories/ymparistoRepository";
import YmparistoApi from "../network/api/ymparistoApi";
import { mapToMunicipality } from "../network/mappers/mapToMunicipality";

@injectable()
class RemoteYmparistoRepository implements YmparistoRepository {
  @inject(LUNCHBREAK_BINDINGS.YmparistoApi) private ymparistoApi!: YmparistoApi;

  getMunicipalities = () =>
    this.ymparistoApi
      .getMunicipalities()
      .pipe(map((response) => response.value.map((municipality) => mapToMunicipality(municipality))));
}

export default RemoteYmparistoRepository;
