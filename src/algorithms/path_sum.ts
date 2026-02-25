/**
 * 实现路径总和（Path Sum）
 *
 * 要求：
 * - 判断是否存在根到叶子的路径，使路径和等于目标值
 * - 目标值递减传递
 * - 叶子节点判断（左右子树都为空）
 * - 时间复杂度：O(n)
 * - 空间复杂度：O(h)
 */

import { TreeNode } from './types';

/**
 * 判断是否存在路径和等于目标值
 * 路径必须是根节点到叶子节点的完整路径
 *
 * @param root 二叉树根节点
 * @param targetSum 目标和
 * @returns 是否存在满足条件的路径
 *
 * @example
 * //       5
 * //      / \
 * //     4   8
 * //    /   / \
 * //   11  13  4
 * //  /  \      \
 * // 7    2      1
 * const root = new TreeNode(5,
 *   new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
 *   new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1)))
 * );
 * hasPathSum(root, 22); // true (5 -> 4 -> 11 -> 2)
 */
export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  // TODO: 实现判断是否存在路径和等于目标值
  throw new Error('Not implemented');
}

/**
 * 返回所有路径和等于目标值的路径
 * @param root 二叉树根节点
 * @param targetSum 目标和
 * @returns 所有满足条件的路径
 */
export function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  // TODO: 实现返回所有满足条件的路径
  throw new Error('Not implemented');
}

/**
 * 返回所有从根到叶子的路径（可选实现）
 * @param root 二叉树根节点
 * @param targetSum 可选的目标和，如果提供则只返回满足条件的路径
 * @returns 所有路径
 */
export function findAllPaths(root: TreeNode | null, targetSum?: number): number[][] {
  // TODO: 可选：实现返回所有路径
  throw new Error('Not implemented');
}

/**
 * 返回路径和等于目标值的路径数量（可选实现）
 * 路径不必须从根开始或在叶子结束，但必须向下（只包含父子节点）
 * @param root 二叉树根节点
 * @param targetSum 目标和
 * @returns 路径数量
 */
export function pathSumCount(root: TreeNode | null, targetSum: number): number {
  // TODO: 可选：实现路径和计数（LeetCode 437）
  throw new Error('Not implemented');
}
