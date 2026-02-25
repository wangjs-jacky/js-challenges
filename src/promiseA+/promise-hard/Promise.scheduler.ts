/**
 * 实现有并发限制的 Promise 调度器
 * 
 * 要求：
 * - 接收一个任务数组和并发限制数
 * - 同时最多执行指定数量的任务
 * - 当一个任务完成后，自动执行下一个任务
 * - 返回一个 Promise，当所有任务完成时 resolve
 */

/**
 * Promise 调度器类
 * 限制同时执行的 Promise 数量，实现并发控制
 */
export class PromiseScheduler {
  private limit: number;
  private queue: Array<() => Promise<any>> = [];

  /**
   * 创建 Promise 调度器
   * @param limit 并发限制数，同时最多执行的任务数量
   */
  constructor(limit: number) {
    if (limit <= 0) {
      throw new Error('并发限制数必须大于 0');
    }
    this.limit = limit;
  }

  /**
   * 添加任务数组并执行
   * @param tasks 任务数组，每个任务是一个返回 Promise 的函数
   * @returns Promise，resolve 时返回所有任务的结果数组
   */
  async add<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
    // 所有任务
    const allTasks = [] as Promise<T>[];
    // 进行中任务
    const runningTasks = [] as Promise<T>[];

    for (let i = 0; i < tasks.length; i++) {
      const curTask = Promise.resolve(tasks[i]());
      allTasks.push(curTask);
      const curPromise = curTask.finally(() => {
        // 成功后，从 runningTasks 中删除对应的元素
        runningTasks.splice(runningTasks.indexOf(curPromise), 1);
      });
      runningTasks.push(curPromise);
      // 添加后，runningTasks 从小于 limit 达到 limit 数量时，即停止等待 race 执行结束
      if (runningTasks.length == this.limit) {
        await Promise.race(runningTasks);
      }
    }

    return Promise.all(allTasks);
  }
}
