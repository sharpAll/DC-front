import http from "/@/utils/request";
import { LoginResult } from "/@/types/axios";
enum Api {
  // user login api
  Login = "/sys/login",
}
interface LoginParams {
  username: string;
  password: string;
  captcha: string;
  uuid: string;
}
export function loginApi(params: LoginParams): Promise<LoginResult> {
  return http.request({
    url: Api.Login,
    method: "POST",
    data: params,
  });
}
