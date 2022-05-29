import { inject, injectable } from "inversify";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import ResultsRepository from "@lunchbreak/domain/repositories/resultsRepository";

@injectable()
class ResultsRepositoryImpl implements ResultsRepository {
  @inject(LUNCHBREAK_BINDINGS.RemoteResultsRepository) private remoteResultsRepository!: ResultsRepository;

  getResults = (date?: string) => this.remoteResultsRepository.getResults(date);
}

export default ResultsRepositoryImpl;
