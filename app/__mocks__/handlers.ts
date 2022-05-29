import { rest, DefaultRequestBody, RestHandler, MockedRequest } from "msw";
import { format } from "date-fns";
import ResultsNetwork from "@lunchbreak/data/network/models/resultsNetwork";
import RestaurantsNetwork from "@lunchbreak/data/network/models/restaurantsNetwork";
import VotesNetwork from "@lunchbreak/data/network/models/votesNetwork";
import YmparistoNetwork from "@lunchbreak/data/network/models/ymparistoNetwork";

const mockBaseUrl = "http://localhost";

const mockRestaurants: RestaurantsNetwork.GetResponse = {
  alreadyVoted: null,
  date: format(new Date(), "yyyy-MM-dd"),
  restaurants: [
    {
      id: "75519a20af40f94d2e304ee996c7e4ec4dc86f5d75c4332245e01f929988ed3f",
      name: "Loru Vantaa",
      openingHours: "10:30-14",
      votes: 0,
      dishes: [],
    },
  ],
};

const mockRestaurantsWithVote: RestaurantsNetwork.GetResponse = {
  alreadyVoted: "75519a20af40f94d2e304ee996c7e4ec4dc86f5d75c4332245e01f929988ed3f",
  date: format(new Date(), "yyyy-MM-dd"),
  restaurants: [
    {
      id: "75519a20af40f94d2e304ee996c7e4ec4dc86f5d75c4332245e01f929988ed3f",
      name: "Loru Vantaa",
      openingHours: "10:30-14",
      votes: 0,
      dishes: [],
    },
  ],
};

const mockResults: ResultsNetwork.GetResponse = {
  date: format(new Date(), "yyyy-MM-dd"),
  results: [
    {
      votes: 1,
      restaurantid: "75519a20af40f94d2e304ee996c7e4ec4dc86f5d75c4332245e01f929988ed3f",
      name: "Loru Vantaa",
      city: "Vantaa",
    },
  ],
};

const mockMunicipalities: YmparistoNetwork.GetMunicipalitiesResponse = {
  ["odata.metadata"]: "https://rajapinnat.ymparisto.fi/api/Hakemistorajapinta/1.0/odata/$metadata#Kunta",
  value: [
    {
      Kunta_Id: 92,
      Nimi: "Vantaa",
      NimiRuo: "Vanda",
      Ely_Id: 1001,
      YmpVastuuEly_Id: 1001,
      Seutukunta_Id: 11,
      Maakunta_Id: 1,
      YTunnus: "0124610-9",
    },
  ],
};

const getRestaurants = rest.get<DefaultRequestBody, { mockBaseUrl: string }, RestaurantsNetwork.GetResponse>(
  `${mockBaseUrl}/api/v1/restaurants/Vantaa`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(mockRestaurants))
);

export const getRestaurantsWithVote = rest.get<
  DefaultRequestBody,
  { mockBaseUrl: string },
  RestaurantsNetwork.GetResponse
>(`${mockBaseUrl}/api/v1/restaurants/Vantaa`, (req, res, ctx) =>
  res(ctx.status(200), ctx.json(mockRestaurantsWithVote))
);

const getResults = rest.get<DefaultRequestBody, { mockBaseUrl: string }, ResultsNetwork.GetResponse>(
  `${mockBaseUrl}/api/v1/results`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(mockResults))
);

const submitVote = rest.post<DefaultRequestBody, { mockBaseUrl: string }, VotesNetwork.PostResponse>(
  `${mockBaseUrl}/api/v1/vote/75519a20af40f94d2e304ee996c7e4ec4dc86f5d75c4332245e01f929988ed3f`,
  (req, res, ctx) => res(ctx.status(200))
);

const getMunicipalities = rest.get<
  DefaultRequestBody,
  { mockBaseUrl: string },
  YmparistoNetwork.GetMunicipalitiesResponse
>(`https://rajapinnat.ymparisto.fi/api/Hakemistorajapinta/1.0/odata/Kunta`, (req, res, ctx) =>
  res(ctx.status(200), ctx.json(mockMunicipalities))
);

const handlers: RestHandler<MockedRequest<DefaultRequestBody>>[] = [
  getResults,
  getRestaurants,
  submitVote,
  getMunicipalities,
  getRestaurantsWithVote,
];

export default handlers;
