/**
 * async/await 实现原理
 * 
 * 要求：
 * - 理解 async/await 是 Generator + Promise 的语法糖
 * - 实现一个自动执行 Generator 的函数
 * - 处理 Promise 的 resolve 和 reject
 * - 支持 try/catch 错误处理
 */

/**
 * 将 Generator 函数转换为类似 async/await 的函数
 * @param generatorFn Generator 函数
 * @returns 返回一个 Promise，自动执行 Generator 函数
 */
export function asyncToGenerator<T = any>(
  generatorFn: (...args: any[]) => Generator<any, T, any>
): (...args: any[]) => Promise<T> {
  return (...args) => {
    const gen = generatorFn(...args);
    return new Promise((resolve, reject) => {
      function step(key: "next" | "throw", arg?: any) {
        const result = gen[key](arg);
        if (result.done) {
          resolve(result.value);
        } else {
          Promise.resolve(result.value)
            .then(val => {
              // 传递下一个值
              step('next', val)
            }).catch(err => {
              step("throw", err)
            })
        }
      };
      step("next");
    })
  }
}
