namespace ResultsNetwork {
  export interface GetResponse {
    date: string;
    results: Result[];
  }

  export interface Result {
    votes: number;
    restaurantid: string;
    name: string;
    city: string;
  }
}

export default ResultsNetwork;
