import { inject, injectable } from "inversify";
import { from, iif, mergeMap, Observable, of, tap } from "rxjs";
import { isNil } from "ramda";
import CORE_BINDINGS from "@core/di/core.bindings";
import DatabaseService from "@core/data/services/database.service";
import { Municipality } from "@lunchbreak/domain/models";

@injectable()
class YmparistoStorage {
  @inject(CORE_BINDINGS.DatabaseService) private databaseService!: DatabaseService;

  private readonly MUNICIPALITIES_TABLE_KEY = "MUNICIPALITIES_TABLE_KEY";

  get = (): Observable<Municipality[]> =>
    from(this.databaseService.databaseClient.getItem<Municipality[]>(this.MUNICIPALITIES_TABLE_KEY)).pipe(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      mergeMap((data) => iif(() => isNil(data), of<Municipality[]>([]), of(data!)))
    );

  save = (municipalities: Municipality[]) =>
    from(
      this.databaseService.databaseClient.setItem<Municipality[]>(this.MUNICIPALITIES_TABLE_KEY, municipalities)
    ).pipe(tap((data) => console.log("save municipalities", data)));
}

export default YmparistoStorage;
