import { describe, it, expect } from 'vitest';
import { permute, permuteUnique, permuteIterative } from './permutations';

/**
 * 数组全排列测试用例
 *
 * 测试重点：
 * 1. 回溯算法
 * 2. 剩余元素递归
 * 3. 路径收集
 * 4. 处理重复元素
 */

describe('数组全排列（Permutations）', () => {
  describe('permute - 基础全排列', () => {
    it('应该生成空数组的全排列', () => {
      expect(permute([])).toEqual([[]]);
    });

    it('应该生成单元素数组的全排列', () => {
      expect(permute([1])).toEqual([[1]]);
    });

    it('应该生成两元素数组的全排列', () => {
      const result = permute([1, 2]);
      expect(result).toHaveLength(2);
      expect(result).toContainEqual([1, 2]);
      expect(result).toContainEqual([2, 1]);
    });

    it('应该生成三元素数组的全排列', () => {
      const result = permute([1, 2, 3]);
      expect(result).toHaveLength(6);
      expect(result).toContainEqual([1, 2, 3]);
      expect(result).toContainEqual([1, 3, 2]);
      expect(result).toContainEqual([2, 1, 3]);
      expect(result).toContainEqual([2, 3, 1]);
      expect(result).toContainEqual([3, 1, 2]);
      expect(result).toContainEqual([3, 2, 1]);
    });

    it('应该生成四元素数组的全排列', () => {
      const result = permute([1, 2, 3, 4]);
      expect(result).toHaveLength(24); // 4! = 24
    });

    it('应该处理包含零的数组', () => {
      const result = permute([0, 1]);
      expect(result).toHaveLength(2);
      expect(result).toContainEqual([0, 1]);
      expect(result).toContainEqual([1, 0]);
    });

    it('应该处理包含负数的数组', () => {
      const result = permute([-1, 0, 1]);
      expect(result).toHaveLength(6);
      expect(result).toContainEqual([-1, 0, 1]);
      expect(result).toContainEqual([-1, 1, 0]);
    });
  });

  describe('permuteUnique - 去重全排列', () => {
    it('应该处理所有元素相同的数组', () => {
      expect(permuteUnique([1, 1, 1])).toEqual([[1, 1, 1]]);
    });

    it('应该处理部分重复的数组', () => {
      const result = permuteUnique([1, 1, 2]);
      expect(result).toHaveLength(3);
      expect(result).toContainEqual([1, 1, 2]);
      expect(result).toContainEqual([1, 2, 1]);
      expect(result).toContainEqual([2, 1, 1]);
    });

    it('应该处理更多重复元素的数组', () => {
      const result = permuteUnique([1, 1, 2, 2]);
      expect(result).toHaveLength(6); // 4! / (2! * 2!) = 6
    });

    it('应该处理无重复元素的数组', () => {
      const result = permuteUnique([1, 2, 3]);
      expect(result).toHaveLength(6);
    });

    it('应该处理包含零的重复数组', () => {
      const result = permuteUnique([0, 0, 1]);
      expect(result).toHaveLength(3);
    });
  });

  describe('permuteIterative - 迭代版本', () => {
    it('应该生成三元素数组的全排列', () => {
      const result = permuteIterative([1, 2, 3]);
      expect(result).toHaveLength(6);
      expect(result).toContainEqual([1, 2, 3]);
      expect(result).toContainEqual([1, 3, 2]);
      expect(result).toContainEqual([2, 1, 3]);
      expect(result).toContainEqual([2, 3, 1]);
      expect(result).toContainEqual([3, 1, 2]);
      expect(result).toContainEqual([3, 2, 1]);
    });

    it('应该生成空数组的全排列', () => {
      expect(permuteIterative([])).toEqual([[]]);
    });

    it('应该生成单元素数组的全排列', () => {
      expect(permuteIterative([1])).toEqual([[1]]);
    });
  });

  describe('算法验证', () => {
    it('基础和迭代版本应该产生相同结果', () => {
      const arrays = [
        [1, 2, 3],
        [1, 2, 3, 4],
        [5, 6, 7]
      ];

      arrays.forEach(arr => {
        const recursiveResult = permute([...arr]);
        const iterativeResult = permuteIterative([...arr]);

        expect(recursiveResult.length).toBe(iterativeResult.length);
        recursiveResult.forEach(perm => {
          expect(iterativeResult).toContainEqual(perm);
        });
      });
    });

    it('全排列的数量应该等于阶乘', () => {
      const factorial = (n: number): number => {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
      };

      for (let i = 1; i <= 5; i++) {
        const arr = Array.from({ length: i }, (_, idx) => idx + 1);
        expect(permute(arr).length).toBe(factorial(i));
      }
    });

    it('每个排列应该包含原数组的所有元素', () => {
      const arr = [1, 2, 3, 4];
      const permutations = permute(arr);

      permutations.forEach(perm => {
        expect(perm.sort()).toEqual(arr.sort());
      });
    });

    it('所有排列应该互不相同', () => {
      const arr = [1, 2, 3];
      const permutations = permute(arr);
      const uniquePermutations = new Set(permutations.map(p => JSON.stringify(p)));

      expect(uniquePermutations.size).toBe(permutations.length);
    });
  });

  describe('边界情况', () => {
    it('应该处理大数组', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = permute(arr);
      expect(result.length).toBe(120); // 5! = 120
    });

    it('应该处理包含字符串的数组', () => {
      const result = permute(['a', 'b', 'c']);
      expect(result).toHaveLength(6);
      expect(result).toContainEqual(['a', 'b', 'c']);
      expect(result).toContainEqual(['c', 'b', 'a']);
    });
  });
});
