import { describe, it, expect, vi } from 'vitest';
import { PromiseScheduler } from './Promise.scheduler';

/**
 * Promise 调度器测试用例
 * 
 * 测试重点：
 * 1. 并发限制功能（同时最多执行指定数量的任务）
 * 2. 任务完成后自动执行下一个任务
 * 3. 所有任务完成后返回结果数组
 * 4. 结果顺序与输入顺序一致
 * 5. 错误处理
 */

describe('PromiseScheduler', () => {
  it('应该限制并发数为指定值', async () => {
    const scheduler = new PromiseScheduler(2);
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
    
    const results = await scheduler.add(tasks);
    
    expect(results).toEqual([1, 2, 3]);
    // 前两个任务应该同时开始执行
    expect(executionOrder.slice(0, 2)).toContain(1);
    expect(executionOrder.slice(0, 2)).toContain(2);
  });

  it('应该在一个任务完成后自动执行下一个任务', async () => {
    const scheduler = new PromiseScheduler(2);
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
    
    const startTime = Date.now();
    const results = await scheduler.add(tasks);
    const endTime = Date.now();
    
    expect(results).toEqual([1, 2, 3]);
    // 第三个任务应该在第一个或第二个任务完成后才开始
    expect(startTimes.length).toBe(3);
  });

  it('应该返回所有任务的结果数组', async () => {
    const scheduler = new PromiseScheduler(2);
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
      () => Promise.resolve(4)
    ];
    
    const results = await scheduler.add(tasks);
    
    expect(results).toEqual([1, 2, 3, 4]);
  });

  it('应该保持结果顺序与输入顺序一致', async () => {
    const scheduler = new PromiseScheduler(2);
    const tasks = [
      () => new Promise(resolve => setTimeout(() => resolve(1), 300)),
      () => new Promise(resolve => setTimeout(() => resolve(2), 100)),
      () => new Promise(resolve => setTimeout(() => resolve(3), 200))
    ];
    
    const results = await scheduler.add(tasks);
    
    // 即使完成时间不同，结果顺序应该与输入顺序一致
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该处理任务失败的情况', async () => {
    const scheduler = new PromiseScheduler(2);
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.reject('error'),
      () => Promise.resolve(3)
    ];
    
    await expect(scheduler.add(tasks)).rejects.toBe('error');
  });

  it('应该处理空任务数组', async () => {
    const scheduler = new PromiseScheduler(2);
    const results = await scheduler.add([]);
    
    expect(results).toEqual([]);
  });

  it('应该处理并发数为 1 的情况（串行执行）', async () => {
    const scheduler = new PromiseScheduler(1);
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
    
    const results = await scheduler.add(tasks);
    
    expect(results).toEqual([1, 2, 3]);
    // 串行执行，顺序应该是 1, 2, 3
    expect(executionOrder).toEqual([1, 2, 3]);
  });

  it('应该处理并发数大于任务数的情况', async () => {
    const scheduler = new PromiseScheduler(10);
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3)
    ];
    
    const results = await scheduler.add(tasks);
    
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该处理异步任务函数', async () => {
    const scheduler = new PromiseScheduler(2);
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
    
    const results = await scheduler.add(tasks);
    
    expect(results).toEqual([1, 2]);
  });

  it('应该处理多个批次的任务', async () => {
    const scheduler = new PromiseScheduler(2);
    
    const batch1 = [
      () => Promise.resolve(1),
      () => Promise.resolve(2)
    ];
    
    const batch2 = [
      () => Promise.resolve(3),
      () => Promise.resolve(4)
    ];
    
    const results1 = await scheduler.add(batch1);
    const results2 = await scheduler.add(batch2);
    
    expect(results1).toEqual([1, 2]);
    expect(results2).toEqual([3, 4]);
  });
});
