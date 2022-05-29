import { inject, injectable } from "inversify";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import VotesRepository from "../repositories/votesRepository";

@injectable()
class SubmitVoteUseCase {
  @inject(LUNCHBREAK_BINDINGS.VotesRepository) private votesRepository!: VotesRepository;

  invoke = (restaurantId: string) => this.votesRepository.submitVote(restaurantId);
}

export default SubmitVoteUseCase;
