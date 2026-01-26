/**
 * 实现带带宽限制的并发请求控制器
 * 
 * 要求：
 * - 限制同时进行的请求数量（如最多10条）
 * - 当有请求完成时，自动执行下一个请求
 * - 支持动态添加任务
 * - 返回所有请求的结果
 */

/**
 * 带宽限制器类
 * 限制同时执行的请求数量，实现并发控制
 */
export class BandwidthLimiter {
  private limit: number;
  private running: number = 0;
  private queue: Array<{
    task: () => Promise<any>;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  /**
   * 创建带宽限制器
   * @param limit 并发限制数，同时最多执行的请求数量，默认为 10
   */
  constructor(limit: number = 10) {
    if (limit <= 0) {
      throw new Error('Limit must be greater than 0');
    }
    this.limit = limit;
    this.running = 0;
    this.queue = [];
  }

  /**
   * 添加任务到队列并执行
   * @param task 返回 Promise 的任务函数
   * @returns Promise，resolve 时返回任务的结果
   */
  add<T>(task: () => Promise<T>): Promise<T> {
    // 根据 TDD 去写 case
    // 1、根据 const promises = tasks.map(task => limiter.add(task)); 我们需要返回一个 Promise
    // 2、如果，直接使用 task() 去返回 Promise，那就不满足并发条件了。
    // 3、结果：需要使用 new Promise 返回一个新的 Promise，然后存下 resolve 和 reject ，后续手动控制。
    // 4、当  tasks.map(task => limiter.add(task)); 时，就已经要开始执行了。因此这边需要封装一个 this.process 函数专门去执行
    return new Promise((resolve, reject) => {
      this.queue.push({
        task,
        resolve,
        reject
      });
      this.process();
    })
  }

  /**
   * 处理队列中的任务
   * 当运行中的任务数小于限制数且队列不为空时，执行下一个任务
   */
  private async process(): Promise<void> {
    // 1. 检查：如果达到并发限制或队列为空，直接返回
    if (this.running >= this.limit || this.queue.length === 0) {
      return;
    }

    // 2. 从队列中取出一个任务对象（包含 task、resolve、reject）
    const { task, resolve, reject } = this.queue.shift()!;

    // 3. 增加运行计数
    this.running++;

    // 4. 执行任务
    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      // 5. 减少运行计数
      this.running--;

      // 6. 继续处理下一个任务（递归调用）
      this.process();
    }
  }
}