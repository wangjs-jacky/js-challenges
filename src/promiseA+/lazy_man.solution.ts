/**
 * 实现一个 LazyMan - 标准答案
 * 
 * 要求：
 * - 支持链式调用
 * - 支持 sleep（延迟执行）
 * - 支持 eat（立即执行）
 * - 支持 sleepFirst（优先延迟执行）
 * - 任务按顺序执行
 * - 构造函数调用时输出问候语：console.log("Hi, I'm {name}")
 * - eat 方法输出：console.log("Eat {food}")
 */

/**
 * 任务类型
 */
type Task = {
  type: 'eat' | 'sleep' | 'sleepFirst';
  value: string | number;
};

/**
 * LazyMan 类
 * 支持链式调用，可以控制任务的执行顺序和时机
 */
class LazyManClass {
  private name: string;
  private tasks: Task[] = [];
  private isExecuting: boolean = false;
  private hasGreeted: boolean = false;

  /**
   * 创建 LazyMan 实例
   * @param name LazyMan 的名字
   */
  constructor(name: string) {
    this.name = name;
    // 使用 setTimeout 确保构造函数调用后再执行任务
    // 这样可以在链式调用完成后再开始执行
    setTimeout(() => {
      this.executeTasks();
    }, 0);
  }

  /**
   * 立即执行：吃食物
   * @param food 食物名称
   * @returns this，支持链式调用
   */
  eat(food: string): this {
    this.tasks.push({ type: 'eat', value: food });
    return this;
  }

  /**
   * 延迟执行：睡眠指定秒数
   * @param seconds 睡眠秒数
   * @returns this，支持链式调用
   */
  sleep(seconds: number): this {
    this.tasks.push({ type: 'sleep', value: seconds });
    return this;
  }

  /**
   * 优先延迟执行：优先睡眠指定秒数
   * @param seconds 睡眠秒数
   * @returns this，支持链式调用
   */
  sleepFirst(seconds: number): this {
    // sleepFirst 的任务需要插入到队列前面，优先执行
    this.tasks.unshift({ type: 'sleepFirst', value: seconds });
    return this;
  }

  /**
   * 执行任务队列
   * 按顺序执行所有任务
   */
  private async executeTasks(): Promise<void> {
    // 设置执行标志
    this.isExecuting = true;

    // 先处理所有 sleepFirst 任务（优先执行）
    while (this.tasks.length > 0 && this.tasks[0].type === 'sleepFirst') {
      const task = this.tasks.shift()!;
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(undefined);
        }, (task.value as number) * 1000);
      });
    }

    // 输出问候语（在所有 sleepFirst 任务执行完后，第一次执行时）
    if (!this.hasGreeted) {
      console.log(`Hi, I'm ${this.name}`);
      this.hasGreeted = true;
    }

    // 如果队列为空，重置执行标志并返回
    if (this.tasks.length === 0) {
      this.isExecuting = false;
      return;
    }

    // 取出第一个任务（非 sleepFirst）
    const task = this.tasks.shift()!;

    // 根据任务类型执行
    switch (task.type) {
      case 'eat':
        // eat 任务立即执行
        console.log(`Eat ${task.value}`);
        // 继续执行下一个任务（递归调用）
        await this.executeTasks();
        break;

      case 'sleep':
        // sleep 任务延迟执行
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(undefined);
          }, (task.value as number) * 1000);
        });
        // 继续执行下一个任务（递归调用）
        await this.executeTasks();
        break;
    }
  }
}

/**
 * LazyMan 函数
 * 支持 LazyMan('Tony') 的调用方式
 * @param name LazyMan 的名字
 * @returns LazyMan 实例，支持链式调用
 */
export function LazyMan(name: string): LazyManClass {
  return new LazyManClass(name);
}

// 导出类供类型使用
export { LazyManClass };
