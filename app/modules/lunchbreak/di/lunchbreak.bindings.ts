export default {
  // Restaurants
  RestaurantsRepository: Symbol.for("RestaurantsRepository"),
  RemoteRestaurantsRepository: Symbol.for("RemoteRestaurantsRepository"),
  RestaurantsApi: Symbol.for("RestaurantsApi"),
  RestaurantsStorage: Symbol.for("RestaurantsStorage"),
  GetRestaurantsUseCase: Symbol.for("GetRestaurantsUseCase"),
  // Results
  ResultsRepository: Symbol.for("ResultsRepository"),
  RemoteResultsRepository: Symbol.for("RemoteResultsRepository"),
  ResultsApi: Symbol.for("ResultsApi"),
  GetResultsUseCase: Symbol.for("GetResultsUseCase"),
  GetResultsWithRestaurantsUseCase: Symbol.for("GetResultsWithRestaurantsUseCase"),
  // Votes
  VotesRepository: Symbol.for("VotesRepository"),
  RemoteVotesRepository: Symbol.for("RemoteVotesRepository"),
  VotesApi: Symbol.for("VotesApi"),
  SubmitVoteUseCase: Symbol.for("SubmitVoteUseCase"),
  // Ymparisto
  YmparistoRepository: Symbol.for("YmparistoRepository"),
  LocalYmparistoRepository: Symbol.for("LocalYmparistoRepository"),
  RemoteYmparistoRepository: Symbol.for("RemoteYmparistoRepository"),
  YmparistoStorage: Symbol.for("YmparistoStorage"),
  YmparistoApi: Symbol.for("YmparistoApi"),
  GetMunicipalitiesUseCase: Symbol.for("GetMunicipalitiesUseCase"),
};
