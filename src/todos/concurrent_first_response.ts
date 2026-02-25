/**
 * 实现并发请求返回第一个成功 response
 *
 * 要求：
 * - 同时发送多个请求
 * - 返回第一个成功响应的结果
 * - 如果所有请求都失败，返回错误
 * - 可以取消其他未完成的请求（可选）
 */

/**
 * 并发请求，返回第一个成功的结果
 * @param iterable 可迭代对象（如 Promise、thenable 或普通值）
 * @returns Promise，resolve 为第一个成功的结果；若全部失败则 reject
 */
export function raceToSuccess<T>(iterable: Iterable<PromiseLike<T> | T>): Promise<T> {
  // return Promise.race([...iterable])
  const promises = [...iterable];
  let rejectCount = 0;

  if(promises.length ==0){
    return Promise.reject(new Error());
  }

  return new Promise((resolve, reject) => {
    promises.map((promise) => {
      Promise.resolve(promise).then(resolve, (err) => { 
        rejectCount++;
        if(rejectCount == promises.length){
          reject("所有请求都失败")
        }
      });
    })
  })
}
