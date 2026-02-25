/**
 * 实现 Promise.retry 超时重试机制
 * 
 * 要求：
 * - 接收一个返回 Promise 的函数、最大重试次数和重试延迟时间
 * - 如果 Promise 失败，等待指定时间后重试
 * - 达到最大重试次数后仍失败，则返回错误
 * - 支持指数退避（exponential backoff）策略
 */

/**
 * 自定义 Promise.retry 实现
 * @param fn 返回 Promise 的函数
 * @param maxRetries 最大重试次数（不包括首次尝试）
 * @param delay 重试延迟时间（毫秒）
 * @param exponentialBackoff 是否使用指数退避策略（默认 false）
 * @returns Promise，成功时返回结果，失败时返回最后一次的错误
 */
export function myPromiseRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 1,
  delay: number = 1000,
  exponentialBackoff: boolean = false
): Promise<T> {
  let retryTimes = 0;
  return new Promise((resolve, reject) => {
    Promise.resolve(fn()).then(resolve).catch(err => {
      maxRetries--;
      retryTimes++;
      if (maxRetries > 0) {
        const nextDelay = exponentialBackoff ?
          delay * Math.pow(2, retryTimes - 1) :
          delay;
        setTimeout(() => {
          myPromiseRetry(fn, maxRetries, nextDelay, exponentialBackoff).then(resolve, reject);
        }, delay)
      } else {
        reject(err)
      }
    })
  })
}
