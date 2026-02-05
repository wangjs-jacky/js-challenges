/**
 * 实现每隔 3 秒输出当前时间
 * 
 * 要求：
 * - 每隔指定时间间隔输出当前时间
 * - 支持开始和停止功能
 * - 时间格式可配置
 * - 使用多种方法实现（setInterval、递归 setTimeout、Promise 等）
 */

/**
 * 时间格式类型
 */
export type TimeFormat = 'HH:mm:ss' | 'YYYY-MM-DD HH:mm:ss' | string;

/**
 * 时间输出控制器接口
 */
export interface TimeController {
  stop: () => void;
}

/**
 * 时间格式化函数
 * @param format 时间格式
 * @returns 格式化后的时间字符串
 */
function formatTime(format: TimeFormat = 'HH:mm:ss'): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  if (format === 'HH:mm:ss') {
    return `${hours}:${minutes}:${seconds}`;
  }

  if (format === 'YYYY-MM-DD HH:mm:ss') {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return now.toLocaleTimeString();
}

/**
 * 方法1: 使用 setInterval 的时间打印器
 */
export class TimePrinter {
  private interval: number;
  private timer: NodeJS.Timeout | null = null;

  /**
   * 创建时间打印器
   * @param interval 时间间隔（毫秒），默认为 3000
   */
  constructor(interval: number = 3000) {
    this.interval = interval;
    this.timer = null;
  }

  /**
   * 开始打印时间
   * @param callback 时间输出回调函数
   * @param format 时间格式，默认为 'HH:mm:ss'
   */
  start(callback: (time: string) => void, format: TimeFormat = 'HH:mm:ss'): void {
    this.timer = setInterval(() => {
      callback(formatTime());
    }, this.interval)
  }

  /**
   * 停止打印时间
   */
  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

  }
}

/**
 * 方法2: 使用递归 setTimeout 的时间打印器
 * @param interval 时间间隔（毫秒），默认为 3000
 * @param callback 时间输出回调函数
 * @param format 时间格式，默认为 'HH:mm:ss'
 * @returns 控制器对象，包含 stop 方法
 */
export function printTimeRecursive(
  interval: number = 3000,
  callback: (time: string) => void,
  format: TimeFormat = 'HH:mm:ss'
): TimeController {
  let timerId: any =  null;
  const main = () => {
    timerId = setTimeout(() => {
      callback(formatTime(format));
      main();
    }, interval);
  };
  main();
  return {
    stop: () => {
      clearTimeout(timerId);
      timerId = null;
    }
  }
}

/**
 * 方法3: 使用 async/await 的时间打印器
 * @param interval 时间间隔（毫秒），默认为 3000
 * @param callback 时间输出回调函数
 * @param format 时间格式，默认为 'HH:mm:ss'
 * @returns 控制器对象，包含 stop 方法
 */
export function printTimeAsync(
  interval: number = 3000,
  callback: (time: string) => void,
  format: TimeFormat = 'HH:mm:ss'
): TimeController {
  let timerId: NodeJS.Timeout | null = null;
  let stopped = false;

  // 使用 setTimeout 包装 async 函数
  const scheduleNext = () => {
    if (stopped) return;

    timerId = setTimeout(async () => {
      if (stopped) return;

      // 执行回调
      callback(formatTime(format));

      // 调度下一次
      scheduleNext();
    }, interval);
  };

  // 开始调度
  scheduleNext();

  return {
    stop: () => {
      stopped = true;
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
    }
  };
}
