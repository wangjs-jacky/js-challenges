/**
 * 实现 Promise.any
 *
 * 要求：
 * - 接收一个 Promise 数组
 * - 返回第一个 fulfilled 的 Promise 的值
 * - 如果所有 Promise 都 rejected，抛出 AggregateError（包含所有拒绝原因）
 * - 空数组立即 reject
 */

/**
 * 自定义 Promise.any 实现
 * @param iterable 可迭代对象（数组、Set等），可以包含 Promise、thenable 对象或普通值
 * @returns Promise，返回第一个 fulfilled 的 Promise 的值
 * @throws {AggregateError} 当所有 Promise 都 rejected 时
 */
export function promiseAny<T>(iterable: Iterable<any>): Promise<T> {
  const promises = [...iterable];
  const errors: any[] = [];
  let rejectCount = 0;

  if (promises.length === 0) {
    return Promise.reject(new AggregateError([], 'All promises were rejected'));
  }

  return new Promise<T>((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve, (err) => {
        errors.push(err);
        rejectCount++;
        if (rejectCount === promises.length) {
          reject(new AggregateError(errors, 'All promises were rejected'));
        }
      });
    });
  });
}
