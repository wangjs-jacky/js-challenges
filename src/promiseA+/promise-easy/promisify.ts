/**
 * 实现 Promisify
 *
 * 要求：
 * - 将回调风格 (err, value) => ... 转换为 Promise 返回
 * - 回调的 err 为非 null/undefined 时，Promise reject
 * - 回调的 err 为 null/undefined 时，Promise resolve 返回值
 * - 保持 this 上下文
 * - 支持多参数返回（返回数组）
 */

/**
 * 错误优先的回调函数类型
 */
type ErrorFirstCallback = (err: Error | null, ...results: any[]) => void;

/**
 * 原始函数类型（最后一个参数是回调）
 */
type CallbackFunction = (...args: any[]) => void;

/**
 * Promisify 后的函数类型
 */
type PromisifiedFunction = (...args: any[]) => Promise<any>;

/**
 * 将错误优先的回调风格函数转换为 Promise 返回的函数
 * @param fn 原始函数，最后一个参数是错误优先的回调
 * @returns 返回 Promise 的函数
 */
export function promisify(fn: CallbackFunction): PromisifiedFunction {
  // TODO: 实现 promisify 的逻辑
  return function (this, ...args) {
    return new Promise<any>((resolve, reject) => {
      const callback = (error, ...message) => {
        if (error) {
          reject(error);
        } else {
          if (message.length == 1) {
            resolve(message[0]);
          } else {
            resolve(message);
          }
        }
      }
      fn.call(this, ...args, callback);
    })
  }
}
