/**
 * 实现 Promise 中断请求
 * 
 * 要求：
 * - 创建一个可中断的 Promise 包装器
 * - 支持手动取消请求
 * - 取消后 Promise 应该 reject
 * - 可以配合 AbortController 使用
 */

/**
 * 可取消的 Promise 类型
 */
export interface CancellablePromise<T> extends Promise<T> {
  cancel: (reason?: string) => void;
}

/**
 * 创建一个可中断的 Promise 包装器
 * @param promise 原始 Promise
 * @returns 可取消的 Promise，包含 cancel 方法
 */
export function cancellablePromise<T>(promise: Promise<T>): CancellablePromise<T> {
  let _resolve!: (value: T) => void;
  let _reject!: (reason?: unknown) => void;
  const promiseCanCancel = new Promise<T>((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  }) as CancellablePromise<T>;
  promise.then(_resolve, _reject);
  promiseCanCancel.cancel = (reason?: string) => {
    _reject(reason !== undefined ? new Error(reason) : new Error('Cancelled'));
  };
  return promiseCanCancel;
}

/**
 * 使用 AbortController 的 fetch 包装器
 * @param url 请求 URL
 * @param options fetch 选项
 * @returns 可取消的 fetch Promise
 */
export function fetchWithCancel(
  url: string,
  options?: RequestInit
): CancellablePromise<Response> {
  const opts = options ?? {};
  const { signal } = opts;
  let _resolve!: (value: Response) => void;
  let _reject!: (reason?: unknown) => void;

  const promiseCanCancel = new Promise<Response>((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  }) as CancellablePromise<Response>;

  global.fetch(url, opts).then(_resolve, _reject);

  promiseCanCancel.cancel = (reason?: string) => {
    _reject(reason !== undefined ? new Error(reason) : new Error('Cancelled'));
  };

  if (signal) {
    signal.addEventListener('abort', () => {
      promiseCanCancel.cancel(signal.reason?.toString());
    });
  }

  return promiseCanCancel;
}
