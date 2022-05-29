import { injectable } from "inversify";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import IHttpService from "@core/domain/interfaces/http.service";

@injectable()
class HttpService implements IHttpService {
  private client: AxiosInstance;

  /**
   * Axios configuration options
   *
   * @returns {AxiosRequestConfig} AxiosRequestConfig
   * @docs https://axios-http.com/docs/req_config
   */
  private options: AxiosRequestConfig = {
    baseURL: process.env.BASE_URL,
    timeout: 60000,
  };

  constructor() {
    this.client = axios.create(this.options);

    this.client.interceptors.request.use((req) => {
      if (process.env.NODE_ENV !== "production") console.debug(req);
      return req;
    });

    this.client.interceptors.response.use(
      (res) => {
        if (process.env.NODE_ENV !== "production") console.debug(res);
        return res;
      },
      (err: AxiosError) => {
        if (process.env.NODE_ENV !== "production") console.debug(err.response?.data);
        return Promise.reject(err);
      }
    );
  }

  /**
   * Getter method which returns http client to interact with the API
   * @returns {AxiosInstance} AxiosInstance
   */
  get httpClient(): AxiosInstance {
    if (!this.client) {
      throw Error("Attempt to use Http Service before it was initialized");
    }
    return this.client;
  }
}

export default HttpService;
