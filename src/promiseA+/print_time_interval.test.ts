import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TimePrinter, printTimeRecursive } from './print_time_interval';

/**
 * 每隔 3 秒输出当前时间测试用例
 * 
 * 测试重点：
 * 1. 每隔指定时间间隔输出当前时间
 * 2. 支持开始和停止功能
 * 3. 时间格式可配置
 * 4. 使用多种方法实现（setInterval、递归 setTimeout、Promise 等）
 */

describe('TimePrinter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该每隔指定时间输出当前时间', () => {
    const printer = new TimePrinter(3000);
    const outputs: string[] = [];

    printer.start((time) => {
      outputs.push(time);
    });

    // 3秒后第一次输出
    vi.advanceTimersByTime(3000);
    expect(outputs.length).toBe(1);

    // 再3秒后第二次输出
    vi.advanceTimersByTime(3000);
    expect(outputs.length).toBe(2);

    // 再3秒后第三次输出
    vi.advanceTimersByTime(3000);
    expect(outputs.length).toBe(3);
  });

  it('应该支持停止功能', () => {
    const printer = new TimePrinter(3000);
    const outputs: string[] = [];

    printer.start((time) => {
      outputs.push(time);
    });

    vi.advanceTimersByTime(3000);
    expect(outputs.length).toBe(1);

    printer.stop();

    vi.advanceTimersByTime(3000);
    // 停止后不应该再输出
    expect(outputs.length).toBe(1);
  });

  it('应该支持自定义时间间隔', () => {
    const printer = new TimePrinter(1000);
    const outputs: string[] = [];

    printer.start((time) => {
      outputs.push(time);
    });

    vi.advanceTimersByTime(1000);
    expect(outputs.length).toBe(1);

    vi.advanceTimersByTime(1000);
    expect(outputs.length).toBe(2);
  });

  it('应该支持自定义时间格式', () => {
    const printer = new TimePrinter(3000);
    const outputs: string[] = [];

    printer.start((time) => {
      outputs.push(time);
    }, 'HH:mm:ss');

    vi.advanceTimersByTime(3000);
    expect(outputs.length).toBe(1);
    expect(outputs[0]).toMatch(/\d{2}:\d{2}:\d{2}/);
  });

  it('应该支持多次启动和停止', () => {
    const printer = new TimePrinter(3000);
    const outputs: string[] = [];

    printer.start((time) => {
      outputs.push(time);
    });

    vi.advanceTimersByTime(3000);
    expect(outputs.length).toBe(1);

    printer.stop();

    printer.start((time) => {
      outputs.push(time);
    });

    vi.advanceTimersByTime(3000);
    expect(outputs.length).toBe(2);
  });
});

describe('printTimeRecursive', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该使用递归 setTimeout 输出时间', () => {
    const outputs: string[] = [];
    const controller = printTimeRecursive(3000, (time) => {
      outputs.push(time);
    });

    vi.advanceTimersByTime(3000);
    expect(outputs.length).toBe(1);

    vi.advanceTimersByTime(3000);
    expect(outputs.length).toBe(2);

    controller.stop();

    vi.advanceTimersByTime(3000);
    // 停止后不应该再输出
    expect(outputs.length).toBe(2);
  });

  it('应该支持自定义时间间隔', () => {
    const outputs: string[] = [];
    const controller = printTimeRecursive(1000, (time) => {
      outputs.push(time);
    });

    vi.advanceTimersByTime(1000);
    expect(outputs.length).toBe(1);

    controller.stop();
  });
});
