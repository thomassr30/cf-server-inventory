export interface IResponseData<T = any> {
  data?: any;
  message?: string;
  access_token?: string;
  meta?: IMeta;
  refresh_token?: string;
  statusCode?: number;
}

interface IMeta {
  totalData: number;
  page: number;
  perPage: number;
}