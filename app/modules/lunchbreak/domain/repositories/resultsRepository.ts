import { Observable } from "rxjs";
import { Result } from "../models";

interface ResultsRepository {
  getResults(date?: string): Observable<{ date: string; results: Result[] }>;
}

export default ResultsRepository;
