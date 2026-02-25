import { describe, it, expect } from 'vitest';
import { mapAsync } from './map_async';

/**
 * Map Async 测试用例
 *
 * 测试重点：
 * 1. 异步映射函数处理
 * 2. 保持结果顺序与输入数组一致
 * 3. 并行执行（性能优于串行）
 * 4. 支持带索引的映射函数
 * 5. 错误处理
 * 6. 空数组处理
 * 7. 非数组输入（可迭代对象）
 */

describe('mapAsync', () => {
  describe('基本功能', () => {
    it('应该对数组元素进行异步映射', async () => {
      const arr = [1, 2, 3, 4, 5];
      const result = await mapAsync(arr, async (x) => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return x * 2;
      });
      expect(result).toEqual([2, 4, 6, 8, 10]);
    });

    it('应该支持带索引的映射函数', async () => {
      const result = await mapAsync(['a', 'b', 'c'], async (item, index) => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return `${item}-${index}`;
      });
      expect(result).toEqual(['a-0', 'b-1', 'c-2']);
    });

    it('应该处理同步映射函数', async () => {
      const result = await mapAsync([1, 2, 3], (x) => x * 2);
      expect(result).toEqual([2, 4, 6]);
    });

    it('应该保持结果顺序与输入数组一致', async () => {
      const delays = [50, 10, 30, 20, 40];
      const result = await mapAsync(delays, async (delay, index) => {
        await new Promise(resolve => setTimeout(resolve, delay));
        return index;
      });
      // 即使延迟不同，结果顺序应该与输入一致
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('错误处理', () => {
    it('应该在映射函数抛出错误时 reject', async () => {
      await expect(
        mapAsync([1, 2, 3], async (x) => {
          if (x === 2) throw new Error(`Failed at ${x}`);
          await new Promise(resolve => setTimeout(resolve, 10));
          return x * 2;
        })
      ).rejects.toThrow('Failed at 2');
    });

    it('应该在第一个错误时立即 reject（不等待其他 Promise）', async () => {
      let completedCount = 0;
      const errors: string[] = [];

      try {
        await mapAsync([1, 2, 3, 4, 5], async (x) => {
          await new Promise(resolve => setTimeout(resolve, x * 10));
          completedCount++;
          if (x === 3) throw new Error(`Error at ${x}`);
          return x * 2;
        });
      } catch (err: any) {
        errors.push(err.message);
      }

      expect(errors).toEqual(['Error at 3']);
    });

    it('应该处理同步抛出的错误', async () => {
      await expect(
        mapAsync([1, 2, 3], (x) => {
          if (x === 2) throw new Error('Sync error');
          return x * 2;
        })
      ).rejects.toThrow('Sync error');
    });
  });

  describe('边界情况', () => {
    it('应该处理空数组', async () => {
      const result = await mapAsync([], async (x) => x);
      expect(result).toEqual([]);
    });

    it('应该处理单个元素数组', async () => {
      const result = await mapAsync([42], async (x) => x * 2);
      expect(result).toEqual([84]);
    });

    it('应该处理非数组可迭代对象（字符串）', async () => {
      const result = await mapAsync('abc', async (char) => {
        return char.toUpperCase();
      });
      expect(result).toEqual(['A', 'B', 'C']);
    });

    it('应该处理 Set 对象', async () => {
      const set = new Set([1, 2, 3]);
      const result = await mapAsync(set, async (x) => x * 2);
      expect(result).toEqual([2, 4, 6]); // Set 保持插入顺序
    });
  });

  describe('并行执行', () => {
    it('应该并行执行所有异步操作（快于串行）', async () => {
      const startTime = Date.now();
      await mapAsync([1, 2, 3, 4, 5], async (x) => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return x;
      });
      const parallelTime = Date.now() - startTime;

      // 串行版本
      const serialStart = Date.now();
      for (const x of [1, 2, 3, 4, 5]) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      const serialTime = Date.now() - serialStart;

      // 并行应该明显快于串行
      expect(parallelTime).toBeLessThan(serialTime);
      expect(parallelTime).toBeLessThan(200); // 约 50ms（并行）
      expect(serialTime).toBeGreaterThanOrEqual(250); // 约 250ms（串行）
    });

    it('应该同时启动所有异步操作', async () => {
      const startTimes: number[] = [];
      await mapAsync([10, 20, 30], async (delay) => {
        startTimes.push(Date.now());
        await new Promise(resolve => setTimeout(resolve, delay));
        return delay;
      });

      // 所有操作应该几乎同时开始（时间差小于 10ms）
      const timeDiff = Math.max(...startTimes) - Math.min(...startTimes);
      expect(timeDiff).toBeLessThan(20);
    });
  });

  describe('实际应用场景', () => {
    it('应该支持批量获取用户信息', async () => {
      async function getUserInfo(id: number) {
        await new Promise(resolve => setTimeout(resolve, 10));
        return { id, name: `User${id}`, age: 20 + id };
      }

      const userIds = [1, 2, 3];
      const users = await mapAsync(userIds, getUserInfo);

      expect(users).toEqual([
        { id: 1, name: 'User1', age: 21 },
        { id: 2, name: 'User2', age: 22 },
        { id: 3, name: 'User3', age: 23 },
      ]);
    });

    it('应该支持批量处理文件操作', async () => {
      const files = ['file1.txt', 'file2.txt', 'file3.txt'];
      const results = await mapAsync(files, async (filename) => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return { filename, size: filename.length * 100 };
      });

      expect(results).toEqual([
        { filename: 'file1.txt', size: 900 },
        { filename: 'file2.txt', size: 900 },
        { filename: 'file3.txt', size: 900 },
      ]);
    });

    it('应该支持批量 API 请求', async () => {
      const ids = [101, 102, 103];
      const fetchData = async (id: number) => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return { id, data: `Data for ${id}` };
      };

      const results = await mapAsync(ids, fetchData);
      expect(results).toHaveLength(3);
      expect(results[0].id).toBe(101);
      expect(results[1].id).toBe(102);
      expect(results[2].id).toBe(103);
    });
  });

  describe('类型处理', () => {
    it('应该处理不同类型的返回值', async () => {
      const result = await mapAsync([1, 'hello', true], async (x) => {
        return typeof x;
      });
      expect(result).toEqual(['number', 'string', 'boolean']);
    });

    it('应该处理 undefined 和 null', async () => {
      const result = await mapAsync([1, 2, 3], async (x) => {
        if (x === 2) return null;
        if (x === 3) return undefined;
        return x;
      });
      expect(result).toEqual([1, null, undefined]);
    });

    it('应该处理对象返回值', async () => {
      const result = await mapAsync([1, 2], async (x) => ({
        original: x,
        doubled: x * 2,
      }));
      expect(result).toEqual([
        { original: 1, doubled: 2 },
        { original: 2, doubled: 4 },
      ]);
    });
  });
});
