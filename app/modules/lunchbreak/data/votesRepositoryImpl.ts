import { inject, injectable } from "inversify";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import VotesRepository from "@lunchbreak/domain/repositories/votesRepository";

@injectable()
class VotesRepositoryImpl implements VotesRepository {
  @inject(LUNCHBREAK_BINDINGS.RemoteVotesRepository) private remoteVotesRepository!: VotesRepository;

  submitVote = (restaurantId: string) => this.remoteVotesRepository.submitVote(restaurantId);
}

export default VotesRepositoryImpl;
