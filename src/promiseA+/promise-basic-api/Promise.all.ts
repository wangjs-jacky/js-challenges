/**
 * 实现 Promise.all
 * 
 * 要求：
 * - 当所有 Promise 都成功时，返回一个包含所有成功结果的数组，顺序与输入顺序一致
 * - 如果任何一个 Promise 失败，立即返回第一个失败的 Promise 的错误
 * - 需要考虑 thenable 对象（具有 then 方法的对象）
 * - 需要考虑非 Promise 值（应该直接作为结果返回）
 * - 需要考虑空数组的情况
 */

/**
 * 自定义 Promise.all 实现
 * @param iterable 可迭代对象（数组、Set等），可以包含 Promise、thenable 对象或普通值
 * @returns Promise，resolve 时返回所有结果数组，reject 时返回第一个错误
 */
export function myPromiseAll<T>(iterable: Iterable<any>): Promise<T[]> {
  const promises = [...iterable];
  
  // 空数组情况：直接返回已 resolve 的 Promise
  if (promises.length === 0) {
    return Promise.resolve([] as T[]);
  }
  
  return new Promise((resolve, reject) => {
    const totalCount = promises.length;
    const results: T[] = new Array(totalCount);
    let fulfilledCount = 0;
    
    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = value;
          fulfilledCount++;
          
          // 当所有 Promise 都完成时，resolve 结果数组
          if (fulfilledCount === totalCount) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}
