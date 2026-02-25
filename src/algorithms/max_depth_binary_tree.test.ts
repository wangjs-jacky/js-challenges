import { describe, it, expect } from 'vitest';
import { TreeNode } from './types';
import { maxDepth, maxDepthBFS, maxDepthDFS } from './max_depth_binary_tree';

/**
 * 二叉树最大深度测试用例
 *
 * 测试重点：
 * 1. 使用递归和迭代两种方法
 * 2. 时间复杂度：O(n)
 * 3. 空间复杂度：递归 O(h)，迭代 O(n)
 * 4. 理解深度优先搜索
 */

describe('二叉树最大深度（Maximum Depth of Binary Tree）', () => {
  describe('递归版本 maxDepth', () => {
    it('应该返回空树的深度为 0', () => {
      expect(maxDepth(null)).toBe(0);
    });

    it('应该返回单节点树的深度为 1', () => {
      const root = new TreeNode(1);
      expect(maxDepth(root)).toBe(1);
    });

    it('应该返回只有左子树的深度', () => {
      const root = new TreeNode(1);
      root.left = new TreeNode(2);
      root.left.left = new TreeNode(3);
      expect(maxDepth(root)).toBe(3);
    });

    it('应该返回只有右子树的深度', () => {
      const root = new TreeNode(1);
      root.right = new TreeNode(2);
      root.right.right = new TreeNode(3);
      expect(maxDepth(root)).toBe(3);
    });

    it('应该返回平衡二叉树的深度', () => {
      //     3
      //    / \
      //   9  20
      //     /  \
      //    15   7
      const root = new TreeNode(3);
      root.left = new TreeNode(9);
      root.right = new TreeNode(20);
      root.right.left = new TreeNode(15);
      root.right.right = new TreeNode(7);
      expect(maxDepth(root)).toBe(3);
    });

    it('应该返回完全二叉树的深度', () => {
      //       1
      //      / \
      //     2   3
      //    / \
      //   4   5
      const root = new TreeNode(1);
      root.left = new TreeNode(2);
      root.right = new TreeNode(3);
      root.left.left = new TreeNode(4);
      root.left.right = new TreeNode(5);
      expect(maxDepth(root)).toBe(3);
    });

    it('应该处理较深的树', () => {
      const root = new TreeNode(1);
      root.left = new TreeNode(2);
      root.left.left = new TreeNode(3);
      root.left.left.left = new TreeNode(4);
      root.left.left.left.left = new TreeNode(5);
      expect(maxDepth(root)).toBe(5);
    });
  });

  describe('BFS 迭代版本 maxDepthBFS', () => {
    it('应该返回空树的深度为 0', () => {
      expect(maxDepthBFS(null)).toBe(0);
    });

    it('应该返回平衡二叉树的深度', () => {
      //     3
      //    / \
      //   9  20
      //     /  \
      //    15   7
      const root = new TreeNode(3);
      root.left = new TreeNode(9);
      root.right = new TreeNode(20);
      root.right.left = new TreeNode(15);
      root.right.right = new TreeNode(7);
      expect(maxDepthBFS(root)).toBe(3);
    });

    it('应该返回单节点树的深度为 1', () => {
      const root = new TreeNode(1);
      expect(maxDepthBFS(root)).toBe(1);
    });
  });

  describe('DFS 迭代版本 maxDepthDFS', () => {
    it('应该返回空树的深度为 0', () => {
      expect(maxDepthDFS(null)).toBe(0);
    });

    it('应该返回平衡二叉树的深度', () => {
      //     3
      //    / \
      //   9  20
      //     /  \
      //    15   7
      const root = new TreeNode(3);
      root.left = new TreeNode(9);
      root.right = new TreeNode(20);
      root.right.left = new TreeNode(15);
      root.right.right = new TreeNode(7);
      expect(maxDepthDFS(root)).toBe(3);
    });

    it('应该返回单节点树的深度为 1', () => {
      const root = new TreeNode(1);
      expect(maxDepthDFS(root)).toBe(1);
    });
  });

  describe('三种实现的一致性', () => {
    it('三种方法应该返回相同结果', () => {
      //     1
      //    / \
      //   2   3
      //  / \
      // 4   5
      const root = new TreeNode(1);
      root.left = new TreeNode(2);
      root.right = new TreeNode(3);
      root.left.left = new TreeNode(4);
      root.left.right = new TreeNode(5);

      const recursive = maxDepth(root);
      const bfs = maxDepthBFS(root);
      const dfs = maxDepthDFS(root);

      expect(recursive).toBe(bfs);
      expect(bfs).toBe(dfs);
      expect(recursive).toBe(3);
    });
  });
});
