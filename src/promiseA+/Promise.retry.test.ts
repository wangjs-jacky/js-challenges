import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { myPromiseRetry } from './Promise.retry';

/**
 * Promise.retry 测试用例
 * 
 * 测试重点：
 * 1. 基础重试功能（失败后自动重试）
 * 2. 达到最大重试次数后返回错误
 * 3. 重试延迟时间
 * 4. 指数退避策略
 * 5. 成功时立即返回结果
 */

describe('Promise.retry', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该在第一次成功时立即返回结果', async () => {
    const fn = vi.fn(() => Promise.resolve('success'));
    const result = await myPromiseRetry(fn, 3, 1000);
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('应该在失败后自动重试', async () => {
    let attemptCount = 0;
    const fn = vi.fn(() => {
      attemptCount++;
      if (attemptCount < 2) {
        return Promise.reject('error');
      }
      return Promise.resolve('success');
    });
    
    const promise = myPromiseRetry(fn, 3, 1000);
    
    // 等待重试延迟
    await vi.advanceTimersByTimeAsync(1000);
    
    const result = await promise;
    
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('应该在达到最大重试次数后返回错误', async () => {
    const fn = vi.fn(() => Promise.reject('error'));
    
    const promise = myPromiseRetry(fn, 3, 1000);
    
    // 等待所有重试完成
    await vi.advanceTimersByTimeAsync(3000);
    
    await expect(promise).rejects.toBe('error');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('应该等待指定的延迟时间后重试', async () => {
    let attemptCount = 0;
    const fn = vi.fn(() => {
      attemptCount++;
      if (attemptCount < 2) {
        return Promise.reject('error');
      }
      return Promise.resolve('success');
    });
    
    const startTime = Date.now();
    const promise = myPromiseRetry(fn, 3, 1000);
    
    // 等待重试延迟
    await vi.advanceTimersByTimeAsync(1000);
    
    await promise;
    
    // 验证至少等待了 1000ms
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('应该支持指数退避策略', async () => {
    let attemptCount = 0;
    const fn = vi.fn(() => {
      attemptCount++;
      if (attemptCount < 4) {
        return Promise.reject('error');
      }
      return Promise.resolve('success');
    });
    
    const promise = myPromiseRetry(fn, 3, 1000, true);
    
    // 第1次重试等待 1000ms
    await vi.advanceTimersByTimeAsync(1000);
    expect(fn).toHaveBeenCalledTimes(2);
    
    // 第2次重试等待 2000ms
    await vi.advanceTimersByTimeAsync(2000);
    expect(fn).toHaveBeenCalledTimes(3);
    
    // 第3次重试等待 4000ms
    await vi.advanceTimersByTimeAsync(4000);
    expect(fn).toHaveBeenCalledTimes(4);
    
    const result = await promise;
    expect(result).toBe('success');
  });

  it('应该处理重试次数为 1 的情况（不重试）', async () => {
    const fn = vi.fn(() => Promise.reject('error'));
    
    const promise = myPromiseRetry(fn, 1, 1000);
    
    await expect(promise).rejects.toBe('error');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('应该处理重试次数为 0 的情况（不重试）', async () => {
    const fn = vi.fn(() => Promise.reject('error'));
    
    const promise = myPromiseRetry(fn, 0, 1000);
    
    await expect(promise).rejects.toBe('error');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('应该处理异步函数', async () => {
    let attemptCount = 0;
    const fn = vi.fn(async () => {
      attemptCount++;
      await new Promise(resolve => setTimeout(resolve, 100));
      if (attemptCount < 2) {
        throw new Error('error');
      }
      return 'success';
    });
    
    const promise = myPromiseRetry(fn, 3, 1000);
    
    await vi.advanceTimersByTimeAsync(1100);
    await vi.advanceTimersByTimeAsync(1000);
    
    const result = await promise;
    
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('应该传递错误信息', async () => {
    const error = new Error('custom error');
    const fn = vi.fn(() => Promise.reject(error));
    
    const promise = myPromiseRetry(fn, 2, 1000);
    
    await vi.advanceTimersByTimeAsync(2000);
    
    await expect(promise).rejects.toBe(error);
  });
});
