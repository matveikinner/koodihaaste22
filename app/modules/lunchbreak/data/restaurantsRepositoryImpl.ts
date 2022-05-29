import { inject, injectable } from "inversify";
import { Observable } from "rxjs";
import RestaurantsRepository from "@lunchbreak/domain/repositories/restaurantsRepository";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import { Restaurant, Vote } from "@lunchbreak/domain/models";

@injectable()
class RestaurantsRepositoryImpl implements RestaurantsRepository {
  @inject(LUNCHBREAK_BINDINGS.RemoteRestaurantsRepository) private remoteRestaurantsRepository!: RestaurantsRepository;

  /**
   * @param {string} city The user chosen Finnish city by which to search restaurants
   * @returns {Observable<Vote & {restaurants: Restaurant[]}>}
   */
  getRestaurants = (city: string): Observable<Vote & { restaurants: Restaurant[] }> =>
    this.remoteRestaurantsRepository.getRestaurants(city);
}

export default RestaurantsRepositoryImpl;
