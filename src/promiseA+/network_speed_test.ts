/**
 * 实现网络测速选择最快 API
 * 
 * 要求：
 * - 同时请求多个 API 端点
 * - 测量每个请求的响应时间
 * - 返回最快响应的 API 地址和结果
 * - 可以取消其他未完成的请求
 */

/**
 * API 响应结果类型
 */
export interface APIResult {
  url: string;
  data?: any;
  error?: any;
  duration: number;
  index: number;
}

/**
 * 测速结果类型
 */
export interface SpeedTestResult {
  fastest: string;
  data: any;
  duration: number;
  allResults: APIResult[];
}

/**
 * 网络测速，选择响应最快的 API
 * @param apiUrls API 端点数组
 * @returns Promise，resolve 时返回最快 API 的结果
 */

interface Output {
  fastest: string;
  duration: number;
  data: any;
}
export async function findFastestAPI(apiUrls: string[]): Promise<SpeedTestResult> {
  return Promise.race((apiUrls).map((apiUrl) => {
    let time = new Date().getSeconds();
    return new Promise<Output>((resolve, reject) => {
      global.fetch(apiUrl).then((data) => {
        console.error("wjs: data", data);
        resolve({
          fastest: apiUrl,
          duration: new Date().getSeconds() - time,
          data: data
        })
      });

    })
  }))
}
