import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AsyncStream } from './async_stream_output';

/**
 * 异步数据流顺序输出测试用例
 *
 * 测试重点：
 * 1. 按照「添加顺序」（入队顺序）依次输出，不是按 Promise 完成先后
 * 2. 即使后添加的 Promise 先 resolve，也要等先添加的完成后再按序输出
 * 3. 使用队列机制保证顺序
 * 4. 处理多个异步数据流
 */

describe('AsyncStream', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该按添加顺序输出（不是按 Promise 完成先后）', async () => {
    const stream = new AsyncStream();
    const results: number[] = [];

    // 添加顺序：先 1，再 2，再 3；但完成顺序是 2(100ms) -> 3(200ms) -> 1(300ms)
    const promises = [
      new Promise<number>(resolve => setTimeout(() => resolve(1), 300)),
      new Promise<number>(resolve => setTimeout(() => resolve(2), 100)),
      new Promise<number>(resolve => setTimeout(() => resolve(3), 200))
    ];

    promises.forEach((promise) => {
      stream.add(promise, (result) => results.push(result));
    });

    await vi.advanceTimersByTimeAsync(300);

    // 按「添加顺序」输出，所以是 1, 2, 3（不是按完成顺序的 2, 3, 1）
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该等待前面的数据完成后再输出后面的数据', async () => {
    const stream = new AsyncStream();
    const results: number[] = [];
    
    const promises = [
      new Promise<number>(resolve => setTimeout(() => resolve(1), 500)),
      new Promise<number>(resolve => setTimeout(() => resolve(2), 100)),
      new Promise<number>(resolve => setTimeout(() => resolve(3), 200))
    ];

    promises.forEach((promise, index) => {
      stream.add(promise, (result) => {
        results.push(result);
      });
    });

    // 等待第二个和第三个完成，但第一个还没完成
    await vi.advanceTimersByTimeAsync(200);
    expect(results).toEqual([]);

    // 等待第一个完成
    await vi.advanceTimersByTimeAsync(300);
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该处理快速完成的Promise', async () => {
    const stream = new AsyncStream();
    const results: number[] = [];
    
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ];

    promises.forEach((promise, index) => {
      stream.add(promise, (result) => {
        results.push(result);
      });
    });

    await vi.runAllTimersAsync();
    
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该处理Promise失败的情况', async () => {
    const stream = new AsyncStream();
    const results: (number | string)[] = [];
    const errors: string[] = [];
    
    const promises = [
      Promise.resolve(1),
      Promise.reject('error'),
      Promise.resolve(3)
    ];

    promises.forEach((promise, index) => {
      stream.add(promise, 
        (result) => {
          results.push(result);
        },
        (error) => {
          errors.push(error);
        }
      );
    });

    await vi.runAllTimersAsync();
    
    expect(results).toEqual([1, 3]);
    expect(errors).toEqual(['error']);
  });

  it('应该处理动态添加的数据流', async () => {
    const stream = new AsyncStream();
    const results: number[] = [];
    
    stream.add(
      new Promise<number>(resolve => setTimeout(() => resolve(1), 100)),
      (result) => results.push(result)
    );

    await vi.advanceTimersByTimeAsync(50);
    
    stream.add(
      new Promise<number>(resolve => setTimeout(() => resolve(2), 50)),
      (result) => results.push(result)
    );

    await vi.advanceTimersByTimeAsync(100);
    
    expect(results).toEqual([1, 2]);
  });

  it('应该处理大量数据流', async () => {
    const stream = new AsyncStream();
    const results: number[] = [];
    
    const promises = Array.from({ length: 100 }, (_, i) => 
      new Promise<number>(resolve => 
        setTimeout(() => resolve(i + 1), Math.random() * 100)
      )
    );

    promises.forEach((promise) => {
      stream.add(promise, (result) => {
        results.push(result);
      });
    });

    await vi.advanceTimersByTimeAsync(200);
    
    expect(results.length).toBe(100);
    expect(results[0]).toBe(1);
    expect(results[99]).toBe(100);
  });

  it('应该处理空数据流', async () => {
    const stream = new AsyncStream();
    const results: number[] = [];
    
    // 不添加任何数据流
    
    await vi.runAllTimersAsync();
    
    expect(results).toEqual([]);
  });
});
