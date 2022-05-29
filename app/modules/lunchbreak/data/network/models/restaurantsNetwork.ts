namespace RestaurantsNetwork {
  export interface GetResponse {
    alreadyVoted: string | null;
    date: string;
    restaurants: Restaurant[];
  }

  export interface Restaurant {
    id: string;
    name: string;
    openingHours: string;
    votes: number;
    dishes: Dish[];
  }

  export interface Dish {
    name: string;
    price: string;
    attributes: string[];
  }
}

export default RestaurantsNetwork;
