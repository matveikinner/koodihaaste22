export default interface IDatabaseService {
  get databaseClient(): LocalForage;
}
