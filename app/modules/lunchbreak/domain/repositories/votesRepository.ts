import { Observable } from "rxjs";

interface VotesRepository {
  submitVote(restaurantId: string): Observable<number>;
}

export default VotesRepository;
