import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sleep } from './sleep';

/**
 * sleep 函数测试用例
 * 
 * 测试重点：
 * 1. 延迟指定时间后 resolve
 * 2. 可以用于 async/await 语法
 * 3. 可以用于链式调用
 * 4. 时间精度
 */

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该在指定时间后 resolve', async () => {
    const promise = sleep(1000);
    
    await vi.advanceTimersByTimeAsync(1000);
    
    await expect(promise).resolves.toBeUndefined();
  });

  it('应该支持 async/await 语法', async () => {
    let executed = false;
    
    async function test() {
      await sleep(1000);
      executed = true;
    }
    
    const promise = test();
    await vi.advanceTimersByTimeAsync(1000);
    await promise;
    
    expect(executed).toBe(true);
  });

  it('应该支持链式调用', async () => {
    const results: number[] = [];
    
    const promise = sleep(1000)
      .then(() => {
        results.push(1);
        return sleep(1000);
      })
      .then(() => {
        results.push(2);
      });
    
    await vi.advanceTimersByTimeAsync(2000);
    await promise;
    
    expect(results).toEqual([1, 2]);
  });

  it('应该处理 0 毫秒延迟', async () => {
    const promise = sleep(0);
    await vi.advanceTimersByTimeAsync(0);
    await expect(promise).resolves.toBeUndefined();
  });

  it('应该支持多次调用', async () => {
    const results: number[] = [];
    
    async function test() {
      await sleep(100);
      results.push(1);
      await sleep(200);
      results.push(2);
      await sleep(300);
      results.push(3);
    }
    
    const promise = test();
    await vi.advanceTimersByTimeAsync(600);
    await promise;
    
    expect(results).toEqual([1, 2, 3]);
  });
});
