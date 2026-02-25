/**
 * 实现二叉树最大深度（Maximum Depth of Binary Tree）
 *
 * 要求：
 * - 使用递归和迭代两种方法
 * - 时间复杂度：O(n)
 * - 空间复杂度：递归 O(h)，迭代 O(n)
 * - 理解深度优先搜索
 */

import { TreeNode } from './types';

/**
 * 递归版本：计算二叉树的最大深度
 * @param root 二叉树根节点
 * @returns 最大深度
 *
 * @example
 * //     3
 * //    / \
 * //   9  20
 * //     /  \
 * //    15   7
 * const root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
 * maxDepth(root); // 3
 */
export function maxDepth(root: TreeNode | null): number {
  // TODO: 实现递归版本的二叉树最大深度
  throw new Error('Not implemented');
}

/**
 * BFS 迭代版本：计算二叉树的最大深度
 * 使用层序遍历（广度优先搜索）
 * @param root 二叉树根节点
 * @returns 最大深度
 */
export function maxDepthBFS(root: TreeNode | null): number {
  // TODO: 实现BFS迭代版本的二叉树最大深度
  throw new Error('Not implemented');
}

/**
 * DFS 迭代版本：计算二叉树的最大深度
 * 使用深度优先搜索（栈实现）
 * @param root 二叉树根节点
 * @returns 最大深度
 */
export function maxDepthDFS(root: TreeNode | null): number {
  // TODO: 实现DFS迭代版本的二叉树最大深度
  throw new Error('Not implemented');
}

/**
 * 计算二叉树的最小深度（可选实现）
 * @param root 二叉树根节点
 * @returns 最小深度
 */
export function minDepth(root: TreeNode | null): number {
  // TODO: 可选：实现二叉树最小深度
  throw new Error('Not implemented');
}

/**
 * 判断是否为平衡二叉树（可选实现）
 * @param root 二叉树根节点
 * @returns 是否平衡
 */
export function isBalanced(root: TreeNode | null): boolean {
  // TODO: 可选：实现平衡二叉树判断
  throw new Error('Not implemented');
}
