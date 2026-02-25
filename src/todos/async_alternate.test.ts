import { describe, it, expect } from 'vitest';
import { alternateTasks } from './async_alternate';

/**
 * 交替执行多个异步任务 测试用例
 *
 * 测试重点：
 * 1. 多个异步任务按顺序交替执行
 * 2. 每个任务执行完成后才执行下一个
 * 3. 支持指定每个任务执行的次数（rounds）
 * 4. 返回所有任务的结果，顺序与执行顺序一致
 * 5. 空任务数组、rounds 为 0 等边界情况
 * 6. 任务执行失败时的错误处理
 */

describe('alternateTasks', () => {
  it('应该按顺序交替执行两个任务，rounds=1 时各执行一次', async () => {
    const taskA = () =>
      new Promise<string>(resolve => setTimeout(() => resolve('A'), 50));
    const taskB = () =>
      new Promise<string>(resolve => setTimeout(() => resolve('B'), 50));

    const results = await alternateTasks([taskA, taskB], 1);

    expect(results).toEqual(['A', 'B']);
  });

  it('应该按顺序交替执行两个任务，rounds=3 时得到 A,B,A,B,A,B', async () => {
    const taskA = () =>
      new Promise<string>(resolve => setTimeout(() => resolve('A'), 30));
    const taskB = () =>
      new Promise<string>(resolve => setTimeout(() => resolve('B'), 30));

    const results = await alternateTasks([taskA, taskB], 3);

    expect(results).toEqual(['A', 'B', 'A', 'B', 'A', 'B']);
  });

  it('应该保证每个任务完成后再执行下一个（顺序严格）', async () => {
    const order: string[] = [];
    const taskA = () =>
      new Promise<string>(resolve =>
        setTimeout(() => {
          order.push('A-done');
          resolve('A');
        }, 50)
      );
    const taskB = () =>
      new Promise<string>(resolve =>
        setTimeout(() => {
          order.push('B-done');
          resolve('B');
        }, 30)
      );

    await alternateTasks([taskA, taskB], 2);

    // 执行顺序应为 A -> B -> A -> B
    expect(order).toEqual(['A-done', 'B-done', 'A-done', 'B-done']);
  });

  it('应该支持三个及以上任务交替执行', async () => {
    const taskA = () => Promise.resolve('A');
    const taskB = () => Promise.resolve('B');
    const taskC = () => Promise.resolve('C');

    const results = await alternateTasks([taskA, taskB, taskC], 2);

    expect(results).toEqual(['A', 'B', 'C', 'A', 'B', 'C']);
  });

  it('应该支持单个任务重复执行', async () => {
    const task = () => Promise.resolve('X');
    const results = await alternateTasks([task], 3);

    expect(results).toEqual(['X', 'X', 'X']);
  });

  it('rounds 默认为 1 时，每个任务各执行一次', async () => {
    const taskA = () => Promise.resolve(1);
    const taskB = () => Promise.resolve(2);

    const results = await alternateTasks([taskA, taskB]);

    expect(results).toEqual([1, 2]);
  });

  it('rounds 为 0 时应返回空数组', async () => {
    const taskA = () => Promise.resolve('A');
    const taskB = () => Promise.resolve('B');

    const results = await alternateTasks([taskA, taskB], 0);

    expect(results).toEqual([]);
  });

  it('任务数组为空时应返回空数组', async () => {
    const results = await alternateTasks([], 3);

    expect(results).toEqual([]);
  });

  it('当某个任务 reject 时应整体 reject', async () => {
    const taskA = () => Promise.resolve('A');
    const taskB = () => Promise.reject(new Error('B failed'));

    await expect(alternateTasks([taskA, taskB], 2)).rejects.toThrow('B failed');
  });

  it('当第一个任务就失败时应立即 reject', async () => {
    const taskA = () => Promise.reject(new Error('A failed'));
    const taskB = () => Promise.resolve('B');

    await expect(alternateTasks([taskA, taskB], 1)).rejects.toThrow('A failed');
  });

  it('应该支持任务返回不同类型的结果', async () => {
    const taskNum = () => Promise.resolve(42);
    const taskStr = () => Promise.resolve('hello');
    const taskObj = () => Promise.resolve({ id: 1 });

    const results = await alternateTasks([taskNum, taskStr, taskObj], 1);

    expect(results).toEqual([42, 'hello', { id: 1 }]);
  });
});
