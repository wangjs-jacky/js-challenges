import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BandwidthLimiter } from './bandwidth_limit';

/**
 * 带宽限制器测试用例
 * 
 * 测试重点：
 * 1. 限制同时进行的请求数量（如最多10条）
 * 2. 当有请求完成时，自动执行下一个请求
 * 3. 支持动态添加任务
 * 4. 返回所有请求的结果
 * 5. 错误处理
 */

describe('BandwidthLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该限制并发数为指定值', async () => {
    const limiter = new BandwidthLimiter(2);
    const executionOrder: number[] = [];
    
    const tasks = [
      () => new Promise(resolve => {
        executionOrder.push(1);
        setTimeout(() => resolve(1), 100);
      }),
      () => new Promise(resolve => {
        executionOrder.push(2);
        setTimeout(() => resolve(2), 100);
      }),
      () => new Promise(resolve => {
        executionOrder.push(3);
        setTimeout(() => resolve(3), 100);
      })
    ];
    
    const promises = tasks.map(task => limiter.add(task));
    
    // 前两个任务应该立即开始执行
    await vi.advanceTimersByTimeAsync(0);
    expect(executionOrder.length).toBe(2);
    expect(executionOrder).toContain(1);
    expect(executionOrder).toContain(2);
    
    // 等待第一个任务完成
    await vi.advanceTimersByTimeAsync(100);
    // 第三个任务应该开始执行
    expect(executionOrder.length).toBe(3);
    
    await vi.advanceTimersByTimeAsync(100);
    const results = await Promise.all(promises);
    
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该在一个任务完成后自动执行下一个任务', async () => {
    const limiter = new BandwidthLimiter(2);
    const startTimes: number[] = [];
    
    const tasks = [
      () => new Promise(resolve => {
        startTimes.push(Date.now());
        setTimeout(() => resolve(1), 200);
      }),
      () => new Promise(resolve => {
        startTimes.push(Date.now());
        setTimeout(() => resolve(2), 200);
      }),
      () => new Promise(resolve => {
        startTimes.push(Date.now());
        setTimeout(() => resolve(3), 200);
      })
    ];
    
    const promises = tasks.map(task => limiter.add(task));
    
    // 前两个任务应该同时开始
    await vi.advanceTimersByTimeAsync(0);
    expect(startTimes.length).toBe(2);
    
    // 等待第一个任务完成，第三个任务应该开始
    await vi.advanceTimersByTimeAsync(200);
    expect(startTimes.length).toBe(3);
    
    await vi.advanceTimersByTimeAsync(200);
    const results = await Promise.all(promises);
    
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该支持动态添加任务', async () => {
    const limiter = new BandwidthLimiter(2);
    const results: number[] = [];
    
    // 先添加两个任务
    const p1 = limiter.add(() => Promise.resolve(1));
    const p2 = limiter.add(() => Promise.resolve(2));
    
    const r1 = await p1;
    const r2 = await p2;
    results.push(r1, r2);
    
    // 动态添加更多任务
    const p3 = limiter.add(() => Promise.resolve(3));
    const p4 = limiter.add(() => Promise.resolve(4));
    
    const r3 = await p3;
    const r4 = await p4;
    results.push(r3, r4);
    
    expect(results).toEqual([1, 2, 3, 4]);
  });

  it('应该返回所有请求的结果', async () => {
    const limiter = new BandwidthLimiter(2);
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
      () => Promise.resolve(4)
    ];
    
    const promises = tasks.map(task => limiter.add(task));
    const results = await Promise.all(promises);
    
    expect(results).toEqual([1, 2, 3, 4]);
  });

  it('应该处理任务失败的情况', async () => {
    const limiter = new BandwidthLimiter(2);
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.reject('error'),
      () => Promise.resolve(3)
    ];
    
    const promises = tasks.map(task => limiter.add(task));
    
    await expect(Promise.all(promises)).rejects.toBe('error');
  });

  it('应该处理并发数为 1 的情况（串行执行）', async () => {
    const limiter = new BandwidthLimiter(1);
    const executionOrder: number[] = [];
    
    const tasks = [
      () => new Promise(resolve => {
        executionOrder.push(1);
        setTimeout(() => resolve(1), 50);
      }),
      () => new Promise(resolve => {
        executionOrder.push(2);
        setTimeout(() => resolve(2), 50);
      }),
      () => new Promise(resolve => {
        executionOrder.push(3);
        setTimeout(() => resolve(3), 50);
      })
    ];
    
    const promises = tasks.map(task => limiter.add(task));
    
    await vi.advanceTimersByTimeAsync(150);
    const results = await Promise.all(promises);
    
    expect(results).toEqual([1, 2, 3]);
    // 串行执行，顺序应该是 1, 2, 3
    expect(executionOrder).toEqual([1, 2, 3]);
  });

  it('应该处理并发数大于任务数的情况', async () => {
    const limiter = new BandwidthLimiter(10);
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3)
    ];
    
    const promises = tasks.map(task => limiter.add(task));
    const results = await Promise.all(promises);
    
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该处理异步任务函数', async () => {
    const limiter = new BandwidthLimiter(2);
    const tasks = [
      async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return 1;
      },
      async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return 2;
      }
    ];
    
    const promises = tasks.map(task => limiter.add(task));
    await vi.advanceTimersByTimeAsync(100);
    const results = await Promise.all(promises);
    
    expect(results).toEqual([1, 2]);
  });

  it('应该处理大量任务（100个任务，限制10个并发）', async () => {
    const limiter = new BandwidthLimiter(10);
    const tasks = Array.from({ length: 100 }, (_, i) => 
      () => Promise.resolve(i + 1)
    );
    
    const promises = tasks.map(task => limiter.add(task));
    const results = await Promise.all(promises);
    
    expect(results.length).toBe(100);
    expect(results[0]).toBe(1);
    expect(results[99]).toBe(100);
  });

  it('应该处理默认并发限制（10）', async () => {
    const limiter = new BandwidthLimiter();
    const executionOrder: number[] = [];
    
    const tasks = Array.from({ length: 15 }, (_, i) => 
      () => new Promise(resolve => {
        executionOrder.push(i + 1);
        setTimeout(() => resolve(i + 1), 10);
      })
    );
    
    const promises = tasks.map(task => limiter.add(task));
    
    await vi.advanceTimersByTimeAsync(0);
    // 默认限制为10，所以前10个任务应该立即开始
    expect(executionOrder.length).toBe(10);
    
    await vi.advanceTimersByTimeAsync(20);
    const results = await Promise.all(promises);
    
    expect(results.length).toBe(15);
  });
});
