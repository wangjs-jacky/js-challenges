import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cancellablePromise, fetchWithCancel } from './promise_abort';

/**
 * Promise 中断请求测试用例
 * 
 * 测试重点：
 * 1. 创建一个可中断的 Promise 包装器
 * 2. 支持手动取消请求
 * 3. 取消后 Promise 应该 reject
 * 4. 可以配合 AbortController 使用
 */

describe('cancellablePromise', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该正常执行未取消的 Promise', async () => {
    const promise = Promise.resolve('success');
    const cancellable = cancellablePromise(promise);

    const result = await cancellable;
    expect(result).toBe('success');
  });

  it('应该支持取消 Promise', async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve('success'), 1000);
    });
    const cancellable = cancellablePromise(promise);

    setTimeout(() => {
      cancellable.cancel('用户取消');
    }, 500);

    await vi.advanceTimersByTimeAsync(500);

    await expect(cancellable).rejects.toThrow('用户取消');
  });

  it('应该在 Promise 完成前取消', async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve('success'), 1000);
    });
    const cancellable = cancellablePromise(promise);

    cancellable.cancel('提前取消');

    await expect(cancellable).rejects.toThrow('提前取消');
  });

  it('应该处理 Promise 失败的情况', async () => {
    const promise = Promise.reject('error');
    const cancellable = cancellablePromise(promise);

    await expect(cancellable).rejects.toBe('error');
  });

  it('应该处理取消已完成的 Promise', async () => {
    const promise = Promise.resolve('success');
    const cancellable = cancellablePromise(promise);

    const result = await cancellable;
    expect(result).toBe('success');

    // 取消已完成的 Promise 应该无效
    cancellable.cancel('太晚了');
    // 不应该抛出错误
  });

  it('应该支持自定义取消原因', async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve('success'), 1000);
    });
    const cancellable = cancellablePromise(promise);

    cancellable.cancel('自定义原因');

    await expect(cancellable).rejects.toThrow('自定义原因');
  });
});

describe('fetchWithCancel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该正常执行 fetch 请求', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: async () => ({ data: 'success' }),
        ok: true
      } as Response)
    );

    const promise = fetchWithCancel('/api/data');
    await vi.runAllTimersAsync();

    const response = await promise;
    const data = await response.json();

    expect(data).toEqual({ data: 'success' });
  });

  it('应该支持取消 fetch 请求', async () => {
    global.fetch = vi.fn(() =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            json: async () => ({ data: 'success' }),
            ok: true
          } as Response);
        }, 1000);
      })
    );

    const promise = fetchWithCancel('/api/data');

    setTimeout(() => {
      promise.cancel();
    }, 500);

    await vi.advanceTimersByTimeAsync(500);

    await expect(promise).rejects.toThrow();
  });

  it('应该使用 AbortController 取消请求', async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    global.fetch = vi.fn((url, options) => {
      expect(options?.signal).toBe(signal);
      return Promise.resolve({
        json: async () => ({ data: 'success' }),
        ok: true
      } as Response);
    });

    const promise = fetchWithCancel('/api/data', { signal });

    abortController.abort();

    await expect(promise).rejects.toThrow();
  });
});
