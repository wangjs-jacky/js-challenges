/**
 * 实现 Promise.allSettled
 * 
 * 要求：
 * - 等待所有 Promise 完成（无论成功或失败），返回一个包含所有结果的数组
 * - 每个结果对象包含 `status` 和 `value`（或 `reason`）字段
 * - 不会因为某个 Promise 失败而中断，会等待所有 Promise 完成
 * - 需要考虑 thenable 对象和非 Promise 值
 */

/**
 * Promise.allSettled 返回的结果类型
 */
type SettledResult<T> =
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: any };

/**
 * 自定义 Promise.allSettled 实现
 * @param iterable 可迭代对象（数组、Set等），可以包含 Promise、thenable 对象或普通值
 * @returns Promise，resolve 时返回包含所有结果的对象数组，每个对象包含 status 和 value/reason
 */
export function myPromiseAllSettled<T>(iterable: Iterable<any>): Promise<SettledResult<T>[]> {
  // TODO: 实现 Promise.allSettled 的逻辑
  // throw new Error('Not implemented');
  const promises = [...iterable];
  if (promises.length == 0) return [] as any;
  return new Promise((resolve, reject) => {
    const fufilledArr: Array<SettledResult<T>> = new Array(promises.length);
    let fulfilledCount = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then((val) => {
        fulfilledCount++;
        fufilledArr[i] = { status: "fulfilled", value: val };
        if (fulfilledCount == promises.length) {
          resolve(fufilledArr);
        }
      }, (err) => {
        fulfilledCount++;
        fufilledArr[i] = { status: "rejected", reason: err };
        if (fulfilledCount == promises.length) {
          resolve(fufilledArr);
        }
      })
    })
  })
}
