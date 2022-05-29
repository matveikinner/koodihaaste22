import { inject, injectable } from "inversify";
import { mergeMap, Observable, tap } from "rxjs";
import { anyPass, isEmpty, isNil } from "ramda";
import YmparistoRepository from "@lunchbreak/domain/repositories/ymparistoRepository";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import { Municipality } from "@lunchbreak/domain/models";
import LocalYmparistoRepository from "./local/localYmparistoRepository";

@injectable()
class YmparistoRepositoryImpl implements YmparistoRepository {
  @inject(LUNCHBREAK_BINDINGS.LocalYmparistoRepository) private localYmparistoRepository!: LocalYmparistoRepository;
  @inject(LUNCHBREAK_BINDINGS.RemoteYmparistoRepository) private remoteYmparistoRepository!: YmparistoRepository;

  /**
   * Check if the municipalities exist in the local database. If not, retrieves municipalities from API and stores them
   * in the local database
   * @returns {Observable<Municipality[]>}
   */

  getMunicipalities = (): Observable<Municipality[]> =>
    this.localYmparistoRepository.getMunicipalities().pipe(
      mergeMap((dataOrNull) => {
        if (anyPass([isNil, isEmpty])(dataOrNull))
          return this.remoteYmparistoRepository
            .getMunicipalities()
            .pipe(tap((municipalities) => this.localYmparistoRepository.saveMunicipalities(municipalities)));
        return this.localYmparistoRepository.getMunicipalities();
      })
    );
}

export default YmparistoRepositoryImpl;
