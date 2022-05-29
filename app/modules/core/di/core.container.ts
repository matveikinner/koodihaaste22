import { Container } from "inversify";
import CORE_BINDINGS from "./core.bindings";
import IHttpService from "@core/domain/interfaces/http.service";
import HttpService from "@core/data/services/http.service";
import IDatabaseService from "@core/domain/interfaces/database.service";
import DatabaseService from "@core/data/services/database.service";

// Create Dependency Injection container for Core module
const container = new Container();

// Bind global http service in singleton scope to the DI container to enable interaction with the external APIs
container.bind<IHttpService>(CORE_BINDINGS.HttpService).to(HttpService).inSingletonScope();

// Bind global database service in singleton scope to the DI container to enable interaction with the local database
container.bind<IDatabaseService>(CORE_BINDINGS.DatabaseService).to(DatabaseService).inSingletonScope();

export default container;
