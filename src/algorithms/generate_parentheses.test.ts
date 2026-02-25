import { describe, it, expect } from 'vitest';
import { generateParenthesis, generateParenthesisIterative, countValidParentheses } from './generate_parentheses';

/**
 * 生成括号测试用例
 *
 * 测试重点：
 * 1. 回溯算法
 * 2. 剪枝条件
 * 3. 左右括号计数
 * 4. 时间复杂度：O(4^n / sqrt(n))
 */

describe('生成括号（Generate Parentheses）', () => {
  describe('generateParenthesis - 递归版本', () => {
    it('应该生成 n=0 的结果', () => {
      expect(generateParenthesis(0)).toEqual(['']);
    });

    it('应该生成 n=1 的结果', () => {
      const result = generateParenthesis(1);
      expect(result).toEqual(['()']);
      expect(result).toHaveLength(1);
    });

    it('应该生成 n=2 的结果', () => {
      const result = generateParenthesis(2);
      expect(result).toHaveLength(2);
      expect(result).toContain('(())');
      expect(result).toContain('()()');
    });

    it('应该生成 n=3 的结果', () => {
      const result = generateParenthesis(3);
      expect(result).toHaveLength(5);
      expect(result).toContain('((()))');
      expect(result).toContain('(()())');
      expect(result).toContain('(())()');
      expect(result).toContain('()(())');
      expect(result).toContain('()()()');
    });

    it('应该生成 n=4 的结果', () => {
      const result = generateParenthesis(4);
      expect(result).toHaveLength(14);
    });

    it('应该生成 n=5 的结果', () => {
      const result = generateParenthesis(5);
      expect(result).toHaveLength(42);
    });

    it('每个生成的括号组合应该是有效的', () => {
      const isValid = (s: string): boolean => {
        let count = 0;
        for (const char of s) {
          if (char === '(') count++;
          else count--;
          if (count < 0) return false;
        }
        return count === 0;
      };

      for (let n = 1; n <= 5; n++) {
        const result = generateParenthesis(n);
        result.forEach(s => {
          expect(isValid(s)).toBe(true);
          expect(s.length).toBe(2 * n);
        });
      }
    });

    it('生成的括号组合应该互不相同', () => {
      const result = generateParenthesis(4);
      const uniqueResult = new Set(result);
      expect(uniqueResult.size).toBe(result.length);
    });
  });

  describe('generateParenthesisIterative - 迭代版本', () => {
    it('应该生成 n=1 的结果', () => {
      const result = generateParenthesisIterative(1);
      expect(result).toEqual(['()']);
    });

    it('应该生成 n=2 的结果', () => {
      const result = generateParenthesisIterative(2);
      expect(result).toHaveLength(2);
      expect(result).toContain('(())');
      expect(result).toContain('()()');
    });

    it('应该生成 n=3 的结果', () => {
      const result = generateParenthesisIterative(3);
      expect(result).toHaveLength(5);
    });

    it('应该生成 n=4 的结果', () => {
      const result = generateParenthesisIterative(4);
      expect(result).toHaveLength(14);
    });
  });

  describe('countValidParentheses - 卡特兰数', () => {
    it('应该返回正确的括号组合数量', () => {
      // 卡特兰数：C(0)=1, C(1)=1, C(2)=2, C(3)=5, C(4)=14, C(5)=42
      expect(countValidParentheses(0)).toBe(1);
      expect(countValidParentheses(1)).toBe(1);
      expect(countValidParentheses(2)).toBe(2);
      expect(countValidParentheses(3)).toBe(5);
      expect(countValidParentheses(4)).toBe(14);
      expect(countValidParentheses(5)).toBe(42);
    });

    it('应该与实际生成的结果数量一致', () => {
      for (let n = 0; n <= 5; n++) {
        const result = generateParenthesis(n);
        expect(result.length).toBe(countValidParentheses(n));
      }
    });
  });

  describe('两种实现的一致性', () => {
    it('递归和迭代应该产生相同结果', () => {
      for (let n = 1; n <= 4; n++) {
        const recursiveResult = generateParenthesis(n);
        const iterativeResult = generateParenthesisIterative(n);

        expect(recursiveResult.length).toBe(iterativeResult.length);
        recursiveResult.forEach(s => {
          expect(iterativeResult).toContain(s);
        });
      }
    });
  });

  describe('括号有效性验证', () => {
    it('所有结果都应该是有效的括号组合', () => {
      const isValid = (s: string): boolean => {
        let count = 0;
        for (const char of s) {
          if (char === '(') count++;
          else count--;
          if (count < 0) return false;
        }
        return count === 0;
      };

      for (let n = 1; n <= 5; n++) {
        const result = generateParenthesis(n);
        result.forEach(s => {
          expect(isValid(s)).toBe(true);
        });
      }
    });

    it('不应该生成无效的括号组合', () => {
      const result = generateParenthesis(3);

      // 这些是无效的括号组合
      expect(result).not.toContain(')()(');
      expect(result).not.toContain('))(((');
      expect(result).not.toContain(')(()');
    });
  });

  describe('性能测试', () => {
    it('应该能处理较大的 n', () => {
      const n = 6;
      const result = generateParenthesis(n);
      expect(result.length).toBe(132); // 第6个卡特兰数
    });

    it('应该能处理 n=7', () => {
      const n = 7;
      const result = generateParenthesis(n);
      expect(result.length).toBe(429); // 第7个卡特兰数
    });
  });
});
