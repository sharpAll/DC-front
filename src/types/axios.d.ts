export interface BasicResult {
  code: number;
  flag: boolean;
  msg: string;
  info: any;
}

export interface LoginResult {
  code: number;
  flag: boolean;
  msg: string;
  token: string;
  expire: number;
}

export interface tushareParams {
  api_name: string;
  token: string;
  params: any;
  fields: string;
}

export interface tushareResult {
  code: number;
  msg: string;
  data: any;
}
