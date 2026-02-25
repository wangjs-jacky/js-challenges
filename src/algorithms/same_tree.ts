/**
 * 实现判断相同二叉树（Same Tree）
 *
 * 要求：
 * - 使用递归方法
 * - 时间复杂度：O(n)
 * - 空间复杂度：O(h)
 * - 理解树的比较
 */

import { TreeNode } from './types';

/**
 * 判断两棵二叉树是否相同
 * 两棵树被认为是相同的，当且仅当它们结构相同且对应节点值相同
 *
 * @param p 第一棵二叉树的根节点
 * @param q 第二棵二叉树的根节点
 * @returns 是否相同
 *
 * @example
 * // 树1:     1         树2:     1
 * //        / \               / \
 * //       2   3             2   3
 * const p = new TreeNode(1, new TreeNode(2), new TreeNode(3));
 * const q = new TreeNode(1, new TreeNode(2), new TreeNode(3));
 * isSameTree(p, q); // true
 */
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // TODO: 实现判断相同二叉树
  throw new Error('Not implemented');
}

/**
 * 迭代版本：判断两棵二叉树是否相同
 * @param p 第一棵二叉树的根节点
 * @param q 第二棵二叉树的根节点
 * @returns 是否相同
 */
export function isSameTreeIterative(p: TreeNode | null, q: TreeNode | null): boolean {
  // TODO: 可选：实现迭代版本的相同二叉树判断
  throw new Error('Not implemented');
}

/**
 * 判断是否为镜像二叉树（可选实现）
 * @param p 第一棵二叉树的根节点
 * @param q 第二棵二叉树的根节点
 * @returns 是否为镜像
 */
export function isMirrorTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // TODO: 可选：实现镜像二叉树判断
  throw new Error('Not implemented');
}

/**
 * 判断是否为对称二叉树（可选实现）
 * @param root 二叉树根节点
 * @returns 是否对称
 */
export function isSymmetric(root: TreeNode | null): boolean {
  // TODO: 可选：实现对称二叉树判断
  throw new Error('Not implemented');
}
