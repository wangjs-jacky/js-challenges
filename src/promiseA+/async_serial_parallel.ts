/**
 * 异步任务串行 & 并行控制
 * 
 * 要求：
 * - 串行执行：任务按顺序一个接一个执行
 * - 并行执行：所有任务同时执行
 * - 支持混合模式：部分串行、部分并行
 * - 返回所有任务的结果数组
 */

/**
 * 异步任务函数类型
 */
export type AsyncTask<T = any> = () => Promise<T>;

/**
 * 串行执行异步任务
 * @param tasks 异步任务数组
 * @returns Promise，返回所有任务的结果数组
 */
export async function serial<T = any>(tasks: AsyncTask<T>[]): Promise<T[]> {
  // TODO: 实现串行执行逻辑
  // throw new Error('Not implemented');
  let result = [] as T[];
  for (let i = 0; i < tasks.length; i++) {
    const res = await Promise.resolve(tasks[i]());
    result[i] = res;
  }
  return result;
}

/**
 * 并行执行异步任务
 * @param tasks 异步任务数组
 * @returns Promise，返回所有任务的结果数组
 */
export function parallel<T = any>(tasks: AsyncTask<T>[]): Promise<T[]> {
  // TODO: 实现并行执行逻辑
  // throw new Error('Not implemented');
  return Promise.all(tasks.map(task => task()));
}

/**
 * 混合模式：部分串行、部分并行
 * @param tasks 异步任务数组
 * @param concurrency 并发数量（默认全部并行）
 * @returns Promise，返回所有任务的结果数组
 */
export function mixed<T = any>(
  tasks: AsyncTask<T>[],
  concurrency: number = tasks.length
): Promise<T[]> {
  const allTasks: Promise<Awaited<T>>[] = [];
  const runningTasks: Promise<Awaited<T>>[] = [];

  for (let i = 0; i < tasks.length; i++) {
    const curTask = Promise.resolve(tasks[i]());
    allTasks.push(curTask);
    const promiseWithClearUp = curTask.finally(() => {
      runningTasks.splice(runningTasks.indexOf(promiseWithClearUp), 1);
    });
    runningTasks.push(promiseWithClearUp);
    if (runningTasks.length == concurrency) {
      Promise.race(runningTasks);
    }
  }
  return Promise.all(allTasks);
}
