/**
 * 实现 sleep 函数
 * 
 * 要求：
 * - 接收一个时间参数（毫秒）
 * - 返回一个 Promise，在指定时间后 resolve
 * - 可以使用 async/await 语法
 * - 可以用于延迟执行
 */

/**
 * 延迟指定时间后 resolve 的 Promise
 * @param ms 延迟时间（毫秒）
 * @returns Promise，在指定时间后 resolve
 */
export function sleep(ms: number): Promise<void> {
  if (ms < 0) ms = 0;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
