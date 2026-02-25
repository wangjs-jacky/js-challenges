/**
 * 实现 Promise.resolve
 *
 * 要求：
 * - 如果参数是原生 Promise，直接返回
 * - 如果参数是 thenable（有 then 方法的对象），调用其 then 方法
 * - 否则返回一个以该值 fulfilled 的 Promise
 */

/**
 * thenable 对象类型
 */
type Thenable = {
  then: (onFulfilled: (value: any) => any, onRejected?: (reason: any) => any) => any;
};

/**
 * 判断是否为 thenable
 * @param value 要判断的值
 * @returns 是否为 thenable
 */
function isThenable(value: any): value is Thenable {
  return value !== null && typeof value === 'object' && typeof value.then === 'function';
}

/**
 * 自定义 Promise.resolve 实现
 * @param value 任意值，可以是普通值、Promise 或 thenable 对象
 * @returns Promise，返回一个以该值 resolved 的 Promise
 */
export function promiseResolve<T>(value: T | PromiseLike<T>): Promise<T> {
  // TODO: 实现 promiseResolve 的逻辑
  return Promise.resolve(value)
}
