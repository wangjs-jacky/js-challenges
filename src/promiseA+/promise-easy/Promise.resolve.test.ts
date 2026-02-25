import { describe, it, expect } from 'vitest';
import { promiseResolve } from './Promise.resolve';

/**
 * Promise.resolve 测试用例
 *
 * 测试重点：
 * 1. 普通值包装为 fulfilled Promise
 * 2. 原生 Promise 直接返回
 * 3. thenable 对象处理
 * 4. 嵌套 thenable 递归处理
 */

describe('Promise.resolve', () => {
  describe('普通值处理', () => {
    it('应该将数字包装为 fulfilled Promise', async () => {
      const result = await promiseResolve(42);
      expect(result).toBe(42);
    });

    it('应该将字符串包装为 fulfilled Promise', async () => {
      const result = await promiseResolve('hello');
      expect(result).toBe('hello');
    });

    it('应该将布尔值包装为 fulfilled Promise', async () => {
      const result = await promiseResolve(true);
      expect(result).toBe(true);
    });

    it('应该将 null 包装为 fulfilled Promise', async () => {
      const result = await promiseResolve(null);
      expect(result).toBe(null);
    });

    it('应该将 undefined 包装为 fulfilled Promise', async () => {
      const result = await promiseResolve(undefined);
      expect(result).toBe(undefined);
    });

    it('应该将对象包装为 fulfilled Promise', async () => {
      const obj = { a: 1, b: 2 };
      const result = await promiseResolve(obj);
      expect(result).toEqual(obj);
    });

    it('应该将数组包装为 fulfilled Promise', async () => {
      const arr = [1, 2, 3];
      const result = await promiseResolve(arr);
      expect(result).toEqual(arr);
    });
  });

  describe('原生 Promise 处理', () => {
    it('应该直接返回原生 Promise（同一个引用）', async () => {
      const p = new Promise(resolve => resolve('original'));
      const result = promiseResolve(p);

      expect(result).toBe(p);
      expect(await result).toBe('original');
    });

    it('应该保持 rejected Promise 的状态', async () => {
      const p = Promise.reject(new Error('rejected'));
      const result = promiseResolve(p);

      expect(result).toBe(p);
      await expect(result).rejects.toThrow('rejected');
    });

    it('应该保持 pending Promise 的状态', async () => {
      let resolveFunc: (value: string) => void;
      const p = new Promise<string>(resolve => {
        resolveFunc = resolve;
      });
      const result = promiseResolve(p);

      expect(result).toBe(p);

      // 稍后解决
      resolveFunc!('resolved');
      await expect(result).resolves.toBe('resolved');
    });

    it('应该处理已 fulfilled 的 Promise', async () => {
      const p = Promise.resolve('already resolved');
      const result = promiseResolve(p);

      expect(result).toBe(p);
      expect(await result).toBe('already resolved');
    });
  });

  describe('thenable 对象处理', () => {
    it('应该处理 thenable 对象（fulfilled）', async () => {
      const thenable = {
        then: function(resolve: (value: any) => void) {
          resolve('thenable value');
        },
      };

      const result = await promiseResolve(thenable);
      expect(result).toBe('thenable value');
    });

    it('应该处理 thenable 对象（rejected）', async () => {
      const thenable = {
        then: function(_resolve: any, reject: (reason: any) => void) {
          reject(new Error('thenable rejected'));
        },
      };

      await expect(promiseResolve(thenable)).rejects.toThrow('thenable rejected');
    });

    it('应该处理异步 thenable', async () => {
      const thenable = {
        then: function(resolve: (value: any) => void) {
          setTimeout(() => resolve('async thenable'), 10);
        },
      };

      const result = await promiseResolve(thenable);
      expect(result).toBe('async thenable');
    });

    it('应该处理嵌套 thenable（递归解包）', async () => {
      const nestedThenable = {
        then: function(resolve: (value: any) => void) {
          resolve({
            then: function(resolve2: (value: any) => void) {
              resolve2('nested');
            },
          });
        },
      };

      const result = await promiseResolve(nestedThenable);
      expect(result).toBe('nested');
    });

    it('应该处理多层级嵌套 thenable', async () => {
      const tripleNested = {
        then: function(resolve: (value: any) => void) {
          resolve({
            then: function(resolve2: (value: any) => void) {
              resolve2({
                then: function(resolve3: (value: any) => void) {
                  resolve3('triple');
                },
              });
            },
          });
        },
      };

      const result = await promiseResolve(tripleNested);
      expect(result).toBe('triple');
    });

    it('应该处理 thenable 抛出的错误', async () => {
      const thenable = {
        then: function() {
          throw new Error('then threw error');
        },
      };

      await expect(promiseResolve(thenable)).rejects.toThrow('then threw error');
    });

    it('应该处理 thenable 中 then 不是函数的情况', async () => {
      const notReallyThenable = {
        then: 'not a function',
      };

      // then 不是函数，应该当作普通值处理
      const result = await promiseResolve(notReallyThenable);
      expect(result).toEqual(notReallyThenable);
    });

    it('应该处理带 then 方法的类实例', async () => {
      class CustomThenable {
        private value: string;
        constructor(value: string) {
          this.value = value;
        }
        then(resolve: (value: any) => void) {
          resolve(this.value);
        }
      }

      const instance = new CustomThenable('class instance');
      const result = await promiseResolve(instance);
      expect(result).toBe('class instance');
    });
  });

  describe('边界情况', () => {
    it('应该处理没有 then 方法的对象', async () => {
      const obj = { name: 'test', value: 42 };
      const result = await promiseResolve(obj);
      expect(result).toEqual(obj);
    });

    it('应该处理函数', async () => {
      const fn = () => 'hello';
      const result = await promiseResolve(fn);
      expect(result).toBe(fn);
    });

    it('应该处理 Symbol', async () => {
      const sym = Symbol('test');
      const result = await promiseResolve(sym);
      expect(result).toBe(sym);
    });

    it('应该处理空对象', async () => {
      const empty = {};
      const result = await promiseResolve(empty);
      expect(result).toEqual(empty);
    });

    it('应该处理循环引用对象', async () => {
      const cyclic: any = { a: 1 };
      cyclic.self = cyclic;

      const result = await promiseResolve(cyclic);
      expect(result).toBe(cyclic);
      expect(result.self).toBe(result);
    });
  });

  describe('实际应用场景', () => {
    it('应该用于统一处理普通值和 Promise', async () => {
      async function processValue(value: any) {
        // 统一处理，无论输入是普通值还是 Promise
        const result = await promiseResolve(value);
        return result * 2;
      }

      expect(await processValue(5)).toBe(10);
      expect(await processValue(Promise.resolve(5))).toBe(10);
    });

    it('应该用于标准化 API 返回值', async () => {
      function fetchUserData(userId: number): string | Promise<string> {
        if (userId > 0) {
          return Promise.resolve(`User${userId}`);
        }
        return 'Guest';
      }

      // 无论 fetchUserData 返回什么，都可以统一处理
      const result1 = await promiseResolve(fetchUserData(1));
      expect(result1).toBe('User1');

      const result2 = await promiseResolve(fetchUserData(0));
      expect(result2).toBe('Guest');
    });

    it('应该用于处理第三方库的 thenable', async () => {
      // 模拟其他 Promise 库（如 Bluebird、Q 等）
      class ThirdPartyPromise {
        constructor(private value: any) {}
        then(resolve: (v: any) => void) {
          resolve(this.value);
        }
      }

      const thirdParty = new ThirdPartyPromise('third party value');
      const result = await promiseResolve(thirdParty);
      expect(result).toBe('third party value');
    });
  });
});
