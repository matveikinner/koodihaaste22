import { Observable } from "rxjs";
import { Municipality } from "../models";

interface YmparistoRepository {
  getMunicipalities(): Observable<Municipality[]>;
}

export default YmparistoRepository;
