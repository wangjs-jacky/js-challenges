import { describe, it, expect } from 'vitest';
import { TreeNode } from './types';
import { invertTree, invertTreeIterative } from './invert_binary_tree';

/**
 * 翻转二叉树测试用例
 *
 * 测试重点：
 * 1. 左右子树交换
 * 2. 递归返回值
 * 3. 时间复杂度：O(n)
 * 4. 空间复杂度：O(h)
 */

describe('翻转二叉树（Invert Binary Tree）', () => {
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

  const treeToArray = (root: TreeNode | null): (number | null)[] => {
    if (!root) return [];

    const result: (number | null)[] = [];
    const queue: (TreeNode | null)[] = [root];

    while (queue.length) {
      const node = queue.shift();
      if (node) {
        result.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
      } else {
        result.push(null);
      }
    }

    // 移除末尾的 null
    while (result.length > 0 && result[result.length - 1] === null) {
      result.pop();
    }

    return result;
  };

  describe('递归版本 invertTree', () => {
    it('应该翻转空树', () => {
      expect(invertTree(null)).toBe(null);
    });

    it('应该翻转单节点树', () => {
      const root = new TreeNode(1);
      const inverted = invertTree(root);
      expect(inverted.val).toBe(1);
      expect(inverted.left).toBe(null);
      expect(inverted.right).toBe(null);
    });

    it('应该翻转只有左子树的树', () => {
      //     1
      //    /
      //   2
      const root = new TreeNode(1);
      root.left = new TreeNode(2);

      const inverted = invertTree(root);
      //     1
      //      \
      //       2
      expect(inverted.left).toBe(null);
      expect(inverted.right?.val).toBe(2);
    });

    it('应该翻转只有右子树的树', () => {
      //   1
      //    \
      //     2
      const root = new TreeNode(1);
      root.right = new TreeNode(2);

      const inverted = invertTree(root);
      //   1
      //  /
      // 2
      expect(inverted.left?.val).toBe(2);
      expect(inverted.right).toBe(null);
    });

    it('应该翻转完整的二叉树', () => {
      //     4
      //    / \
      //   2   7
      //  / \ / \
      // 1  3 6  9
      const root = new TreeNode(4);
      root.left = new TreeNode(2);
      root.right = new TreeNode(7);
      root.left.left = new TreeNode(1);
      root.left.right = new TreeNode(3);
      root.right.left = new TreeNode(6);
      root.right.right = new TreeNode(9);

      const inverted = invertTree(root);
      //     4
      //    / \
      //   7   2
      //  / \ / \
      // 9  6 3  1

      expect(inverted.val).toBe(4);
      expect(inverted.left?.val).toBe(7);
      expect(inverted.right?.val).toBe(2);
      expect(inverted.left?.left?.val).toBe(9);
      expect(inverted.left?.right?.val).toBe(6);
      expect(inverted.right?.left?.val).toBe(3);
      expect(inverted.right?.right?.val).toBe(1);
    });

    it('应该翻转不对称的二叉树', () => {
      //     1
      //    / \
      //   2   3
      //    \
      //     4
      const root = new TreeNode(1);
      root.left = new TreeNode(2);
      root.right = new TreeNode(3);
      root.left.right = new TreeNode(4);

      const inverted = invertTree(root);
      //     1
      //    / \
      //   3   2
      //  /
      // 4

      expect(inverted.val).toBe(1);
      expect(inverted.left?.val).toBe(3);
      expect(inverted.right?.val).toBe(2);
      expect(inverted.left?.left?.val).toBe(4);
      expect(inverted.right?.right).toBe(null);
    });
  });

  describe('迭代版本 invertTreeIterative', () => {
    it('应该翻转完整的二叉树', () => {
      //     4
      //    / \
      //   2   7
      //  / \ / \
      // 1  3 6  9
      const root = arrayToTree([4, 2, 7, 1, 3, 6, 9]);
      const inverted = invertTreeIterative(root);
      const result = treeToArray(inverted);

      expect(result).toEqual([4, 7, 2, 9, 6, 3, 1]);
    });

    it('应该翻转空树', () => {
      expect(invertTreeIterative(null)).toBe(null);
    });

    it('应该翻转单节点树', () => {
      const root = new TreeNode(1);
      const inverted = invertTreeIterative(root);
      expect(inverted.val).toBe(1);
    });
  });

  describe('两种实现的一致性', () => {
    it('递归和迭代应该产生相同结果', () => {
      const input = [4, 2, 7, 1, 3, 6, 9];
      const root1 = arrayToTree(input);
      const root2 = arrayToTree(input);

      const recursiveResult = treeToArray(invertTree(root1));
      const iterativeResult = treeToArray(invertTreeIterative(root2));

      expect(recursiveResult).toEqual(iterativeResult);
      expect(recursiveResult).toEqual([4, 7, 2, 9, 6, 3, 1]);
    });
  });
});
