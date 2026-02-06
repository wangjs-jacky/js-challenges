import { describe, it, expect, vi } from 'vitest';
import './Promise.finally';

/**
 * Promise.prototype.finally 测试用例
 *
 * 测试重点：
 * 1. fulfilled 时执行 finally 回调
 * 2. rejected 时执行 finally 回调
 * 3. 值传递：finally 的返回值被忽略
 * 4. reason 传递：rejected 的原因正确传递
 * 5. finally 返回 Promise 时等待其完成
 * 6. finally 抛出错误时，以该错误 rejected
 * 7. finally 的错误覆盖原错误
 */

describe('Promise.prototype.finally', () => {
  describe('fulfilled 时执行', () => {
    it('应该在 Promise fulfilled 时执行 finally 回调', async () => {
      const callback = vi.fn();
      await Promise.resolve('success').finally(callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('应该正确传递值到后续 then', async () => {
      const result = await Promise.resolve('success')
        .finally(() => {
          // cleanup
        })
        .then(value => value);
      expect(result).toBe('success');
    });

    it('应该忽略 finally 的返回值', async () => {
      const result = await Promise.resolve('value')
        .finally(() => {
          return 'ignored';
        })
        .then(value => value);
      expect(result).toBe('value');
    });

    it('应该支持多个 finally 链式调用', async () => {
      const order: number[] = [];
      await Promise.resolve('value')
        .finally(() => order.push(1))
        .finally(() => order.push(2))
        .finally(() => order.push(3));
      expect(order).toEqual([1, 2, 3]);
    });
  });

  describe('rejected 时执行', () => {
    it('应该在 Promise rejected 时执行 finally 回调', async () => {
      const callback = vi.fn();
      const error = new Error('error');
      await Promise.reject(error).finally(callback).catch(() => {});
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('应该正确传递 rejection reason', async () => {
      const error = 'error';
      await expect(
        Promise.reject(error)
          .finally(() => {
            // cleanup
          })
          .catch(err => err)
      ).resolves.toBe(error);
    });

    it('应该忽略 finally 的返回值（rejected 情况）', async () => {
      const error = 'reason';
      await expect(
        Promise.reject(error)
          .finally(() => {
            return 'ignored';
          })
          .catch(err => err)
      ).resolves.toBe(error);
    });
  });

  describe('finally 返回 Promise', () => {
    it('应该等待 finally 返回的 Promise 完成（fulfilled 情况）', async () => {
      const order: number[] = [];
      await Promise.resolve('original')
        .finally(() => {
          order.push(1);
          return new Promise(resolve => setTimeout(() => {
            order.push(2);
            resolve('delayed');
          }, 10));
        })
        .then(value => {
          order.push(3);
          expect(value).toBe('original');
        });
      expect(order).toEqual([1, 2, 3]);
    });

    it('应该等待 finally 返回的 Promise 完成（rejected 情况）', async () => {
      const order: number[] = [];
      await Promise.reject('original')
        .finally(() => {
          order.push(1);
          return new Promise(resolve => setTimeout(() => {
            order.push(2);
            resolve('delayed');
          }, 10));
        })
        .catch(err => {
          order.push(3);
          expect(err).toBe('original');
        });
      expect(order).toEqual([1, 2, 3]);
    });

    it('应该处理 finally 返回 rejected Promise（覆盖原状态）', async () => {
      await expect(
        Promise.resolve('original')
          .finally(() => {
            return Promise.reject(new Error('finally rejected'));
          })
      ).rejects.toThrow('finally rejected');
    });

    it('应该处理 finally 返回 rejected Promise（覆盖原 rejected）', async () => {
      await expect(
        Promise.reject(new Error('original error'))
          .finally(() => {
            return Promise.reject(new Error('finally rejected'));
          })
      ).rejects.toThrow('finally rejected');
    });
  });

  describe('finally 抛出错误', () => {
    it('应该在 finally 抛出错误时 reject（覆盖 fulfilled）', async () => {
      await expect(
        Promise.resolve('value')
          .finally(() => {
            throw new Error('finally error');
          })
      ).rejects.toThrow('finally error');
    });

    it('应该在 finally 抛出错误时 reject（覆盖 rejected）', async () => {
      await expect(
        Promise.reject(new Error('original error'))
          .finally(() => {
            throw new Error('finally error');
          })
      ).rejects.toThrow('finally error');
    });
  });

  describe('finally 回调参数', () => {
    it('不应该向 finally 回调传递任何参数（fulfilled）', async () => {
      const callback = vi.fn();
      await Promise.resolve('value').finally(callback);
      expect(callback).toHaveBeenCalledWith();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('不应该向 finally 回调传递任何参数（rejected）', async () => {
      const callback = vi.fn();
      await Promise.reject('error').finally(callback).catch(() => {});
      expect(callback).toHaveBeenCalledWith();
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('实际应用场景', () => {
    it('应该支持资源清理场景', async () => {
      let resourceOpen = false;
      let cleaned = false;

      const openResource = () => {
        resourceOpen = true;
        return { data: 'resource data' };
      };

      const closeResource = () => {
        cleaned = true;
        resourceOpen = false;
      };

      await Promise.resolve(openResource())
        .then(resource => {
          expect(resource.data).toBe('resource data');
          expect(resourceOpen).toBe(true);
        })
        .finally(() => {
          closeResource();
        });

      expect(cleaned).toBe(true);
      expect(resourceOpen).toBe(false);
    });

    it('应该支持加载状态清理', async () => {
      let loading = false;
      const setLoading = (state: boolean) => {
        loading = state;
      };

      await Promise.resolve()
        .then(() => {
          setLoading(true);
          // 模拟异步操作
          return new Promise(resolve => setTimeout(resolve, 10));
        })
        .finally(() => {
          setLoading(false);
        });

      expect(loading).toBe(false);
    });

    it('应该支持错误恢复后继续清理', async () => {
      let cleaned = false;

      await expect(
        Promise.reject(new Error('operation failed'))
          .finally(() => {
            cleaned = true;
          })
      ).rejects.toThrow('operation failed');

      expect(cleaned).toBe(true);
    });
  });

  describe('边界情况', () => {
    it('应该处理非函数的 finally 参数（类型转换）', async () => {
      // finally 的参数如果不是函数，会被忽略
      const result = await Promise.resolve('value')
        .finally(undefined as any)
        .then(value => value);
      expect(result).toBe('value');
    });

    it('应该处理同步 finally 回调', async () => {
      const order: number[] = [];
      await Promise.resolve('value')
        .finally(() => {
          order.push(1);
        })
        .then(value => {
          order.push(2);
          expect(value).toBe('value');
        });
      expect(order).toEqual([1, 2]);
    });

    it('应该处理空 finally 回调', async () => {
      const result = await Promise.resolve('value')
        .finally()
        .then(value => value);
      expect(result).toBe('value');
    });
  });
});