import Axios, { AxiosInstance } from "axios";
import {
  IAxiosHttpClient,
  STATUS_CODE,
  STATUS_CODE_ERROR,
} from "../model";

export default class HttpClient implements IAxiosHttpClient {
  private client: AxiosInstance;
  protected createAxiosHttpClient(): AxiosInstance {
    return Axios.create({
      baseURL: process.env.BASE_URL,
      responseType: "json" as const,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  private handleError(error: any) {
    switch (error) {
      case STATUS_CODE.INTERNAL_SERVER_ERROR:
        throw new Error(STATUS_CODE_ERROR.INTERNAL_SERVER_ERROR);
      case STATUS_CODE.UNAUTHORIZED:
        throw new Error(STATUS_CODE_ERROR.UNAUTHORIZED);
      case STATUS_CODE.NO_CONTENT:
        throw new Error(STATUS_CODE_ERROR.NO_CONTENT);
      case STATUS_CODE.BAD_REQUEST:
        throw new Error(STATUS_CODE_ERROR.BAD_REQUEST);
      case STATUS_CODE.FORBIDDEN:
        throw new Error(STATUS_CODE_ERROR.FORBIDDEN);
      case STATUS_CODE.TOO_MANY_REQUEST:
        throw new Error(STATUS_CODE_ERROR.TOO_MANY_REQUEST);
    }
  }
  constructor() {
    this.client = this.createAxiosHttpClient();
  }
  async get<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path);
      const { status, data } = response;
      if (status === STATUS_CODE.OK) return data;
    } catch (error: any) {
      this.handleError(error.response.status);
    }
    return {} as TResponse;
  }
}
