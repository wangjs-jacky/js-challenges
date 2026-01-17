import { describe, it, expect } from 'vitest';
import { myPromiseAllSettled } from './Promise.allSettled';

/**
 * Promise.allSettled 测试用例
 * 
 * 测试重点：
 * 1. 等待所有 Promise 完成（无论成功或失败）
 * 2. 返回包含 status 和 value/reason 的结果数组
 * 3. 不会因为某个 Promise 失败而中断
 * 4. thenable 对象处理
 * 5. 非 Promise 值处理
 * 6. 空数组情况
 * 7. 结果顺序与输入顺序一致
 */

describe('Promise.allSettled', () => {
  it('应该处理所有 Promise 都成功的情况', async () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.resolve(2);
    const p3 = Promise.resolve(3);
    
    const results = await myPromiseAllSettled([p1, p2, p3]);
    
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 },
      { status: 'fulfilled', value: 3 }
    ]);
  });

  it('应该处理混合成功和失败的情况', async () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.reject('error');
    const p3 = Promise.resolve(3);
    
    const results = await myPromiseAllSettled([p1, p2, p3]);
    
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: 'error' },
      { status: 'fulfilled', value: 3 }
    ]);
  });

  it('应该处理所有 Promise 都失败的情况', async () => {
    const p1 = Promise.reject('error1');
    const p2 = Promise.reject('error2');
    const p3 = Promise.reject('error3');
    
    const results = await myPromiseAllSettled([p1, p2, p3]);
    
    expect(results).toEqual([
      { status: 'rejected', reason: 'error1' },
      { status: 'rejected', reason: 'error2' },
      { status: 'rejected', reason: 'error3' }
    ]);
  });

  it('应该处理包含非 Promise 值的情况', async () => {
    const p1 = 1;
    const p2 = Promise.resolve(2);
    const p3 = Promise.reject('err');
    
    const results = await myPromiseAllSettled([p1, p2, p3]);
    
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 },
      { status: 'rejected', reason: 'err' }
    ]);
  });

  it('应该处理空数组的情况', async () => {
    const results = await myPromiseAllSettled([]);
    
    expect(results).toEqual([]);
  });

  it('应该处理 thenable 对象', async () => {
    const thenable1 = {
      then: (resolve: (value: number) => void) => {
        setTimeout(() => resolve(1), 10);
      }
    };
    
    const thenable2 = {
      then: (resolve: (value: number) => void) => {
        setTimeout(() => resolve(2), 20);
      }
    };
    
    const p1 = Promise.resolve(3);
    
    const results = await myPromiseAllSettled([thenable1, thenable2, p1]);
    
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 },
      { status: 'fulfilled', value: 3 }
    ]);
  });

  it('应该处理 thenable 对象失败的情况', async () => {
    const thenable = {
      then: (resolve: unknown, reject: (reason: string) => void) => {
        setTimeout(() => reject('thenable error'), 10);
      }
    };
    
    const p1 = Promise.resolve(1);
    
    const results = await myPromiseAllSettled([p1, thenable]);
    
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: 'thenable error' }
    ]);
  });

  it('应该保持结果顺序与输入顺序一致（即使完成时间不同）', async () => {
    const p1 = new Promise(resolve => setTimeout(() => resolve(1), 300));
    const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
    const p3 = new Promise(resolve => setTimeout(() => resolve(3), 200));
    
    const results = await myPromiseAllSettled([p1, p2, p3]);
    
    // 即使 p2 最先完成，结果顺序应该与输入顺序一致
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 },
      { status: 'fulfilled', value: 3 }
    ]);
  });

  it('应该处理 null 和 undefined 值', async () => {
    const results = await myPromiseAllSettled([null, undefined, Promise.resolve(1)]);
    
    expect(results).toEqual([
      { status: 'fulfilled', value: null },
      { status: 'fulfilled', value: undefined },
      { status: 'fulfilled', value: 1 }
    ]);
  });

  it('应该处理混合类型的值（Promise、非Promise、thenable）', async () => {
    const thenable = {
      then: (resolve: (value: number) => void) => {
        setTimeout(() => resolve(2), 10);
      }
    };
    
    const p1 = Promise.resolve(3);
    const nonPromise = 1;
    
    const results = await myPromiseAllSettled([nonPromise, thenable, p1]);
    
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 },
      { status: 'fulfilled', value: 3 }
    ]);
  });

  it('应该处理可迭代对象（不仅仅是数组）', async () => {
    const set = new Set([
      Promise.resolve(1),
      Promise.reject('error'),
      Promise.resolve(2)
    ]);
    
    const results = await myPromiseAllSettled(set);
    
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: 'error' },
      { status: 'fulfilled', value: 2 }
    ]);
  });

  it('应该等待所有 Promise 完成，即使有失败也不会中断', async () => {
    const p1 = new Promise(resolve => setTimeout(() => resolve(1), 50));
    const p2 = Promise.reject('error');
    const p3 = new Promise(resolve => setTimeout(() => resolve(3), 100));
    
    const results = await myPromiseAllSettled([p1, p2, p3]);
    
    // 应该等待所有 Promise 完成，包括异步的 p1 和 p3
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: 'error' },
      { status: 'fulfilled', value: 3 }
    ]);
  });
});
