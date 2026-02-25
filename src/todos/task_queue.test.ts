import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TaskQueue } from './task_queue';

/**
 * 任务队列测试用例
 * 
 * 测试重点：
 * 1. 按照时间间隔依次执行任务
 * 2. 支持动态添加任务
 * 3. 时间间隔计算（相对于上一个任务）
 * 4. 任务执行顺序
 */

describe('TaskQueue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该按照时间间隔依次执行任务', async () => {
    const queue = new TaskQueue();
    const results: number[] = [];

    queue.add(1000, () => {
      results.push(1);
    });
    queue.add(3000, () => {
      results.push(2);
    });
    queue.add(4000, () => {
      results.push(3);
    });

    const promise = queue.start();

    // 1秒后执行第一个任务
    await vi.advanceTimersByTimeAsync(1000);
    expect(results).toEqual([1]);

    // 再3秒后执行第二个任务（总时间4秒）
    await vi.advanceTimersByTimeAsync(3000);
    expect(results).toEqual([1, 2]);

    // 再4秒后执行第三个任务（总时间8秒）
    await vi.advanceTimersByTimeAsync(4000);
    expect(results).toEqual([1, 2, 3]);

    await promise;
  });

  it('应该支持动态添加任务', async () => {
    const queue = new TaskQueue();
    const results: number[] = [];

    // 第一个任务：在执行时动态添加第三个任务
    queue.add(1000, () => {
      results.push(1);
      // 在任务执行期间动态添加新任务
      queue.add(1500, () => {
        results.push(3);
      });
    });

    // 第二个任务
    queue.add(2000, () => {
      results.push(2);
    });

    const promise = queue.start();

    // 1秒后执行第一个任务，同时动态添加第三个任务
    await vi.advanceTimersByTimeAsync(1000);
    expect(results).toEqual([1]);

    // 再2秒后执行第二个任务（总时间3秒）
    await vi.advanceTimersByTimeAsync(2000);
    expect(results).toEqual([1, 2]);

    // 再1.5秒后执行动态添加的第三个任务（总时间4.5秒）
    await vi.advanceTimersByTimeAsync(1500);
    expect(results).toEqual([1, 2, 3]);

    await promise;
  });

  it('应该处理空队列', async () => {
    const queue = new TaskQueue();
    const promise = queue.start();
    await expect(promise).resolves.toBeUndefined();
  });

  it('应该支持异步任务回调', async () => {
    const queue = new TaskQueue();
    const results: number[] = [];

    queue.add(1000, async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      results.push(1);
    });

    const promise = queue.start();

    await vi.advanceTimersByTimeAsync(1100);
    expect(results).toEqual([1]);

    await promise;
  });

  it('应该正确处理多个任务的执行顺序', async () => {
    const queue = new TaskQueue();
    const results: number[] = [];

    queue.add(100, () => results.push(1));
    queue.add(200, () => results.push(2));
    queue.add(300, () => results.push(3));

    const promise = queue.start();

    // 100ms 后执行第一个
    await vi.advanceTimersByTimeAsync(100);
    expect(results).toEqual([1]);

    // 再200ms 后执行第二个（总时间300ms）
    await vi.advanceTimersByTimeAsync(200);
    expect(results).toEqual([1, 2]);

    // 再300ms 后执行第三个（总时间600ms）
    await vi.advanceTimersByTimeAsync(300);
    expect(results).toEqual([1, 2, 3]);

    await promise;
  });
});
