import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { serial, parallel, mixed } from './async_serial_parallel';

/**
 * 异步任务串行 & 并行控制测试用例
 * 
 * 测试重点：
 * 1. 串行执行：任务按顺序执行
 * 2. 并行执行：所有任务同时执行
 * 3. 混合模式：部分串行、部分并行
 * 4. 结果数组顺序
 * 5. 错误处理
 */

describe('异步任务串行 & 并行控制', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('serial - 串行执行', () => {
    it('应该按顺序执行任务', async () => {
      const tasks = [
        () => new Promise<number>(resolve => setTimeout(() => resolve(1), 100)),
        () => new Promise<number>(resolve => setTimeout(() => resolve(2), 200)),
        () => new Promise<number>(resolve => setTimeout(() => resolve(3), 300))
      ];

      const promise = serial(tasks);
      await vi.advanceTimersByTimeAsync(600);
      const results = await promise;

      expect(results).toEqual([1, 2, 3]);
    });

    it('应该处理空数组', async () => {
      const results = await serial([]);
      expect(results).toEqual([]);
    });

    it('应该处理任务失败', async () => {
      const tasks = [
        () => Promise.resolve(1),
        () => Promise.reject('error'),
        () => Promise.resolve(3)
      ];

      await expect(serial(tasks)).rejects.toBe('error');
    });
  });

  describe('parallel - 并行执行', () => {
    it('应该同时执行所有任务', async () => {
      const tasks = [
        () => new Promise<number>(resolve => setTimeout(() => resolve(1), 100)),
        () => new Promise<number>(resolve => setTimeout(() => resolve(2), 200)),
        () => new Promise<number>(resolve => setTimeout(() => resolve(3), 300))
      ];

      const promise = parallel(tasks);
      await vi.advanceTimersByTimeAsync(300);
      const results = await promise;

      expect(results).toEqual([1, 2, 3]);
    });

    it('应该处理空数组', async () => {
      const results = await parallel([]);
      expect(results).toEqual([]);
    });

    it('应该处理任务失败', async () => {
      const tasks = [
        () => Promise.resolve(1),
        () => Promise.reject('error'),
        () => Promise.resolve(3)
      ];

      await expect(parallel(tasks)).rejects.toBe('error');
    });
  });

  describe('mixed - 混合模式', () => {
    it('应该按并发数量执行任务', async () => {
      const tasks = [
        () => new Promise<number>(resolve => setTimeout(() => resolve(1), 100)),
        () => new Promise<number>(resolve => setTimeout(() => resolve(2), 200)),
        () => new Promise<number>(resolve => setTimeout(() => resolve(3), 300)),
        () => new Promise<number>(resolve => setTimeout(() => resolve(4), 100))
      ];

      const promise = mixed(tasks, 2);
      await vi.advanceTimersByTimeAsync(500);
      const results = await promise;

      expect(results).toEqual([1, 2, 3, 4]);
    });

    it('应该处理空数组', async () => {
      const results = await mixed([], 2);
      expect(results).toEqual([]);
    });

    it('应该处理并发数量大于任务数量', async () => {
      const tasks = [
        () => Promise.resolve(1),
        () => Promise.resolve(2)
      ];

      const results = await mixed(tasks, 10);
      expect(results).toEqual([1, 2]);
    });
  });
});
