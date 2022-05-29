import { inject, injectable } from "inversify";
import { map } from "rxjs";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import VotesRepository from "@lunchbreak/domain/repositories/votesRepository";
import VotesApi from "../network/api/votesApi";

@injectable()
class RemoteVotesRepository implements VotesRepository {
  @inject(LUNCHBREAK_BINDINGS.VotesApi) private votesApi!: VotesApi;

  submitVote = (restaurantId: string) =>
    this.votesApi.submitVote(restaurantId).pipe(map((response) => response.status));
}

export default RemoteVotesRepository;
