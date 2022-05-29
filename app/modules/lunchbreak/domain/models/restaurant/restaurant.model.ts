import Dish from "../dish/dish.model";

interface Restaurant {
  id: string;
  name: string;
  openingHours: string;
  votes: number;
  dishes: Dish[];
  city: string;
}

export default Restaurant;
