import { describe, it, expect } from 'vitest';
import { binarySearch, binarySearchRecursive, searchRotated, findFirst, searchInsert, findMin } from './binary_search';

/**
 * 二分查找测试用例
 *
 * 测试重点：
 * 1. 基础二分查找（迭代）
 * 2. 递归版本二分查找
 * 3. 搜索旋转排序数组
 * 4. 查找第一个目标值
 * 5. 查找插入位置
 * 6. 查找旋转数组最小值
 */

describe('binarySearch', () => {
  describe('基础版本（迭代）', () => {
    it('应该找到中间的目标值', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 5)).toBe(2);
    });

    it('应该找到第一个元素', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 1)).toBe(0);
    });

    it('应该找到最后一个元素', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 9)).toBe(4);
    });

    it('未找到目标值时返回 -1', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 6)).toBe(-1);
    });

    it('应该处理空数组', () => {
      expect(binarySearch([], 5)).toBe(-1);
    });

    it('应该处理单元素数组（找到）', () => {
      expect(binarySearch([5], 5)).toBe(0);
    });

    it('应该处理单元素数组（未找到）', () => {
      expect(binarySearch([5], 3)).toBe(-1);
    });

    it('应该处理双元素数组', () => {
      expect(binarySearch([1, 3], 1)).toBe(0);
      expect(binarySearch([1, 3], 3)).toBe(1);
      expect(binarySearch([1, 3], 2)).toBe(-1);
    });

    it('应该处理偶数长度数组', () => {
      expect(binarySearch([1, 2, 3, 4, 5, 6], 3)).toBe(2);
      expect(binarySearch([1, 2, 3, 4, 5, 6], 4)).toBe(3);
    });

    it('应该处理奇数长度数组', () => {
      expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
    });

    it('应该处理负数', () => {
      expect(binarySearch([-5, -3, -1, 0, 2, 4], -3)).toBe(1);
      expect(binarySearch([-5, -3, -1, 0, 2, 4], 0)).toBe(3);
    });

    it('应该查找小于最小值的数', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 0)).toBe(-1);
    });

    it('应该查找大于最大值的数', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 10)).toBe(-1);
    });
  });

  describe('递归版本', () => {
    it('应该找到中间的目标值', () => {
      expect(binarySearchRecursive([1, 3, 5, 7, 9], 5)).toBe(2);
    });

    it('应该找到第一个元素', () => {
      expect(binarySearchRecursive([1, 3, 5, 7, 9], 1)).toBe(0);
    });

    it('应该找到最后一个元素', () => {
      expect(binarySearchRecursive([1, 3, 5, 7, 9], 9)).toBe(4);
    });

    it('未找到目标值时返回 -1', () => {
      expect(binarySearchRecursive([1, 3, 5, 7, 9], 6)).toBe(-1);
    });

    it('应该处理空数组', () => {
      expect(binarySearchRecursive([], 5)).toBe(-1);
    });

    it('应该处理单元素数组', () => {
      expect(binarySearchRecursive([5], 5)).toBe(0);
      expect(binarySearchRecursive([5], 3)).toBe(-1);
    });
  });

  describe('搜索旋转排序数组', () => {
    it('应该在旋转数组中找到目标值（中间位置）', () => {
      expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
    });

    it('应该在旋转数组中找到目标值（左侧）', () => {
      expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 5)).toBe(1);
    });

    it('应该在旋转数组中找到目标值（右侧）', () => {
      expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 1)).toBe(5);
    });

    it('应该在旋转数组中找到第一个元素', () => {
      expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 4)).toBe(0);
    });

    it('应该在旋转数组中找到最后一个元素', () => {
      expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 2)).toBe(6);
    });

    it('未找到目标值时返回 -1', () => {
      expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
    });

    it('应该处理单元素数组（未旋转）', () => {
      expect(searchRotated([1], 0)).toBe(-1);
      expect(searchRotated([1], 1)).toBe(0);
    });

    it('应该处理双元素旋转数组', () => {
      expect(searchRotated([3, 1], 1)).toBe(1);
      expect(searchRotated([3, 1], 3)).toBe(0);
    });

    it('应该处理未旋转的数组（完全有序）', () => {
      expect(searchRotated([1, 2, 3, 4, 5], 3)).toBe(2);
      expect(searchRotated([1, 2, 3, 4, 5], 1)).toBe(0);
    });

    it('应该处理旋转点在中间的数组', () => {
      expect(searchRotated([5, 1, 3], 5)).toBe(0);
      expect(searchRotated([5, 1, 3], 3)).toBe(2);
    });

    it('应该处理有重复元素的旋转数组', () => {
      expect(searchRotated([2, 2, 2, 3, 4, 2], 3)).toBe(3);
    });
  });

  describe('查找第一个目标值', () => {
    it('应该找到第一个出现的索引', () => {
      expect(findFirst([1, 2, 2, 2, 3], 2)).toBe(1);
    });

    it('应该处理只有一个目标值的情况', () => {
      expect(findFirst([1, 2, 3, 4, 5], 3)).toBe(2);
    });

    it('应该处理目标值在开头', () => {
      expect(findFirst([1, 1, 2, 3], 1)).toBe(0);
    });

    it('应该处理目标值在结尾', () => {
      expect(findFirst([1, 2, 3, 3, 3], 3)).toBe(2);
    });

    it('未找到目标值时返回 -1', () => {
      expect(findFirst([1, 2, 3, 4, 5], 6)).toBe(-1);
    });

    it('应该处理所有元素都相同', () => {
      expect(findFirst([2, 2, 2, 2], 2)).toBe(0);
    });
  });

  describe('查找插入位置', () => {
    it('应该返回找到的索引', () => {
      expect(searchInsert([1, 3, 5, 6], 5)).toBe(2);
    });

    it('应该返回正确的插入位置（中间）', () => {
      expect(searchInsert([1, 3, 5, 6], 2)).toBe(1);
    });

    it('应该返回开头插入位置', () => {
      expect(searchInsert([1, 3, 5, 6], 0)).toBe(0);
    });

    it('应该返回结尾插入位置', () => {
      expect(searchInsert([1, 3, 5, 6], 7)).toBe(4);
    });

    it('应该处理空数组', () => {
      expect(searchInsert([], 5)).toBe(0);
    });

    it('应该处理单元素数组', () => {
      expect(searchInsert([1], 0)).toBe(0);
      expect(searchInsert([1], 1)).toBe(0);
      expect(searchInsert([1], 2)).toBe(1);
    });
  });

  describe('查找旋转数组最小值', () => {
    it('应该找到旋转数组的最小值', () => {
      expect(findMin([3, 4, 5, 1, 2])).toBe(1);
    });

    it('应该处理长旋转数组', () => {
      expect(findMin([4, 5, 6, 7, 0, 1, 2])).toBe(0);
    });

    it('应该处理未旋转的数组', () => {
      expect(findMin([1, 2, 3, 4, 5])).toBe(1);
    });

    it('应该处理单元素数组', () => {
      expect(findMin([1])).toBe(1);
    });

    it('应该处理双元素旋转数组', () => {
      expect(findMin([2, 1])).toBe(1);
    });

    it('应该处理旋转点在开头', () => {
      expect(findMin([5, 1, 2, 3, 4])).toBe(1);
    });

    it('应该处理旋转点在结尾', () => {
      expect(findMin([2, 3, 4, 5, 1])).toBe(1);
    });
  });
});
