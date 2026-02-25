import { describe, it, expect } from 'vitest';
import { myPromiseAll } from './Promise.all';

/**
 * Promise.all 测试用例
 * 
 * 测试重点：
 * 1. thenable 对象处理
 * 2. 非 Promise 值处理
 * 3. 空数组情况
 * 4. 所有 Promise 成功的情况
 * 5. 有失败的情况（立即返回第一个失败的错误）
 * 6. 结果顺序与输入顺序一致
 */

describe('Promise.all', () => {
  it('应该处理所有 Promise 都成功的情况', async () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.resolve(2);
    const p3 = Promise.resolve(3);
    
    const results = await myPromiseAll([p1, p2, p3]);
    
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该在有失败时立即返回第一个失败的错误', async () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.reject('error');
    const p3 = Promise.resolve(3);
    
    await expect(myPromiseAll([p1, p2, p3])).rejects.toBe('error');
  });

  it('应该处理包含非 Promise 值的情况', async () => {
    const p1 = 1;
    const p2 = Promise.resolve(2);
    const p3 = 3;
    
    const results = await myPromiseAll([p1, p2, p3]);
    
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该处理空数组的情况', async () => {
    const results = await myPromiseAll([]);
    
    expect(results).toEqual([]);
  });

  it('应该处理 thenable 对象', async () => {
    // thenable 对象：具有 then 方法的对象
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
    
    const results = await myPromiseAll([thenable1, thenable2, p1]);
    
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该保持结果顺序与输入顺序一致（即使完成时间不同）', async () => {
    const p1 = new Promise(resolve => setTimeout(() => resolve(1), 300));
    const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
    const p3 = new Promise(resolve => setTimeout(() => resolve(3), 200));
    
    const results = await myPromiseAll([p1, p2, p3]);
    
    // 即使 p2 最先完成，结果顺序应该与输入顺序一致
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该处理 thenable 对象失败的情况', async () => {
    const thenable = {
      then: (resolve: unknown, reject: (reason: string) => void) => {
        setTimeout(() => reject('thenable error'), 10);
      }
    };
    
    const p1 = Promise.resolve(1);
    
    await expect(myPromiseAll([p1, thenable])).rejects.toBe('thenable error');
  });

  it('应该处理 null 和 undefined 值', async () => {
    const results = await myPromiseAll([null, undefined, Promise.resolve(1)]);
    
    expect(results).toEqual([null, undefined, 1]);
  });

  it('应该处理混合类型的值（Promise、非Promise、thenable）', async () => {
    const thenable = {
      then: (resolve: (value: number) => void) => {
        setTimeout(() => resolve(2), 10);
      }
    };
    
    const p1 = Promise.resolve(3);
    const nonPromise = 1;
    
    const results = await myPromiseAll([nonPromise, thenable, p1]);
    
    expect(results).toEqual([1, 2, 3]);
  });

  it('应该处理多个失败的情况，返回第一个失败的错误', async () => {
    const p1 = Promise.reject('error1');
    const p2 = Promise.reject('error2');
    const p3 = Promise.resolve(3);
    
    await expect(myPromiseAll([p1, p2, p3])).rejects.toBe('error1');
  });

  it('应该处理可迭代对象（不仅仅是数组）', async () => {
    const set = new Set([Promise.resolve(1), Promise.resolve(2)]);
    
    const results = await myPromiseAll(set);
    
    expect(results).toEqual([1, 2]);
  });
});
