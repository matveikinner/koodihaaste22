import { inject, injectable } from "inversify";
import { Observable } from "rxjs";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import YmparistoRepository from "@lunchbreak/domain/repositories/ymparistoRepository";
import { Municipality } from "@lunchbreak/domain/models";
import YmparistoStorage from "../database/storage/ymparistoStorage";

@injectable()
class LocalYmparistoRepository implements YmparistoRepository {
  @inject(LUNCHBREAK_BINDINGS.YmparistoStorage) private ymparistoStorage!: YmparistoStorage;

  getMunicipalities = (): Observable<Municipality[]> => this.ymparistoStorage.get();

  saveMunicipalities = (municipalities: Municipality[]): Observable<Municipality[]> =>
    this.ymparistoStorage.save(municipalities);
}

export default LocalYmparistoRepository;
