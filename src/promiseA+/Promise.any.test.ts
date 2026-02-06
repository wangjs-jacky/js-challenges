import { describe, it, expect } from 'vitest';
import { promiseAny } from './Promise.any';

/**
 * Promise.any 测试用例
 *
 * 测试重点：
 * 1. 返回首个 fulfilled 的 Promise 值
 * 2. 全部 rejected 时抛出 AggregateError
 * 3. AggregateError 包含所有拒绝原因
 * 4. 空数组立即 reject
 * 5. 非 Promise 值处理
 * 6. thenable 对象处理
 */

describe('Promise.any', () => {
  describe('基本功能', () => {
    it('应该返回首个 fulfilled 的 Promise', async () => {
      const p1 = Promise.reject('error1');
      const p2 = new Promise(resolve => setTimeout(() => resolve('success2'), 50));
      const p3 = new Promise(resolve => setTimeout(() => resolve('success3'), 100));

      const result = await promiseAny([p1, p2, p3]);
      expect(result).toBe('success2');
    });

    it('应该在第一个 Promise 成功时立即返回', async () => {
      const p1 = Promise.resolve('first');
      const p2 = new Promise(resolve => setTimeout(() => resolve('second'), 100));
      const p3 = new Promise(resolve => setTimeout(() => resolve('third'), 200));

      const result = await promiseAny([p1, p2, p3]);
      expect(result).toBe('first');
    });

    it('应该处理非 Promise 值（视为 fulfilled）', async () => {
      const result = await promiseAny([Promise.reject('error'), 'immediate value']);
      expect(result).toBe('immediate value');
    });

    it('应该处理 mixed 类型的数组', async () => {
      const result = await promiseAny([
        Promise.reject('error'),
        42,
        Promise.resolve('later'),
      ]);
      expect(result).toBe(42);
    });
  });

  describe('全部 rejected 处理', () => {
    it('应该在所有 Promise rejected 时抛出 AggregateError', async () => {
      await expect(
        promiseAny([
          Promise.reject('error1'),
          Promise.reject('error2'),
          Promise.reject('error3'),
        ])
      ).rejects.toThrow(AggregateError);
    });

    it('应该在 AggregateError.errors 中包含所有拒绝原因', async () => {
      try {
        await promiseAny([
          Promise.reject('error1'),
          Promise.reject(Error('error2')),
          Promise.reject('error3'),
        ]);
      } catch (err: any) {
        expect(err instanceof AggregateError).toBe(true);
        expect(err.errors).toEqual(['error1', Error('error2'), 'error3']);
      }
    });

    it('应该按顺序收集所有错误', async () => {
      try {
        await promiseAny([
          Promise.reject(Promise.reject('nested1')),
          Promise.reject('error2'),
          Promise.reject('error3'),
        ]);
      } catch (err: any) {
        expect(err.errors).toHaveLength(3);
        expect(err.errors[0]).toBe('nested1'); // Promise.reject 会解包
        expect(err.errors[1]).toBe('error2');
        expect(err.errors[2]).toBe('error3');
      }
    });

    it('应该处理异步拒绝的 Promise', async () => {
      const errors = [
        new Promise((_, reject) => setTimeout(() => reject('async1'), 30)),
        new Promise((_, reject) => setTimeout(() => reject('async2'), 10)),
        new Promise((_, reject) => setTimeout(() => reject('async3'), 20)),
      ];

      try {
        await promiseAny(errors);
      } catch (err: any) {
        expect(err.errors).toEqual(['async1', 'async2', 'async3']);
      }
    });
  });

  describe('边界情况', () => {
    it('应该在空数组时立即 reject AggregateError', async () => {
      await expect(promiseAny([])).rejects.toThrow(AggregateError);
    });

    it('应该在空数组的 AggregateError.errors 中返回空数组', async () => {
      try {
        await promiseAny([]);
      } catch (err: any) {
        expect(err.errors).toEqual([]);
      }
    });

    it('应该处理单个 Promise（成功）', async () => {
      const result = await promiseAny([Promise.resolve('single')]);
      expect(result).toBe('single');
    });

    it('应该处理单个 Promise（失败）', async () => {
      await expect(promiseAny([Promise.reject('single error')])).rejects.toThrow(AggregateError);
    });

    it('应该处理单个非 Promise 值', async () => {
      const result = await promiseAny([42]);
      expect(result).toBe(42);
    });
  });

  describe('thenable 对象处理', () => {
    it('应该处理 thenable 对象（成功）', async () => {
      const thenable = {
        then: (resolve: (value: any) => void) => {
          setTimeout(() => resolve('thenable value'), 10);
        },
      };

      const result = await promiseAny([thenable]);
      expect(result).toBe('thenable value');
    });

    it('应该处理 thenable 对象（失败）', async () => {
      const thenable = {
        then: (_: any, reject: (reason: any) => void) => {
          setTimeout(() => reject('thenable error'), 10);
        },
      };

      await expect(promiseAny([thenable])).rejects.toThrow(AggregateError);
    });

    it('应该混合处理 Promise 和 thenable', async () => {
      const thenable = {
        then: (resolve: (value: any) => void) => resolve('thenable'),
      };

      const result = await promiseAny([
        Promise.reject('error'),
        thenable,
        Promise.resolve('promise'),
      ]);
      expect(result).toBe('thenable');
    });
  });

  describe('实际应用场景', () => {
    it('应该用于从多个源获取数据，取最快的成功响应', async () => {
      // 模拟多个 API 请求
      const api1 = new Promise(resolve =>
        setTimeout(() => resolve({ source: 'api1', data: 'fast' }), 50)
      );
      const api2 = new Promise(resolve =>
        setTimeout(() => resolve({ source: 'api2', data: 'slow' }), 100)
      );
      const api3 = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('api3 failed')), 30)
      );

      const result = await promiseAny([api1, api2, api3]);
      expect(result.source).toBe('api1');
      expect(result.data).toBe('fast');
    });

    it('应该用于备用服务器场景（取第一个成功的）', async () => {
      const primary = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Primary down')), 20)
      );
      const backup1 = new Promise(resolve =>
        setTimeout(() => resolve('Backup1 response'), 50)
      );
      const backup2 = new Promise(resolve =>
        setTimeout(() => resolve('Backup2 response'), 100)
      );

      const result = await promiseAny([primary, backup1, backup2]);
      expect(result).toBe('Backup1 response');
    });
  });

  describe('与 Promise.race 的区别', () => {
    it('应该忽略首个 rejected，等待首个 fulfilled（不同于 race）', async () => {
      const order: string[] = [];

      const p1 = Promise.reject('rejected first').catch(() => {
        order.push('p1 rejected');
      });
      const p2 = new Promise(resolve =>
        setTimeout(() => {
          order.push('p2 resolved');
          resolve('success');
        }, 30)
      );

      const result = await promiseAny([p1, p2]);

      expect(result).toBe('success');
      expect(order).toEqual(['p1 rejected', 'p2 resolved']);
    });
  });
});
