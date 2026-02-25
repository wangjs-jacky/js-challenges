/**
 * 实现 Promisify（支持自定义）
 *
 * 要求：
 * - 支持通过 Symbol('promisify.custom') 自定义 promisify 行为
 * - 如果函数有自定义 promisify 方法，优先使用
 * - 否则使用默认的回调转 Promise 逻辑
 * - 用于处理不遵循标准回调格式的函数
 */

/**
 * 自定义 promisify Symbol
 */
export const promisifyCustomSymbol = Symbol('promisify.custom');

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
 * 支持自定义的 promisify 函数
 * @param fn 原始函数，可以包含自定义 promisify 实现
 * @returns 返回 Promise 的函数
 */
export function promisifyCustom(fn: CallbackFunction): PromisifiedFunction {
  // TODO: 实现 promisifyCustom 的逻辑
  // 1. 检查函数是否有自定义 promisify（通过 Symbol）
  // 2. 如果有，使用自定义实现
  // 3. 否则，使用默认的回调转 Promise 逻辑
  if (promisifyCustomSymbol in fn) {
    const customResult = fn[promisifyCustomSymbol].call(fn);
    // 如果自定义方法返回的是函数，直接使用；否则包装为函数
    if (typeof customResult === 'function') {
      return customResult;
    }
    // 如果返回的是 Promise，包装为函数
    return function () {
      return customResult;
    };
  }

  return function (this, ...args) {
    return new Promise((resolve, reject) => {
      const callback = (err, ...message) => {
        if (err) {
          reject(message);
        } else {
          if (message.length == 1) {
            resolve(message[0])
          } else {
            resolve(message);
          }
        }
      };
      fn.call(this, ...args, callback);
    })
  }
}
