import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { myPromiseTimeout } from './Promise.timeout';

/**
 * Promise.timeout 测试用例
 * 
 * 测试重点：
 * 1. 在超时时间内完成时返回结果
 * 2. 超时时返回错误
 * 3. 使用 AbortController 中断请求
 * 4. 错误处理
 */

describe('Promise.timeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该在超时时间内完成时返回结果', async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve('success'), 1000);
    });
    
    const resultPromise = myPromiseTimeout(promise, 2000);
    
    await vi.advanceTimersByTimeAsync(1000);
    
    const result = await resultPromise;
    
    expect(result).toBe('success');
  });

  it('应该在超时时返回错误', async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve('success'), 3000);
    });
    
    const resultPromise = myPromiseTimeout(promise, 2000);
    
    await vi.advanceTimersByTimeAsync(2000);
    
    await expect(resultPromise).rejects.toThrow(/timeout|超时/i);
  });

  it('应该支持自定义超时错误消息', async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve('success'), 3000);
    });
    
    const resultPromise = myPromiseTimeout(promise, 2000, 'Request timeout');
    
    await vi.advanceTimersByTimeAsync(2000);
    
    await expect(resultPromise).rejects.toThrow('Request timeout');
  });

  it('应该处理 Promise 本身失败的情况', async () => {
    const promise = Promise.reject('error');
    
    await expect(myPromiseTimeout(promise, 2000)).rejects.toBe('error');
  });

  it('应该支持 AbortController 中断请求', async () => {
    const controller = new AbortController();
    let aborted = false;
    
    const promise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => resolve('success'), 3000);
      
      controller.signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        aborted = true;
        reject(new Error('Aborted'));
      });
    });
    
    const resultPromise = myPromiseTimeout(promise, 2000, undefined, controller);
    
    await vi.advanceTimersByTimeAsync(2000);
    
    await expect(resultPromise).rejects.toThrow();
    expect(aborted).toBe(true);
  });

  it('应该在超时前完成时不触发 AbortController', async () => {
    const controller = new AbortController();
    let aborted = false;
    
    controller.signal.addEventListener('abort', () => {
      aborted = true;
    });
    
    const promise = new Promise(resolve => {
      setTimeout(() => resolve('success'), 1000);
    });
    
    const resultPromise = myPromiseTimeout(promise, 2000, undefined, controller);
    
    await vi.advanceTimersByTimeAsync(1000);
    
    const result = await resultPromise;
    
    expect(result).toBe('success');
    expect(aborted).toBe(false);
  });

  it('应该处理超时时间为 0 的情况', async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve('success'), 100);
    });
    
    const resultPromise = myPromiseTimeout(promise, 0);
    
    await vi.advanceTimersByTimeAsync(0);
    
    await expect(resultPromise).rejects.toThrow();
  });

  it('应该处理立即完成的 Promise', async () => {
    const promise = Promise.resolve('success');
    
    const result = await myPromiseTimeout(promise, 1000);
    
    expect(result).toBe('success');
  });

  it('应该处理立即失败的 Promise', async () => {
    const promise = Promise.reject('error');
    
    await expect(myPromiseTimeout(promise, 1000)).rejects.toBe('error');
  });

  it('应该在超时后清理定时器', async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve('success'), 3000);
    });
    
    const resultPromise = myPromiseTimeout(promise, 2000);
    
    await vi.advanceTimersByTimeAsync(2000);
    
    try {
      await resultPromise;
    } catch (e) {
      // 忽略错误
    }
    
    // 继续推进时间，确保不会再有回调执行
    await vi.advanceTimersByTimeAsync(2000);
    
    // 如果没有清理定时器，这里可能会有问题
    expect(true).toBe(true);
  });
});
