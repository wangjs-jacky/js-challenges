/**
 * 实现二分查找
 *
 * 要求：
 * - 在有序数组中查找目标值，找到返回索引，未找到返回 -1
 * - 时间复杂度 O(log n)，空间复杂度 O(1)
 * - 支持递归和迭代两种实现方式
 * - 支持搜索旋转排序数组
 * - 支持查找第一个/最后一个目标值
 * - 支持查找插入位置
 * - 支持查找旋转数组最小值
 */

/**
 * 二分查找（迭代版本）
 * 在有序数组中查找目标值
 * @param arr 有序数组
 * @param target 目标值
 * @returns 目标值的索引，未找到返回 -1
 */
export function binarySearch(arr: number[], target: number): number {
  let l = -1;
  let r = arr.length;
  function isBlue(value, target) {
    return value <= target;
  };

  while (l + 1 !== r) {
    let m = Math.floor((l + r) / 2);
    if (isBlue(arr[m], target)) {
      l = m;
    } else {
      r = m;
    }
  }
  return arr[l] == target ? l : -1;
}

/**
 * 二分查找（递归版本）
 * 在有序数组中查找目标值
 * @param arr 有序数组
 * @param target 目标值
 * @param left 左边界（可选，默认 0）
 * @param right 右边界（可选，默认 arr.length - 1）
 * @returns 目标值的索引，未找到返回 -1
 */
export function binarySearchRecursive(
  arr: number[],
  target: number,
  left?: number,
  right?: number
): number {
  // 初始化默认边界
  const l = left ?? 0;
  const r = right ?? arr.length - 1;

  // 基础情况：搜索范围为空
  if (l > r) {
    return -1;
  }

  // 计算中间点
  const mid = Math.floor((l + r) / 2);

  // 找到目标值
  if (arr[mid] === target) {
    return mid;
  }

  // 递归搜索左半部分或右半部分
  if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, r);
  } else {
    return binarySearchRecursive(arr, target, l, mid - 1);
  }
}

/**
 * 搜索旋转排序数组
 * 在旋转的有序数组中查找目标值
 * @param nums 旋转排序数组
 * @param target 目标值
 * @returns 目标值的索引，未找到返回 -1
 */
export function searchRotated(nums: number[], target: number): number {
  // TODO: 实现在旋转数组中查找
  // 1. 判断哪半部分是有序的
  // 2. 判断 target 是否在有序部分
  // 3. 缩小搜索范围
  throw new Error('Not implemented');
}

/**
 * 查找第一个等于目标值的索引
 * @param arr 有序数组（可能有重复元素）
 * @param target 目标值
 * @returns 第一个目标值的索引，未找到返回 -1
 */
export function findFirst(arr: number[], target: number): number {
  let l = -1;
  let r = arr.length;
  function isBlue(value, target) {
    return value < target;
  };

  while (l + 1 !== r) {
    let m = Math.floor((l + r) / 2);
    if (isBlue(arr[m], target)) {
      l = m;
    } else {
      r = m;
    }
  }
  return arr[l + 1] == target ? l + 1 : -1;
}

/**
 * 查找插入位置
 * 返回目标值应该插入的位置
 * @param arr 有序数组
 * @param target 目标值
 * @returns 应该插入的位置索引
 */
export function searchInsert(arr: number[], target: number): number {
  let l = -1;
  let r = arr.length;
  function isBlue(value, target) {
    return value < target;
  };

  while (l + 1 !== r) {
    let m = Math.floor((l + r) / 2);
    if (isBlue(arr[m], target)) {
      l = m;
    } else {
      r = m;
    }
  }
  return l + 1;
}

/**
 * 查找旋转数组的最小值
 * @param nums 旋转排序数组
 * @returns 最小值
 */
export function findMin(nums: number[]): number {
  // TODO: 实现查找旋转数组最小值
  // 1. 比较 nums[mid] 和 nums[right]
  // 2. nums[mid] > nums[right]，最小值在右半部分
  // 3. 否则最小值在左半部分（包括 mid）
  throw new Error('Not implemented');
}
