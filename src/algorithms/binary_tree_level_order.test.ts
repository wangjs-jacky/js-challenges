import { describe, it, expect } from 'vitest';
import { TreeNode } from './types';
import { levelOrder, levelOrderRecursive } from './binary_tree_level_order';

/**
 * 二叉树层序遍历测试用例
 *
 * 测试重点：
 * 1. BFS 迭代实现
 * 2. 队列应用
 * 3. 逐层处理
 * 4. 递归实现（可选）
 */

describe('二叉树层序遍历（Binary Tree Level Order Traversal）', () => {
  const arrayToTree = (arr: (number | null)[]): TreeNode | null => {
    if (!arr.length || arr[0] === null) return null;

    const root = new TreeNode(arr[0]!);
    const queue: (TreeNode | null)[] = [root];
    let i = 1;

    while (queue.length && i < arr.length) {
      const node = queue.shift()!;

      if (i < arr.length && arr[i] !== null) {
        node.left = new TreeNode(arr[i]!);
        queue.push(node.left);
      }
      i++;

      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]!);
        queue.push(node.right);
      }
      i++;
    }

    return root;
  };

  describe('BFS 迭代版本 levelOrder', () => {
    it('应该处理空树', () => {
      expect(levelOrder(null)).toEqual([]);
    });

    it('应该处理单节点树', () => {
      const root = new TreeNode(1);
      expect(levelOrder(root)).toEqual([[1]]);
    });

    it('应该处理只有左子树的树', () => {
      //   1
      //  /
      // 2
      const root = new TreeNode(1);
      root.left = new TreeNode(2);
      expect(levelOrder(root)).toEqual([[1], [2]]);
    });

    it('应该处理只有右子树的树', () => {
      // 1
      //  \
      //   2
      const root = new TreeNode(1);
      root.right = new TreeNode(2);
      expect(levelOrder(root)).toEqual([[1], [2]]);
    });

    it('应该处理完整的二叉树', () => {
      //     3
      //    / \
      //   9  20
      //     /  \
      //    15   7
      const root = arrayToTree([3, 9, 20, null, null, 15, 7]);
      expect(levelOrder(root)).toEqual([[3], [9, 20], [15, 7]]);
    });

    it('应该处理多层二叉树', () => {
      //        1
      //       / \
      //      2   3
      //     / \   \
      //    4   5   6
      //   /
      //  7
      const root = arrayToTree([1, 2, 3, 4, 5, null, 6, 7]);
      expect(levelOrder(root)).toEqual([[1], [2, 3], [4, 5, 6], [7]]);
    });

    it('应该处理不平衡的二叉树', () => {
      //     1
      //    /
      //   2
      //  /
      // 3
      const root = arrayToTree([1, 2, null, 3]);
      expect(levelOrder(root)).toEqual([[1], [2], [3]]);
    });

    it('应该处理完全二叉树', () => {
      //       1
      //      / \
      //     2   3
      //    / \ / \
      //   4  5 6  7
      const root = arrayToTree([1, 2, 3, 4, 5, 6, 7]);
      expect(levelOrder(root)).toEqual([[1], [2, 3], [4, 5, 6, 7]]);
    });

    it('应该处理每层节点数不同的树', () => {
      //        1
      //       / \
      //      2   3
      //     / \   \
      //    4   5   6
      const root = arrayToTree([1, 2, 3, 4, 5, null, 6]);
      expect(levelOrder(root)).toEqual([[1], [2, 3], [4, 5, 6]]);
    });

    it('应该处理只有右子树的倾斜树', () => {
      // 1
      //  \
      //   2
      //    \
      //     3
      const root = arrayToTree([1, null, 2, null, 3]);
      expect(levelOrder(root)).toEqual([[1], [2], [3]]);
    });
  });

  describe('递归版本 levelOrderRecursive', () => {
    it('应该处理空树', () => {
      expect(levelOrderRecursive(null)).toEqual([]);
    });

    it('应该处理单节点树', () => {
      const root = new TreeNode(1);
      expect(levelOrderRecursive(root)).toEqual([[1]]);
    });

    it('应该处理完整的二叉树', () => {
      //     3
      //    / \
      //   9  20
      //     /  \
      //    15   7
      const root = arrayToTree([3, 9, 20, null, null, 15, 7]);
      expect(levelOrderRecursive(root)).toEqual([[3], [9, 20], [15, 7]]);
    });

    it('应该处理多层二叉树', () => {
      //        1
      //       / \
      //      2   3
      //     / \   \
      //    4   5   6
      const root = arrayToTree([1, 2, 3, 4, 5, null, 6]);
      expect(levelOrderRecursive(root)).toEqual([[1], [2, 3], [4, 5, 6]]);
    });
  });

  describe('两种实现的一致性', () => {
    it('BFS 和递归应该产生相同结果', () => {
      const testCases = [
        [3, 9, 20, null, null, 15, 7],
        [1, 2, 3, 4, 5, null, 6],
        [1, 2, 3, null, null, 4, 5],
      ];

      testCases.forEach(arr => {
        const root = arrayToTree(arr);
        const bfsResult = levelOrder(root);
        const recursiveResult = levelOrderRecursive(root);
        expect(bfsResult).toEqual(recursiveResult);
      });
    });
  });
});
