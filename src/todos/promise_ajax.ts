/**
 * 使用 Promise 封装 AJAX/Fetch
 * 
 * 要求：
 * - 封装 XMLHttpRequest，返回 Promise
 * - 封装 Fetch API，添加超时、重试等功能
 * - 支持 GET、POST、PUT、DELETE 等方法
 * - 支持请求头、请求体配置
 * - 统一错误处理
 */

/**
 * AJAX 请求配置选项
 */
export interface AjaxOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

/**
 * 使用 Promise 封装 XMLHttpRequest
 * @param options 请求配置选项
 * @returns Promise，成功时返回响应数据，失败时 reject 错误
 */
export function ajax<T = any>(options: AjaxOptions): Promise<T> {
  // TODO: 实现 XMLHttpRequest 封装
  throw new Error('Not implemented');
}

/**
 * 使用 Promise 封装 Fetch API
 * @param url 请求 URL
 * @param options 请求配置选项（可选）
 * @returns Promise，成功时返回响应数据，失败时 reject 错误
 */
export function request<T = any>(
  url: string,
  options: Omit<AjaxOptions, 'url'> = {}
): Promise<T> {
  // TODO: 实现 Fetch API 封装
  throw new Error('Not implemented');
}
