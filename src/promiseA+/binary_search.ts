/**
 * 实现二分查找（Binary Search）
 *
 * 要求：
 * - 在有序数组中查找目标值
 * - 找到返回索引，未找到返回 -1
 * - 时间复杂度 O(log n)
 * - 空间复杂度 O(1)
 */

/**
 * 基础版二分查找
 * @param arr 有序数组
 * @param target 目标值
 * @returns 目标值的索引，未找到返回 -1
 */
export function binarySearch(arr: number[], target: number): number {
  // TODO: 实现基础版二分查找
  throw new Error('Not implemented');
}

/**
 * 进阶版：在旋转有序数组中查找
 * 数组在某个点进行了旋转，如 [4,5,6,7,0,1,2]
 * @param nums 旋转有序数组
 * @param target 目标值
 * @returns 目标值的索引，未找到返回 -1
 */
export function searchRotated(nums: number[], target: number): number {
  // TODO: 在旋转有序数组中实现二分查找
  throw new Error('Not implemented');
}

/**
 * 递归版二分查找
 * @param arr 有序数组
 * @param target 目标值
 * @param left 左边界（可选）
 * @param right 右边界（可选）
 * @returns 目标值的索引，未找到返回 -1
 */
export function binarySearchRecursive(
  arr: number[],
  target: number,
  left?: number,
  right?: number
): number {
  // TODO: 实现递归版二分查找
  throw new Error('Not implemented');
}

/**
 * 查找第一个等于目标值的位置
 * @param arr 有序数组（可能包含重复元素）
 * @param target 目标值
 * @returns 第一个等于目标值的索引，未找到返回 -1
 */
export function findFirst(arr: number[], target: number): number {
  // TODO: 实现查找第一个目标值
  throw new Error('Not implemented');
}

/**
 * 查找插入位置
 * @param arr 有序数组
 * @param target 目标值
 * @returns 目标值应该插入的位置
 */
export function searchInsert(arr: number[], target: number): number {
  // TODO: 实现查找插入位置
  throw new Error('Not implemented');
}

/**
 * 查找旋转数组的最小值
 * @param nums 旋转有序数组
 * @returns 最小值
 */
export function findMin(nums: number[]): number {
  // TODO: 实现查找旋转数组最小值
  throw new Error('Not implemented');
}
