import { inject, injectable } from "inversify";
import { map } from "rxjs";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import RestaurantsRepository from "@lunchbreak/domain/repositories/restaurantsRepository";
import RestaurantsApi from "../network/api/restaurantsApi";
import { mapToRestaurant } from "../network/mappers/mapToRestaurant";

@injectable()
class RemoteRestaurantsRepository implements RestaurantsRepository {
  @inject(LUNCHBREAK_BINDINGS.RestaurantsApi) private restaurantsApi!: RestaurantsApi;

  getRestaurants = (city: string) =>
    this.restaurantsApi.getRestaurants(city).pipe(
      map(({ alreadyVoted, date, restaurants }) => ({
        alreadyVoted,
        date,
        restaurants: restaurants.map((restaurant) => mapToRestaurant(restaurant, city)),
      }))
    );
}

export default RemoteRestaurantsRepository;
