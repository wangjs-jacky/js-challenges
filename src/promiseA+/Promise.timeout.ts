/**
 * 实现请求超时中断
 * 
 * 要求：
 * - 接收一个 Promise 和超时时间（毫秒）
 * - 如果 Promise 在超时时间内完成，返回结果
 * - 如果超时，返回错误或中断请求
 * - 支持使用 AbortController 真正中断 fetch 请求
 */

/**
 * 自定义 Promise.timeout 实现
 * @param promise 要添加超时功能的 Promise
 * @param timeout 超时时间（毫秒）
 * @param timeoutMessage 超时错误消息（可选）
 * @param abortController AbortController 实例（可选），用于中断请求
 * @returns Promise，成功时返回原 Promise 的结果，超时时 reject
 */
export function myPromiseTimeout<T>(
  promise: Promise<T>,
  timeout: number,
  timeoutMessage?: string,
  abortController?: AbortController
): Promise<T> {
  // ========== 思路1：第一反应 - 使用 Promise.race（80%完成） ==========
  // 核心思路：使用 Promise.race 让超时 Promise 和原 Promise 竞争
  // 第一个 Promise：用 setTimeout 包裹的超时 Promise
  // 第二个 Promise：真实的业务 Promise
  
  const defaultTimeoutMessage = "timeout";
  const finalTimeoutMessage = timeoutMessage || defaultTimeoutMessage;

  // ========== 思路2：核心难点 - 理解 AbortController 的业务需求 ==========
  // 业务场景：传入的 Promise 很可能是 fetch 请求
  // 真实需求：当超时时，不仅要 reject，还要真正中断网络请求
  // 解决方案：在超时时调用 abortController.abort()，让 fetch 请求真正被中断
  // 关键理解：需要给面试官明确这个功能是真实有需求的，不是过度设计
  
  let timeoutId: NodeJS.Timeout | null = null;
  const timeoutPromise = new Promise<T>((resolve, reject) => {
    timeoutId = setTimeout(() => {
      // 关键：如果有 AbortController，先中断请求
      // 这样可以让传入的 fetch 请求真正被中断，而不是只返回错误
      if (abortController) {
        abortController.abort();
      }
      // 然后 reject 超时错误
      reject(finalTimeoutMessage);
    }, timeout);
  });

  // ========== 思路3：边界处理 - 内存泄漏问题 ==========
  // 问题：当原 Promise 先完成时，setTimeout 还在内存中执行，会造成内存泄漏
  // 原因：setTimeout 没有 abort 能力，无法像 fetch 那样被中断
  // 解决方案：对原 Promise 进行包裹，在不改变输出结果的基础上，插入 clearTimeout 的能力
  // 关键：无论原 Promise 成功还是失败，都要清理定时器，避免内存泄漏
  
  const promiseWithCleanup = promise
    .then((result) => {
      // 原 Promise 成功时：清理超时定时器，避免内存泄漏
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      return result;
    })
    .catch((err) => {
      // 原 Promise 失败时：也要清理超时定时器，避免内存泄漏
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      throw err;
    });

  // ========== 最终实现：使用 Promise.race 竞争 ==========
  // Promise.race 会返回最先完成的 Promise 的结果
  // - 如果原 Promise 先完成（成功或失败），返回原 Promise 的结果，并清理定时器
  // - 如果超时 Promise 先完成（即超时），中断请求并返回超时错误
  return Promise.race([timeoutPromise, promiseWithCleanup]);
}
