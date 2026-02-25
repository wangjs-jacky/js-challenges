import { describe, it, expect } from 'vitest';
import { binarySearch, searchRotated, findFirst, searchInsert, findMin } from './binary_search';

/**
 * 二分查找测试用例
 *
 * 测试重点：
 * 1. 基础版：在有序数组中查找目标值
 * 2. 进阶版：在旋转有序数组中查找目标值
 * 3. 查找第一个/最后一个目标值
 * 4. 查找插入位置
 * 5. 查找旋转数组的最小值
 * 6. 边界情况处理
 */

describe('二分查找（Binary Search）', () => {
  describe('基础版 binarySearch', () => {
    it('应该找到存在的目标值', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 5)).toBe(2);
      expect(binarySearch([1, 3, 5, 7, 9], 1)).toBe(0);
      expect(binarySearch([1, 3, 5, 7, 9], 9)).toBe(4);
    });

    it('应该在未找到目标值时返回 -1', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 6)).toBe(-1);
      expect(binarySearch([1, 3, 5, 7, 9], 0)).toBe(-1);
      expect(binarySearch([1, 3, 5, 7, 9], 10)).toBe(-1);
    });

    it('应该处理单元素数组', () => {
      expect(binarySearch([5], 5)).toBe(0);
      expect(binarySearch([5], 1)).toBe(-1);
    });

    it('应该处理空数组', () => {
      expect(binarySearch([], 1)).toBe(-1);
    });

    it('应该处理偶数长度数组', () => {
      expect(binarySearch([1, 3, 5, 7], 1)).toBe(0);
      expect(binarySearch([1, 3, 5, 7], 5)).toBe(2);
      expect(binarySearch([1, 3, 5, 7], 7)).toBe(3);
      expect(binarySearch([1, 3, 5, 7], 4)).toBe(-1);
    });
  });

  describe('进阶版 searchRotated（旋转数组）', () => {
    it('应该在旋转数组中找到目标值', () => {
      expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
      expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 4)).toBe(0);
      expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 2)).toBe(6);
    });

    it('应该在旋转数组中未找到时返回 -1', () => {
      expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
      expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 8)).toBe(-1);
    });

    it('应该处理单元素旋转数组', () => {
      expect(searchRotated([1], 0)).toBe(-1);
      expect(searchRotated([1], 1)).toBe(0);
    });

    it('应该处理未旋转的数组', () => {
      expect(searchRotated([1, 2, 3, 4, 5], 3)).toBe(2);
      expect(searchRotated([1, 2, 3, 4, 5], 6)).toBe(-1);
    });

    it('应该处理有两个元素的旋转数组', () => {
      expect(searchRotated([3, 1], 1)).toBe(1);
      expect(searchRotated([3, 1], 3)).toBe(0);
      expect(searchRotated([3, 1], 2)).toBe(-1);
    });
  });

  describe('查找第一个目标值 findFirst', () => {
    it('应该找到第一个等于目标值的位置', () => {
      expect(findFirst([1, 2, 2, 2, 3], 2)).toBe(1);
      expect(findFirst([1, 2, 2, 2, 3], 1)).toBe(0);
      expect(findFirst([1, 2, 2, 2, 3], 3)).toBe(4);
    });

    it('应该在未找到时返回 -1', () => {
      expect(findFirst([1, 2, 2, 2, 3], 4)).toBe(-1);
      expect(findFirst([], 1)).toBe(-1);
    });

    it('应该处理所有元素都相同的情况', () => {
      expect(findFirst([2, 2, 2, 2], 2)).toBe(0);
    });
  });

  describe('查找插入位置 searchInsert', () => {
    it('应该返回目标值已存在的位置', () => {
      expect(searchInsert([1, 3, 5, 6], 5)).toBe(2);
      expect(searchInsert([1, 3, 5, 6], 1)).toBe(0);
    });

    it('应该返回目标值应该插入的位置', () => {
      expect(searchInsert([1, 3, 5, 6], 2)).toBe(1);
      expect(searchInsert([1, 3, 5, 6], 7)).toBe(4);
      expect(searchInsert([1, 3, 5, 6], 0)).toBe(0);
    });

    it('应该处理空数组', () => {
      expect(searchInsert([], 5)).toBe(0);
    });
  });

  describe('查找旋转数组最小值 findMin', () => {
    it('应该找到旋转数组的最小值', () => {
      expect(findMin([3, 4, 5, 1, 2])).toBe(1);
      expect(findMin([4, 5, 6, 7, 0, 1, 2])).toBe(0);
      expect(findMin([11, 13, 15, 17])).toBe(11);
    });

    it('应该处理单元素数组', () => {
      expect(findMin([2])).toBe(2);
    });

    it('应该处理两个元素', () => {
      expect(findMin([2, 1])).toBe(1);
      expect(findMin([1, 2])).toBe(1);
    });
  });

  describe('边界情况', () => {
    it('应该处理大数组', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i * 2);
      expect(binarySearch(largeArray, 500)).toBe(250);
      expect(binarySearch(largeArray, 1001)).toBe(-1);
    });

    it('应该处理负数', () => {
      expect(binarySearch([-5, -3, -1, 0, 1, 3, 5], -3)).toBe(1);
      expect(binarySearch([-5, -3, -1, 0, 1, 3, 5], 0)).toBe(3);
    });
  });
});
