/**
 * 实现异步数据流的顺序输出
 *
 * 要求：
 * - 接收异步数据流（通过 add 添加）
 * - 按照「添加顺序」（入队顺序）依次输出，不是按 Promise 谁先 resolve 谁先输出
 * - 即使后添加的 Promise 先完成，也要等待先添加的完成后再按序输出
 * - 可以使用队列机制
 *
 * 测试用例参考：
 * ```typescript
 * const stream = new AsyncStream();
 * const output: number[] = [];
 *
 * // 添加3个异步任务，完成顺序是 3 -> 1 -> 2
 * stream.add(
 *   new Promise(resolve => setTimeout(() => resolve(1), 300)),
 *   val => output.push(val)
 * );
 * stream.add(
 *   new Promise(resolve => setTimeout(() => resolve(2), 200)),
 *   val => output.push(val)
 * );
 * stream.add(
 *   new Promise(resolve => setTimeout(() => resolve(3), 100)),
 *   val => output.push(val)
 * );
 *
 * // 等待所有任务完成
 * await new Promise(resolve => setTimeout(resolve, 500));
 *
 * // 输出顺序应该是 [1, 2, 3]，而不是 [3, 2, 1]
 * expect(output).toEqual([1, 2, 3]);
 * ```
 */

/**
 * 异步数据流类
 * 确保按添加顺序依次输出；若后添加的 Promise 先完成，会等待前面的再输出
 */
export class AsyncStream {
  // 可按需使用的属性：
  // private queue: Array<{ promise: Promise<any>; index: number; onResolve: Function; onReject?: Function }> = [];
  // private currentIndex: number = 0;
  // private completedResults: Map<number, any> = new Map();
  // private processing: boolean = false;

  /**
   * 添加异步数据流到队列
   * @param promise 异步数据流的 Promise
   * @param onResolve 成功回调函数
   * @param onReject 失败回调函数（可选）
   */
  add<T>(
    promise: Promise<T>,
    onResolve: (value: T) => void,
    onReject?: (error: any) => void
  ): void {
    // TODO: 实现 add 方法
    // 提示：
    // 1. 为每个 Promise 分配一个索引（按添加顺序）
    // 2. 将 Promise、索引、回调函数存入队列
    // 3. 监听 Promise 的完成，但不是立即回调
    // 4. 只有当当前是"下一个该输出"的索引时，才执行回调
    // 5. 如果后续的 Promise 先完成，先缓存结果，等待前面的完成
    throw new Error('Not implemented');
  }

  /**
   * 处理队列中的数据流（可选辅助方法）
   * 按照顺序输出已完成的数据
   */
  private async process(): Promise<void> {
    // TODO: 可选：实现队列处理逻辑
    // 提示：
    // 1. 从 currentIndex 开始检查
    // 2. 如果该索引的结果已缓存，执行回调并输出
    // 3. 继续检查下一个索引，直到遇到未完成的索引
    // 4. 可以使用递归或循环实现
    throw new Error('Not implemented');
  }

  /**
   * 执行指定索引的回调（可选辅助方法）
   * @param index 索引值
   */
  private executeCallback(index: number): void {
    // TODO: 可选：执行指定索引的回调函数
    throw new Error('Not implemented');
  }

  /**
   * 等待所有 Promise 完成（可选方法）
   * @returns Promise，当所有 Promise 完成时 resolve
   */
  async waitForAll(): Promise<void> {
    // TODO: 可选：实现等待所有 Promise 完成的功能
    throw new Error('Not implemented');
  }
}

/**
 * 函数式风格的异步流输出（可选实现）
 * @param promises Promise 数组
 * @param callbacks 对应的回调函数数组
 * @returns Promise，当所有输出完成时 resolve
 */
export function asyncStream<T>(
  promises: Promise<T>[],
  callbacks: Array<(value: T) => void>
): Promise<void> {
  // TODO: 可选：实现函数式风格的异步流输出
  throw new Error('Not implemented');
}
