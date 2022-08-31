import http from "/@/utils/requestTushare";
import { tushareParams, tushareResult } from "/@/types/axios";

export function tushareApi(params: tushareParams): Promise<tushareResult> {
  return http.request({
    method: "POST",
    data: params,
  });
}
