import { describe, it, expect } from 'vitest';
import {
  climbStairs,
  climbStairsMemo,
  climbStairsDP,
  climbStairsDPOptimized,
  climbStairsPath
} from './climbing_stairs';

/**
 * 爬楼梯测试用例
 *
 * 测试重点：
 * 1. 递归转 DP
 * 2. 记忆化搜索
 * 3. 空间优化
 * 4. 斐波那契数列
 */

describe('爬楼梯（Climbing Stairs）', () => {
  describe('climbStairs - 基础递归版本', () => {
    it('应该处理 n=0 的情况', () => {
      expect(climbStairs(0)).toBe(1); // 0种方式
    });

    it('应该处理 n=1 的情况', () => {
      expect(climbStairs(1)).toBe(1); // 1种方式：[1]
    });

    it('应该处理 n=2 的情况', () => {
      expect(climbStairs(2)).toBe(2); // 2种方式：[1+1, 2]
    });

    it('应该处理 n=3 的情况', () => {
      expect(climbStairs(3)).toBe(3); // 3种方式：[1+1+1, 1+2, 2+1]
    });

    it('应该处理 n=4 的情况', () => {
      expect(climbStairs(4)).toBe(5); // 5种方式
    });

    it('应该处理 n=5 的情况', () => {
      expect(climbStairs(5)).toBe(8); // 8种方式
    });

    it('应该处理较大的 n', () => {
      expect(climbStairs(10)).toBe(89);
      expect(climbStairs(15)).toBe(987);
    });

    it('应该遵循斐波那契数列', () => {
      // 斐波那契数列：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
      expect(climbStairs(1)).toBe(1);
      expect(climbStairs(2)).toBe(2);
      expect(climbStairs(3)).toBe(3);
      expect(climbStairs(4)).toBe(5);
      expect(climbStairs(5)).toBe(8);
      expect(climbStairs(6)).toBe(13);
      expect(climbStairs(7)).toBe(21);
    });
  });

  describe('climbStairsMemo - 记忆化版本', () => {
    it('应该与基础递归版本产生相同结果', () => {
      for (let n = 0; n <= 20; n++) {
        const basic = climbStairs(n);
        const memo = climbStairsMemo(n);
        expect(basic).toBe(memo);
      }
    });

    it('应该处理较大的 n 而不会栈溢出', () => {
      expect(climbStairsMemo(50)).toBe(20365011074);
    });

    it('应该处理非常大的 n', () => {
      expect(climbStairsMemo(70)).toBe(308061521170129);
    });
  });

  describe('climbStairsDP - 动态规划版本', () => {
    it('应该与记忆化版本产生相同结果', () => {
      for (let n = 0; n <= 20; n++) {
        const memo = climbStairsMemo(n);
        const dp = climbStairsDP(n);
        expect(memo).toBe(dp);
      }
    });

    it('应该处理较大的 n', () => {
      expect(climbStairsDP(50)).toBe(20365011074);
    });

    it('应该处理非常大的 n', () => {
      expect(climbStairsDP(70)).toBe(308061521170129);
    });
  });

  describe('climbStairsDPOptimized - 空间优化版本', () => {
    it('应该与 DP 版本产生相同结果', () => {
      for (let n = 0; n <= 20; n++) {
        const dp = climbStairsDP(n);
        const optimized = climbStairsDPOptimized(n);
        expect(dp).toBe(optimized);
      }
    });

    it('应该处理较大的 n', () => {
      expect(climbStairsDPOptimized(50)).toBe(20365011074);
    });

    it('应该使用 O(1) 空间复杂度', () => {
      // 这个测试主要验证函数可以正确运行
      // 实际的空间复杂度需要通过代码审查确认
      expect(climbStairsDPOptimized(100)).toBe(573147844013817084101n);
    });
  });

  describe('climbStairsPath - 返回所有爬法', () => {
    it('应该返回 n=0 的所有爬法', () => {
      expect(climbStairsPath(0)).toEqual([]);
    });

    it('应该返回 n=1 的所有爬法', () => {
      expect(climbStairsPath(1)).toEqual([[1]]);
    });

    it('应该返回 n=2 的所有爬法', () => {
      const result = climbStairsPath(2);
      expect(result).toHaveLength(2);
      expect(result).toContainEqual([1, 1]);
      expect(result).toContainEqual([2]);
    });

    it('应该返回 n=3 的所有爬法', () => {
      const result = climbStairsPath(3);
      expect(result).toHaveLength(3);
      expect(result).toContainEqual([1, 1, 1]);
      expect(result).toContainEqual([1, 2]);
      expect(result).toContainEqual([2, 1]);
    });

    it('应该返回 n=4 的所有爬法', () => {
      const result = climbStairsPath(4);
      expect(result).toHaveLength(5);
      expect(result).toContainEqual([1, 1, 1, 1]);
      expect(result).toContainEqual([1, 1, 2]);
      expect(result).toContainEqual([1, 2, 1]);
      expect(result).toContainEqual([2, 1, 1]);
      expect(result).toContainEqual([2, 2]);
    });

    it('每种爬法的和应该等于 n', () => {
      for (let n = 1; n <= 7; n++) {
        const paths = climbStairsPath(n);
        paths.forEach(path => {
          const sum = path.reduce((acc, val) => acc + val, 0);
          expect(sum).toBe(n);
        });
      }
    });

    it('所有爬法的数量应该等于 climbStairs 的结果', () => {
      for (let n = 0; n <= 7; n++) {
        const paths = climbStairsPath(n);
        const count = climbStairs(n);
        expect(paths.length).toBe(count);
      }
    });
  });

  describe('边界情况', () => {
    it('应该处理 n=1 的最小情况', () => {
      expect(climbStairs(1)).toBe(1);
    });

    it('所有实现应该一致', () => {
      const testCases = [0, 1, 2, 3, 5, 10, 20];

      testCases.forEach(n => {
        const basic = climbStairs(n);
        const memo = climbStairsMemo(n);
        const dp = climbStairsDP(n);
        const optimized = climbStairsDPOptimized(n);

        expect(memo).toBe(basic);
        expect(dp).toBe(basic);
        expect(optimized).toBe(basic);
      });
    });
  });

  describe('性能测试', () => {
    it('基础递归版本在 n 较大时会很慢', () => {
      // 基础递归版本在 n>30 时会明显变慢
      // 这里只测试到 25
      const start = Date.now();
      const result = climbStairs(25);
      const duration = Date.now() - start;

      expect(result).toBe(121393);
      expect(duration).toBeGreaterThan(0);
    });

    it('记忆化版本应该很快', () => {
      const start = Date.now();
      const result = climbStairsMemo(100);
      const duration = Date.now() - start;

      expect(result).toBe(573147844013817084101n);
      expect(duration).toBeLessThan(100); // 应该很快
    });

    it('DP 优化版本应该很快', () => {
      const start = Date.now();
      const result = climbStairsDPOptimized(100);
      const duration = Date.now() - start;

      expect(result).toBe(573147844013817084101n);
      expect(duration).toBeLessThan(50); // 应该非常快
    });
  });
});
