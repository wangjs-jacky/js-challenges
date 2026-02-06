/**
 * 实现 Promise.prototype.finally
 *
 * 要求：
 * - 无论 Promise 是 fulfilled 还是 rejected，finally 回调都会执行
 * - finally 回调不接收任何参数
 * - 返回一个新的 Promise，其状态与原 Promise 相同
 * - 如果 finally 回调返回一个 Promise，会等待它完成后再传递原状态
 * - 如果 finally 回调抛出错误，返回的 Promise 会以该错误 rejected
 */

/**
 * Promise.prototype.finally 实现
 * @param callback 无论 Promise 成功或失败都会执行的回调函数
 * @returns 返回一个新的 Promise
 */
Promise.prototype.finally = function (this: Promise<any>, callback?: () => void | Promise<void>): Promise<any> {
  return this.then(
    (res) => {
      return Promise.resolve(callback?.()).then(() => res);
    },
    (err) => {
      return Promise.resolve(callback?.()).then(() => {
        throw err;
      });
    }
  );
};

declare global {
  interface Promise<T> {
    finally(callback?: () => void | Promise<void>): Promise<T>;
  }
}

export { };