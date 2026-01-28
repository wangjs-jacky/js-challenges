/**
 * 实现一个 LazyMan
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
  content?: string;
  time?: number;
};

/**
 * LazyMan 类
 * 支持链式调用，可以控制任务的执行顺序和时机
 */
class LazyManClass {
  private name: string;
  private tasks: Task[];

  /**
   * 创建 LazyMan 实例
   * @param name LazyMan 的名字
   */
  constructor(name: string) {
    // TODO: 实现构造函数
    this.name = name;
    this.tasks = [];
    // this.tasks.push()
  }

  /**
   * 立即执行：吃食物
   * @param food 食物名称
   * @returns this，支持链式调用
   */
  eat(food: string): this {
    // TODO: 实现 eat 方法
    this.tasks.push({
      type: "eat",
      value: food,
      content: "Eat " + food
    })
    setTimeout(() => {
      // this.start();
    }, 0)
    return this;
  }

  asyncstart() {
    console.log("Hi, I'm " + this.name);
    for (let i = 0; i < this.tasks.length - 1; i++) {
      const { value, type, content, time } = this.tasks[i];
      if (time) {
        await new Promise((resolve) => {
          setTimeout(() => {
            console.log(content);
            resolve(undefined);
          }, time)
        })
      } else {
        console.log(content);
      }
    }
  }
}

/**
 * 延迟执行：睡眠指定秒数
 * @param seconds 睡眠秒数
 * @returns this，支持链式调用
 */
sleep(seconds: number): this {
  console.log("wjs: xxx", this.tasks);

  // 对最后一个任务拓展一个 time
  this.tasks[this.tasks.length - 1].time = seconds;
  console.log("wjs: this.tasks", this.tasks);
  return this;
}

/**
 * 优先延迟执行：优先睡眠指定秒数
 * @param seconds 睡眠秒数
 * @returns this，支持链式调用
 */
sleepFirst(seconds: number): this {
  // TODO: 实现 sleepFirst 方法
  throw new Error('Not implemented');
}
}

/**
 * LazyMan 函数
 * 支持 LazyMan('Tony') 的调用方式
 * @param name LazyMan 的名字
 * @returns LazyMan 实例，支持链式调用
 */
export function LazyMan(name: string): LazyManClass {
  // TODO: 实现函数
  // throw new Error('Not implemented');
  return new LazyManClass(name);
}

// 导出类供类型使用
export { LazyManClass };
