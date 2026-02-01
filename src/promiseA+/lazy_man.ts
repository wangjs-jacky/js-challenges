/**
 * 实现一个 LazyMan（算法面试题）
 *
 * 要求：
 * - 支持链式调用
 * - 支持 sleep（延迟执行）
 * - 支持 eat（立即执行）
 * - 支持 sleepFirst（优先延迟执行）
 * - 任务按顺序执行
 * - 构造函数调用时输出问候语：console.log("Hi, I'm {name}")
 * - eat 方法输出：console.log("Eat {food}")
 *
 * 示例：
 *   LazyMan('Tony').eat('lunch').eat('dinner').sleep(3).eat('junk food');
 *   LazyMan('Tony').eat('lunch').sleepFirst(2).eat('dinner');
 */

/**
 * 任务类型（可按需使用或自行定义）
 */
type Task = {
  type: 'eat' | 'async' | 'sleepFirst' | "sync";
  content?: string;
  time?: number;
};

/**
 * LazyMan 类
 * 支持链式调用，控制任务执行顺序与时机
 */
class LazyManClass {
  private name: string;
  private tasks: Task[];
  hasTrigger: boolean;

  constructor(name: string) {
    this.name = name;
    this.tasks = [{
      type: "sync",
      content: "Hi, I'm " + this.name
    }];
    this.hasTrigger = false;
    setTimeout(() => {
      this.start();
    }, 0)
  }

  /** 立即执行：吃食物，输出 Eat {food} */
  eat(food: string): this {
    this.tasks.push({
      type: "sync",
      content: "Eat " + food
    })
    setTimeout(() => this.start(), 0)
    return this;
  }

  /** 延迟执行：先等待 seconds 秒，再继续后续任务 */
  sleep(seconds: number): this {
    this.tasks.push({
      type: "async",
      time: seconds * 1000  // 统一存毫秒，start() 里直接用
    })
    return this;
  }

  /** 优先延迟执行：先等待 seconds 秒，再执行当前已排队的任务 */
  sleepFirst(seconds: number): this {
    this.tasks.unshift({
      type: "async",
      time: seconds * 1000
    })
    return this;
  }

  async start() {
    if (this.hasTrigger) return;
    this.hasTrigger = true;
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const { content, type, time } = task;
      if (type === "sync") {
        console.log(content);
      } else if (type == "async") {
        await new Promise((resolve, reject) => {
          setTimeout(() => { resolve(undefined) }, time)
        })
      }
    }
  }
}

/**
 * LazyMan 工厂函数
 * 用法：LazyMan('Tony').eat('lunch').sleep(2).eat('dinner')
 */
export function LazyMan(name: string): LazyManClass {
  // TODO: 可选：在合适时机启动任务队列
  return new LazyManClass(name);
}

export { LazyManClass };
