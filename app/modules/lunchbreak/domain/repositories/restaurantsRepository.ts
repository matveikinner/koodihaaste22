import { Observable } from "rxjs";
import { Restaurant, Vote } from "../models";

interface RestaurantsRepository {
  getRestaurants(city: string): Observable<Vote & { restaurants: Restaurant[] }>;
}

export default RestaurantsRepository;
