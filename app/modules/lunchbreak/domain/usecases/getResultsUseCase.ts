import { inject, injectable } from "inversify";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import ResultsRepository from "../repositories/resultsRepository";

@injectable()
class GetResultsUseCase {
  @inject(LUNCHBREAK_BINDINGS.ResultsRepository) private resultsRepository!: ResultsRepository;

  invoke = (date?: string) => this.resultsRepository.getResults(date);
}

export default GetResultsUseCase;
