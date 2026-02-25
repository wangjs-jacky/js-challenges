/**
 * 设计任务队列
 * 
 * 要求：
 * - 接收任务数组，每个任务包含执行时间和回调函数
 * - 按照任务的时间间隔依次执行
 * - 例如：1秒后打印1，3秒后打印2，4秒后打印3（总耗时8秒）
 * - 支持动态添加任务
 */

/**
 * 任务回调函数类型
 */
export type TaskCallback = () => void | Promise<void>;

/**
 * 任务队列类
 */
export class TaskQueue {
  private tasks: Array<{ delay: number; callback: TaskCallback }> = [];
  private currentTime: number = 0;

  /**
   * 添加任务到队列
   * @param delay 延迟时间（毫秒），相对于上一个任务完成的时间
   * @param callback 任务回调函数
   */
  add(delay: number, callback: TaskCallback): void {
    this.tasks.push({ delay, callback })
  }

  /**
   * 开始执行所有任务
   * @returns Promise，所有任务执行完成后 resolve
   */
  async start(): Promise<void> {
    // if (this.tasks.length == 0) return;
    // for (let i = 0; i < this.tasks.length; i++) {
    //   const { delay, callback } = this.tasks[i];
    //   await new Promise((resolve) => {
    //     setTimeout(() => {
    //       callback();
    //       resolve(undefined);
    //     }, delay)
    //   })
    // }

    // 1. 检查 this.length 一直有内容
    while (this.tasks.length > 0) {
      //  2. 先弹出任务
      const task = this.tasks.shift();
      
      const { delay, callback } = task!;
      await new Promise((resolve) => {
        setTimeout(() => {
          callback();
          resolve(undefined);
        }, delay)
      })
    }
  }
}
