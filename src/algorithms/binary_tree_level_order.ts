/**
 * 实现二叉树层序遍历（Binary Tree Level Order Traversal）
 *
 * 要求：
 * - BFS 迭代实现
 * - 使用队列
 * - 逐层处理
 * - 时间复杂度：O(n)
 * - 空间复杂度：O(n)
 */

import { TreeNode } from './types';

/**
 * BFS 迭代版本：二叉树层序遍历
 * 返回每一层的节点值数组
 *
 * @param root 二叉树根节点
 * @returns 每层节点值的二维数组
 *
 * @example
 * //     3
 * //    / \
 * //   9  20
 * //     /  \
 * //    15   7
 * const root = new TreeNode(3,
 *   new TreeNode(9),
 *   new TreeNode(20, new TreeNode(15), new TreeNode(7))
 * );
 * levelOrder(root); // [[3], [9, 20], [15, 7]]
 */
export function levelOrder(root: TreeNode | null): number[][] {
  // TODO: 实现 BFS 迭代版本的层序遍历
  throw new Error('Not implemented');
}

/**
 * 递归版本：二叉树层序遍历
 * @param root 二叉树根节点
 * @returns 每层节点值的二维数组
 */
export function levelOrderRecursive(root: TreeNode | null): number[][] {
  // TODO: 可选：实现递归版本的层序遍历
  throw new Error('Not implemented');
}

/**
 * 返回层序遍历的节点（而非节点值）
 * @param root 二叉树根节点
 * @returns 每层节点的二维数组
 */
export function levelOrderNodes(root: TreeNode | null): TreeNode[][] {
  // TODO: 可选：实现返回节点的层序遍历
  throw new Error('Not implemented');
}

/**
 * 锯齿形层序遍历（可选实现）
 * 偶数层从左到右，奇数层从右到左
 * @param root 二叉树根节点
 * @returns 锯齿形层序遍历结果
 */
export function zigzagLevelOrder(root: TreeNode | null): number[][] {
  // TODO: 可选：实现锯齿形层序遍历
  throw new Error('Not implemented');
}
