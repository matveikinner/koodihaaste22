import { Result } from "@lunchbreak/domain/models";
import ResultsNetwork from "../models/resultsNetwork";

export const mapToResult = ({ votes, restaurantid, name, city }: ResultsNetwork.Result): Result => ({
  votes,
  restaurantid,
  name,
  city,
});
