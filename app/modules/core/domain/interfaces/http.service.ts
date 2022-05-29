import { AxiosInstance } from "axios";

export default interface IHttpService {
  get httpClient(): AxiosInstance;
}
