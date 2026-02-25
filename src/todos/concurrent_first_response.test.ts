import { describe, it, expect } from 'vitest';
import { raceToSuccess } from './concurrent_first_response';

/**
 * 并发请求返回第一个成功 response 测试用例
 *
 * 测试重点：
 * 1. 同时发送多个请求，返回第一个成功响应的结果
 * 2. 有失败有成功时，忽略失败、返回第一个成功的结果
 * 3. 所有请求都失败时，返回错误
 * 4. 空数组 / 无请求的边界情况
 * 5. thenable 与非 Promise 值（与 Promise.race 的竞态结合）
 */

describe('raceToSuccess', () => {
  it('应该返回第一个成功的响应', async () => {
    const slow = new Promise<number>(resolve => setTimeout(() => resolve(1), 50));
    const fast = new Promise<number>(resolve => setTimeout(() => resolve(2), 10));
    const medium = new Promise<number>(resolve => setTimeout(() => resolve(3), 30));

    const result = await raceToSuccess([slow, fast, medium]);

    expect(result).toBe(2);
  });

  it('第一个失败、第二个成功时应返回第二个的结果', async () => {
    const p1 = Promise.reject(new Error('first failed'));
    const p2 = new Promise<number>(resolve => setTimeout(() => resolve(42), 20));

    const result = await raceToSuccess([p1, p2]);

    expect(result).toBe(42);
  });

  it('前面多个失败、最后一个成功时应返回最后一个的结果', async () => {
    const p1 = Promise.reject(new Error('a'));
    const p2 = Promise.reject(new Error('b'));
    const p3 = new Promise<number>(resolve => setTimeout(() => resolve(100), 10));

    const result = await raceToSuccess([p1, p2, p3]);

    expect(result).toBe(100);
  });

  it('所有请求都失败时应 reject', async () => {
    const p1 = Promise.reject(new Error('e1'));
    const p2 = Promise.reject(new Error('e2'));

    await expect(raceToSuccess([p1, p2])).rejects.toThrow(/所有请求都失败|All promises were rejected/i);
  });

  it('空数组时应 reject 或符合约定', async () => {
    await expect(raceToSuccess([])).rejects.toThrow();
  });

  it('应处理包含非 Promise 值（立即成功）', async () => {
    const p1 = 1;
    const p2 = new Promise<number>(resolve => setTimeout(() => resolve(2), 50));

    const result = await raceToSuccess([p1, p2]);

    expect(result).toBe(1);
  });

  it('应处理 thenable 对象成功', async () => {
    const thenable = {
      then: (resolve: (value: number) => void) => {
        setTimeout(() => resolve(10), 5);
      },
    };
    const p1 = new Promise<number>(resolve => setTimeout(() => resolve(20), 50));

    const result = await raceToSuccess([thenable, p1]);

    expect(result).toBe(10);
  });

  it('应处理 thenable 失败、Promise 成功', async () => {
    const thenable = {
      then: (_: unknown, reject: (reason: Error) => void) => {
        setTimeout(() => reject(new Error('thenable failed')), 5);
      },
    };
    const p1 = new Promise<number>(resolve => setTimeout(() => resolve(99), 20));

    const result = await raceToSuccess([thenable, p1]);

    expect(result).toBe(99);
  });
});
