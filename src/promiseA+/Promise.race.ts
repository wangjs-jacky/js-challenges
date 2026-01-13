/**
 * 实现 Promise.race
 * 
 * 要求：
 * - 返回第一个完成（成功或失败）的 Promise 的结果
 * - 如果输入数组为空，返回的 Promise 永远处于 pending 状态
 * - 需要考虑 thenable 对象和非 Promise 值
 * - 理解竞态条件（race condition）的概念
 */

/**
 * 自定义 Promise.race 实现
 * @param iterable 可迭代对象（数组、Set等），可以包含 Promise、thenable 对象或普通值
 * @returns Promise，返回第一个完成的 Promise 的结果
 */
export function myPromiseRace<T>(iterable: Iterable<any>): Promise<T> {
  // TODO: 实现 Promise.race 的逻辑
  // throw new Error('Not implemented');
  const promises = [...iterable];
  if (promises.length == 0) return new Promise(() => { }) as Promise<T>;
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve, reject)
    })
  })
}
