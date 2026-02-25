import { describe, it, expect } from 'vitest';
import { TreeNode } from './types';
import { isSameTree } from './same_tree';

/**
 * 判断相同二叉树测试用例
 *
 * 测试重点：
 * 1. 双重递归
 * 2. 多条件判断
 * 3. 边界处理
 * 4. 时间复杂度：O(n)
 */

describe('判断相同二叉树（Same Tree）', () => {
  const createTree = (val: number, left?: TreeNode | null, right?: TreeNode | null): TreeNode => {
    return new TreeNode(val, left, right);
  };

  describe('基本测试', () => {
    it('应该判断两个空树为相同', () => {
      expect(isSameTree(null, null)).toBe(true);
    });

    it('应该判断一个空树一个非空树为不同', () => {
      const tree = createTree(1);
      expect(isSameTree(null, tree)).toBe(false);
      expect(isSameTree(tree, null)).toBe(false);
    });

    it('应该判断两个单节点相同树为相同', () => {
      const tree1 = createTree(1);
      const tree2 = createTree(1);
      expect(isSameTree(tree1, tree2)).toBe(true);
    });

    it('应该判断两个单节点不同树为不同', () => {
      const tree1 = createTree(1);
      const tree2 = createTree(2);
      expect(isSameTree(tree1, tree2)).toBe(false);
    });
  });

  describe('完整二叉树测试', () => {
    it('应该判断两个相同的完整二叉树', () => {
      // 树1:     1         树2:     1
      //        / \               / \
      //       2   3             2   3
      const tree1 = createTree(1,
        createTree(2),
        createTree(3)
      );
      const tree2 = createTree(1,
        createTree(2),
        createTree(3)
      );
      expect(isSameTree(tree1, tree2)).toBe(true);
    });

    it('应该判断两个值不同的完整二叉树', () => {
      // 树1:     1         树2:     1
      //        / \               / \
      //       2   3             2   4
      const tree1 = createTree(1,
        createTree(2),
        createTree(3)
      );
      const tree2 = createTree(1,
        createTree(2),
        createTree(4)
      );
      expect(isSameTree(tree1, tree2)).toBe(false);
    });

    it('应该判断结构不同的二叉树', () => {
      // 树1:     1         树2:     1
      //        / \                 \
      //       2   3                 2
      const tree1 = createTree(1,
        createTree(2),
        createTree(3)
      );
      const tree2 = createTree(1,
        null,
        createTree(2)
      );
      expect(isSameTree(tree1, tree2)).toBe(false);
    });
  });

  describe('复杂二叉树测试', () => {
    it('应该判断相同的多层二叉树', () => {
      //        1              1
      //       / \            / \
      //      2   3          2   3
      //     / \                / \
      //    4   5              5   4
      const tree1 = createTree(1,
        createTree(2, createTree(4), createTree(5)),
        createTree(3)
      );
      const tree2 = createTree(1,
        createTree(2),
        createTree(3, createTree(5), createTree(4))
      );
      expect(isSameTree(tree1, tree2)).toBe(false);
    });

    it('应该判断只有左子树的树', () => {
      //   1        1
      //  /        /
      // 2        2
      ///
      //3        3
      const tree1 = createTree(1,
        createTree(2,
          createTree(3)
        )
      );
      const tree2 = createTree(1,
        createTree(2,
          createTree(3)
        )
      );
      expect(isSameTree(tree1, tree2)).toBe(true);
    });

    it('应该判断只有右子树的树', () => {
      // 1          1
      //  \          \
      //   2          2
      //    \          \
      //     3          3
      const tree1 = createTree(1,
        null,
        createTree(2,
          null,
          createTree(3)
        )
      );
      const tree2 = createTree(1,
        null,
        createTree(2,
          null,
          createTree(3)
        )
      );
      expect(isSameTree(tree1, tree2)).toBe(true);
    });
  });

  describe('边界情况', () => {
    it('应该处理一个树有子节点一个没有的情况', () => {
      const tree1 = createTree(1, createTree(2));
      const tree2 = createTree(1);
      expect(isSameTree(tree1, tree2)).toBe(false);
    });

    it('应该处理深度不同的树', () => {
      //   1        1
      //  /        /
      // 2        2
      //          /
      //         3
      const tree1 = createTree(1, createTree(2));
      const tree2 = createTree(1,
        createTree(2,
          createTree(3)
        )
      );
      expect(isSameTree(tree1, tree2)).toBe(false);
    });

    it('应该处理左右子节点位置不同的情况', () => {
      //   1        1
      //  /          \
      // 2            2
      const tree1 = createTree(1, createTree(2));
      const tree2 = createTree(1, null, createTree(2));
      expect(isSameTree(tree1, tree2)).toBe(false);
    });
  });
});
