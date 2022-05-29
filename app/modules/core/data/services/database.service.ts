import { injectable } from "inversify";
import localForage from "localforage";
import IDatabaseService from "@core/domain/interfaces/database.service";

@injectable()
class DatabaseService implements IDatabaseService {
  private client: LocalForage;

  /**
   * LocalForage configuration options
   *
   * @returns {LocalForageOptions} LocalForageOptions
   * @docs https://localforage.github.io/localForage/#settings-api-config
   */
  private options: LocalForageOptions = {
    driver: [localForage.INDEXEDDB, localForage.LOCALSTORAGE],
    name: "Food",
    version: 1.0,
    storeName: "food_is_good_database",
    description: "Food Is Good Database",
  };

  constructor() {
    this.client = localForage.createInstance(this.options);
  }

  /**
   * Getter method which returns database client to interact with the local database
   * @returns {LocalForage} LocalForage
   */
  get databaseClient(): LocalForage {
    if (!this.client) {
      throw Error("Attempt to use Database Service before it was initialized");
    }
    return this.client;
  }
}

export default DatabaseService;
