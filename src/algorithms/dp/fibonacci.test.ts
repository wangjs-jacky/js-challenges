import { describe, it, expect } from 'vitest';
import { fibTopDown, fibBottomUp } from './fibonacci';

/**
 * 斐波那契数列（动态规划）测试用例
 *
 * 测试重点：
 * 1. 自顶向下（递归 + 缓存）与自底向上（迭代）结果一致
 * 2. 边界：n=0, n=1
 * 3. 递推关系：fib(n) = fib(n-1) + fib(n-2)
 * 4. 较大 n 时自顶向下不爆栈（有缓存）
 */

describe('斐波那契数列（DP）', () => {
  describe('fibTopDown - 自顶向下（递归 + 缓存）', () => {
    it('应该正确计算 fib(0) 和 fib(1)', () => {
      expect(fibTopDown(0)).toBe(0);
      expect(fibTopDown(1)).toBe(1);
    });

    it('应该正确计算前若干项', () => {
      expect(fibTopDown(2)).toBe(1);
      expect(fibTopDown(3)).toBe(2);
      expect(fibTopDown(4)).toBe(3);
      expect(fibTopDown(5)).toBe(5);
      expect(fibTopDown(6)).toBe(8);
      expect(fibTopDown(7)).toBe(13);
      expect(fibTopDown(8)).toBe(21);
      expect(fibTopDown(9)).toBe(34);
      expect(fibTopDown(10)).toBe(55);
    });

    it('应该处理较大的 n（有缓存不应栈溢出）', () => {
      expect(fibTopDown(20)).toBe(6765);
      expect(fibTopDown(30)).toBe(832040);
    });
  });

  describe('fibBottomUp - 自底向上（迭代）', () => {
    it('应该正确计算 fib(0) 和 fib(1)', () => {
      expect(fibBottomUp(0)).toBe(0);
      expect(fibBottomUp(1)).toBe(1);
    });

    it('应该正确计算前若干项', () => {
      expect(fibBottomUp(2)).toBe(1);
      expect(fibBottomUp(3)).toBe(2);
      expect(fibBottomUp(4)).toBe(3);
      expect(fibBottomUp(5)).toBe(5);
      expect(fibBottomUp(10)).toBe(55);
    });

    it('应该处理较大的 n', () => {
      expect(fibBottomUp(20)).toBe(6765);
      expect(fibBottomUp(30)).toBe(832040);
    });
  });

  describe('两种实现结果一致', () => {
    it('对 0..25 的 n 应得到相同结果', () => {
      for (let n = 0; n <= 25; n++) {
        expect(fibTopDown(n)).toBe(fibBottomUp(n));
      }
    });

    it('对较大 n 也应一致', () => {
      expect(fibTopDown(40)).toBe(fibBottomUp(40));
    });
  });

  describe('边界情况', () => {
    it('n=0 返回 0', () => {
      expect(fibTopDown(0)).toBe(0);
      expect(fibBottomUp(0)).toBe(0);
    });

    it('n=1 返回 1', () => {
      expect(fibTopDown(1)).toBe(1);
      expect(fibBottomUp(1)).toBe(1);
    });
  });
});
