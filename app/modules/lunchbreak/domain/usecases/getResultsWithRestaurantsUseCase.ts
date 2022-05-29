import { inject, injectable } from "inversify";
import { forkJoin, iif, map, mergeMap, Observable, of, tap, withLatestFrom } from "rxjs";
import { isEmpty } from "ramda";
import { format } from "date-fns";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import ResultsRepository from "../repositories/resultsRepository";
import RestaurantsRepository from "../repositories/restaurantsRepository";
import { Restaurant, Result } from "../models";

@injectable()
class GetResultsWithRestaurantsUseCase {
  @inject(LUNCHBREAK_BINDINGS.ResultsRepository) private resultsRepository!: ResultsRepository;
  @inject(LUNCHBREAK_BINDINGS.RestaurantsRepository) private restaurantsRepository!: RestaurantsRepository;

  invoke = (
    date?: string
  ): Observable<{ date: string; results: Result[]; alreadyVoted: string | null; restaurants: Restaurant[] }> => {
    const resultsRequest = this.resultsRepository.getResults(date);

    return resultsRequest.pipe(
      mergeMap(({ results }) =>
        iif(
          () => isEmpty(results),
          of([]),
          forkJoin(results.map(({ city }) => this.restaurantsRepository.getRestaurants(city)))
        )
      ),
      withLatestFrom(resultsRequest),
      map(([allRestaurants = [], results]) => ({
        ...results,
        alreadyVoted: allRestaurants?.[0]?.alreadyVoted || null,
        restaurants: allRestaurants.flatMap(({ restaurants }) => restaurants),
      }))
    );
  };
}

export default GetResultsWithRestaurantsUseCase;
