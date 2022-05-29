import { inject, injectable } from "inversify";
import { from, mergeMap, Observable, of, tap } from "rxjs";
import { uniqBy, prop } from "ramda";
import { format, isSameDay } from "date-fns";
import CORE_BINDINGS from "@core/di/core.bindings";
import DatabaseService from "@core/data/services/database.service";
import { Restaurant, Vote } from "@lunchbreak/domain/models";

@injectable()
class RestaurantsStorage {
  @inject(CORE_BINDINGS.DatabaseService) private databaseService!: DatabaseService;

  private readonly DATABASE_TABLE_KEY = "restaurants";

  /**
   * If there are any restaurants for the current date with the chosen city return data, otherwise delete possible
   * data for previous days and return default empty value
   * @param {string} city The user chosen Finnish city from which to search restaurants
   * @returns {Observable<Vote & {restaurants: Restaurant[]}>}
   */
  get = (city: string): Observable<Vote & { restaurants: Restaurant[] }> =>
    from(
      this.databaseService.databaseClient.getItem<Vote & { restaurants: Restaurant[] }>(this.DATABASE_TABLE_KEY)
    ).pipe(
      mergeMap((v) => {
        // If there is / are value(s) in the local database table for the current date return data for the user chosen
        // city selection
        if (v && isSameDay(new Date(v.date), new Date()))
          return of({
            ...v,
            restaurants: v.restaurants.filter((restaurant) => restaurant.city === city),
          });
        return of({
          alreadyVoted: null,
          date: "",
          restaurants: [],
        }).pipe(tap(() => from(this.databaseService.databaseClient.removeItem(this.DATABASE_TABLE_KEY))));
      })
    );

  /**
   * Persists restaurants to local database always for the current date
   * @param {Vote & {restaurants: Restaurant[]}} param
   * @returns {Observable<Vote & {restaurants: Restaurant[]}>}
   */
  save = ({
    alreadyVoted,
    date,
    restaurants,
  }: Vote & { restaurants: Restaurant[] }): Observable<Vote & { restaurants: Restaurant[] }> =>
    from(this.databaseService.databaseClient.getItem<Vote & { restaurants: Restaurant[] }>("restaurants")).pipe(
      mergeMap((v) => {
        // If there is / are value(s) in the local database table for the current date persist and merge data by
        // unique ID
        if (v && isSameDay(new Date(v.date), new Date()))
          return from(
            this.databaseService.databaseClient.setItem<Vote & { restaurants: Restaurant[] }>("restaurants", {
              alreadyVoted,
              date,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              restaurants: uniqBy(prop("name"))([...v.restaurants, ...restaurants]) as Restaurant[],
            })
          );
        return of({
          alreadyVoted: null,
          date: format(new Date(), "yyyy-MM-dd"),
          restaurants: [],
        });
      })
    );
}

export default RestaurantsStorage;
