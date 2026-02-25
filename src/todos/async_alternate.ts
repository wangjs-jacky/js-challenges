/**
 * 交替执行多个异步任务
 *
 * 要求：
 * - 多个异步任务按顺序交替执行
 * - 每个任务执行完成后才执行下一个
 * - 支持指定每个任务执行的次数（rounds）
 * - 返回所有任务的结果
 */

/**
 * 任务类型：无参、返回 Promise 的函数
 */
export type Task<T = unknown> = () => Promise<T>;

/**
 * 交替执行多个异步任务
 * @param tasks 任务数组，每个任务为返回 Promise 的函数
 * @param rounds 每个任务执行的轮数，默认为 1
 * @returns Promise，resolve 时返回按执行顺序收集的结果数组
 */
export function alternateTasks<T = unknown>(
  tasks: Task<T>[],
  rounds?: number
): Promise<T[]> {
  // TODO: 实现交替执行的逻辑
  // throw new Error('Not implemented');
  return Promise.all(tasks.map((task)=> task()));
}
