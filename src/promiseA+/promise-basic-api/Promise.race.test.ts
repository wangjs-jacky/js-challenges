import { describe, it, expect } from 'vitest';
import { myPromiseRace } from './Promise.race';

/**
 * Promise.race 测试用例
 * 
 * 测试重点：
 * 1. 返回第一个完成的 Promise（无论成功或失败）
 * 2. 空数组情况（永远 pending）
 * 3. thenable 对象处理
 * 4. 非 Promise 值处理
 * 5. 竞态条件理解
 */

describe('Promise.race', () => {
  it('应该返回第一个完成的 Promise（成功）', async () => {
    const p1 = new Promise(resolve => setTimeout(() => resolve(1), 100));
    const p2 = new Promise(resolve => setTimeout(() => resolve(2), 50));
    
    const result = await myPromiseRace([p1, p2]);
    
    expect(result).toBe(2);
  });

  it('应该返回第一个完成的 Promise（失败）', async () => {
    // 注意：对于立即 settled 的 Promise，race 会按照数组顺序处理
    // 所以 reject 需要放在前面才能测试失败场景
    const p1 = Promise.reject('error');
    const p2 = Promise.resolve(1);
    
    await expect(myPromiseRace([p1, p2])).rejects.toBe('error');
  });

  it('应该处理包含非 Promise 值的情况', async () => {
    const p1 = 1;
    const p2 = Promise.resolve(2);
    
    const result = await myPromiseRace([p1, p2]);
    
    expect(result).toBe(1);
  });

  it('应该处理 thenable 对象', async () => {
    const thenable = {
      then: (resolve: (value: number) => void) => {
        setTimeout(() => resolve(1), 10);
      }
    };
    
    const p1 = new Promise(resolve => setTimeout(() => resolve(2), 100));
    
    const result = await myPromiseRace([thenable, p1]);
    
    expect(result).toBe(1);
  });

  it('应该处理 thenable 对象失败的情况', async () => {
    const thenable = {
      then: (resolve: unknown, reject: (reason: string) => void) => {
        setTimeout(() => reject('thenable error'), 10);
      }
    };
    
    const p1 = new Promise(resolve => setTimeout(() => resolve(1), 100));
    
    await expect(myPromiseRace([thenable, p1])).rejects.toBe('thenable error');
  });

  it('应该处理 null 和 undefined 值', async () => {
    const result = await myPromiseRace([null, Promise.resolve(1)]);
    
    expect(result).toBe(null);
  });

  it('应该处理混合类型的值（Promise、非Promise、thenable）', async () => {
    const thenable = {
      then: (resolve: (value: number) => void) => {
        setTimeout(() => resolve(2), 50);
      }
    };
    
    const p1 = Promise.resolve(3);
    const nonPromise = 1;
    
    const result = await myPromiseRace([nonPromise, thenable, p1]);
    
    expect(result).toBe(1);
  });

  it('应该处理可迭代对象（不仅仅是数组）', async () => {
    const set = new Set([
      new Promise(resolve => setTimeout(() => resolve(1), 100)),
      new Promise(resolve => setTimeout(() => resolve(2), 50))
    ]);
    
    const result = await myPromiseRace(set);
    
    expect(result).toBe(2);
  });

  it('应该处理多个 Promise，返回最快完成的', async () => {
    const p1 = new Promise(resolve => setTimeout(() => resolve(1), 300));
    const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
    const p3 = new Promise(resolve => setTimeout(() => resolve(3), 200));
    
    const result = await myPromiseRace([p1, p2, p3]);
    
    expect(result).toBe(2);
  });

  it('应该处理第一个失败的情况优先于后续成功', async () => {
    const p1 = new Promise(resolve => setTimeout(() => resolve(1), 50));
    const p2 = Promise.reject('error');
    const p3 = new Promise(resolve => setTimeout(() => resolve(3), 100));
    
    await expect(myPromiseRace([p1, p2, p3])).rejects.toBe('error');
  });
});
