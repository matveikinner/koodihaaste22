import { inject, injectable } from "inversify";
import { Observable } from "rxjs";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import RestaurantsRepository from "../repositories/restaurantsRepository";
import { Restaurant, Vote } from "../models";

@injectable()
class GetRestaurantsUseCase {
  @inject(LUNCHBREAK_BINDINGS.RestaurantsRepository) private restaurantsRepository!: RestaurantsRepository;

  invoke = (
    city: string
  ): Observable<
    Vote & {
      restaurants: Restaurant[];
    }
  > => this.restaurantsRepository.getRestaurants(city);
}

export default GetRestaurantsUseCase;
