/**
 * 实现翻转二叉树（Invert Binary Tree）
 *
 * 要求：
 * - 左右子树交换
 * - 递归和迭代两种实现
 * - 时间复杂度：O(n)
 * - 空间复杂度：O(h)
 *
 * Homebrew 作者名言：
 * "This is one of the most classic interview questions.
 *  Google: 90% of our engineers use the software you wrote (Homebrew),
 *  but you can't invert a binary tree on a whiteboard so fuck off."
 */

import { TreeNode } from './types';

/**
 * 递归版本：翻转二叉树
 * @param root 二叉树根节点
 * @returns 翻转后的二叉树根节点
 *
 * @example
 * //     4
 * //    / \
 * //   2   7
 * //  / \ / \
 * // 1  3 6  9
 * const root = new TreeNode(4,
 *   new TreeNode(2, new TreeNode(1), new TreeNode(3)),
 *   new TreeNode(7, new TreeNode(6), new TreeNode(9))
 * );
 * const inverted = invertTree(root);
 * //     4
 * //    / \
 * //   7   2
 * //  / \ / \
 * // 9  6 3  1
 */
export function invertTree(root: TreeNode | null): TreeNode | null {
  // TODO: 实现递归版本的翻转二叉树
  throw new Error('Not implemented');
}

/**
 * 迭代版本：翻转二叉树（使用 BFS）
 * @param root 二叉树根节点
 * @returns 翻转后的二叉树根节点
 */
export function invertTreeIterative(root: TreeNode | null): TreeNode | null {
  // TODO: 实现迭代版本的翻转二叉树
  throw new Error('Not implemented');
}

/**
 * 迭代版本：翻转二叉树（使用 DFS 栈）
 * @param root 二叉树根节点
 * @returns 翻转后的二叉树根节点
 */
export function invertTreeDFS(root: TreeNode | null): TreeNode | null {
  // TODO: 可选：使用 DFS 栈实现翻转二叉树
  throw new Error('Not implemented');
}
