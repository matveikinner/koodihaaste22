import { inject, injectable } from "inversify";
import { map } from "rxjs";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import ResultsRepository from "@lunchbreak/domain/repositories/resultsRepository";
import ResultsApi from "../network/api/resultsApi";
import { mapToResult } from "../network/mappers/mapToResult";

@injectable()
class RemoteResultsRepository implements ResultsRepository {
  @inject(LUNCHBREAK_BINDINGS.ResultsApi) private resultsApi!: ResultsApi;

  getResults = (date?: string) =>
    this.resultsApi.getResults(date).pipe(
      map(({ date: responseDate, results }) => ({
        date: responseDate,
        results: results.map((result) => mapToResult(result)),
      }))
    );
}

export default RemoteResultsRepository;
