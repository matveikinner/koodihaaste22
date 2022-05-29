import { Container } from "inversify";
import coreContainer from "@core/di/core.container";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";

// Imports for Restaurants Repository Pattern implementations and use cases
import RestaurantsRepository from "@lunchbreak/domain/repositories/restaurantsRepository";
import RestaurantsRepositoryImpl from "@lunchbreak/data/restaurantsRepositoryImpl";
import RemoteRestaurantsRepository from "@lunchbreak/data/remote/remoteRestaurantsRepository";
import RestaurantsApi from "@lunchbreak/data/network/api/restaurantsApi";
import RestaurantsStorage from "@lunchbreak/data/database/storage/restaurantsStorage";
import GetRestaurantsUseCase from "@lunchbreak/domain/usecases/getRestaurantsUseCase";

// Imports for Results Repository Pattern implementations and use cases
import ResultsRepository from "@lunchbreak/domain/repositories/resultsRepository";
import ResultsRepositoryImpl from "@lunchbreak/data/resultsRepositoryImpl";
import RemoteResultsRepository from "@lunchbreak/data/remote/remoteResultsRepository";
import ResultsApi from "@lunchbreak/data/network/api/resultsApi";
import GetResultsUseCase from "@lunchbreak/domain/usecases/getResultsUseCase";
import GetResultsWithRestaurantsUseCase from "@lunchbreak/domain/usecases/getResultsWithRestaurantsUseCase";

// Imports for Votes Repository Pattern implementations and use cases
import VotesRepository from "@lunchbreak/domain/repositories/votesRepository";
import VotesRepositoryImpl from "@lunchbreak/data/votesRepositoryImpl";
import RemoteVotesRepository from "@lunchbreak/data/remote/remoteVotesRepository";
import VotesApi from "@lunchbreak/data/network/api/votesApi";
import SubmitVoteUseCase from "@lunchbreak/domain/usecases/submitVoteUseCase";

// Imports for Ymparisto Repository Pattern implementations and use cases
import YmparistoRepository from "@lunchbreak/domain/repositories/ymparistoRepository";
import YmparistoRepositoryImpl from "@lunchbreak/data/ymparistoRepositoryImpl";
import LocalYmparistoRepository from "@lunchbreak/data/local/localYmparistoRepository";
import RemoteYmparistoRepository from "@lunchbreak/data/remote/remoteYmparistoRepository";
import YmparistoApi from "@lunchbreak/data/network/api/ymparistoApi";
import GetMunicipalitiesUseCase from "@lunchbreak/domain/usecases/getMunicipalitiesUseCase";
import YmparistoStorage from "@lunchbreak/data/database/storage/ymparistoStorage";

// Create empty DI container for Lunchbreak Module
const container = new Container();

// Specify parent DI container from which to inheret
container.parent = coreContainer;

// Restaurants Repository Bindings
container.bind<RestaurantsRepository>(LUNCHBREAK_BINDINGS.RestaurantsRepository).to(RestaurantsRepositoryImpl);
container.bind<RestaurantsRepository>(LUNCHBREAK_BINDINGS.RemoteRestaurantsRepository).to(RemoteRestaurantsRepository);
container.bind<RestaurantsApi>(LUNCHBREAK_BINDINGS.RestaurantsApi).to(RestaurantsApi);
container.bind<RestaurantsStorage>(LUNCHBREAK_BINDINGS.RestaurantsStorage).to(RestaurantsStorage);
container.bind<GetRestaurantsUseCase>(LUNCHBREAK_BINDINGS.GetRestaurantsUseCase).to(GetRestaurantsUseCase);

// Results Repository Bindings
container.bind<ResultsRepository>(LUNCHBREAK_BINDINGS.ResultsRepository).to(ResultsRepositoryImpl);
container.bind<ResultsRepository>(LUNCHBREAK_BINDINGS.RemoteResultsRepository).to(RemoteResultsRepository);
container.bind<ResultsApi>(LUNCHBREAK_BINDINGS.ResultsApi).to(ResultsApi);
container.bind<GetResultsUseCase>(LUNCHBREAK_BINDINGS.GetResultsUseCase).to(GetResultsUseCase);
container
  .bind<GetResultsWithRestaurantsUseCase>(LUNCHBREAK_BINDINGS.GetResultsWithRestaurantsUseCase)
  .to(GetResultsWithRestaurantsUseCase);

// Votes Repository Bindings
container.bind<VotesRepository>(LUNCHBREAK_BINDINGS.VotesRepository).to(VotesRepositoryImpl);
container.bind<VotesRepository>(LUNCHBREAK_BINDINGS.RemoteVotesRepository).to(RemoteVotesRepository);
container.bind<VotesApi>(LUNCHBREAK_BINDINGS.VotesApi).to(VotesApi);
container.bind<SubmitVoteUseCase>(LUNCHBREAK_BINDINGS.SubmitVoteUseCase).to(SubmitVoteUseCase);

// Ymparisto Repository Bindings
container.bind<YmparistoRepository>(LUNCHBREAK_BINDINGS.YmparistoRepository).to(YmparistoRepositoryImpl);
container.bind<YmparistoRepository>(LUNCHBREAK_BINDINGS.LocalYmparistoRepository).to(LocalYmparistoRepository);
container.bind<YmparistoRepository>(LUNCHBREAK_BINDINGS.RemoteYmparistoRepository).to(RemoteYmparistoRepository);
container.bind<YmparistoStorage>(LUNCHBREAK_BINDINGS.YmparistoStorage).to(YmparistoStorage);
container.bind<YmparistoApi>(LUNCHBREAK_BINDINGS.YmparistoApi).to(YmparistoApi);
container.bind<GetMunicipalitiesUseCase>(LUNCHBREAK_BINDINGS.GetMunicipalitiesUseCase).to(GetMunicipalitiesUseCase);

export default container;
