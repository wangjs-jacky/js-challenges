import { describe, it, expect } from 'vitest';
import { TreeNode } from './types';
import { hasPathSum, pathSum, findAllPaths } from './path_sum';

/**
 * 路径总和测试用例
 *
 * 测试重点：
 * 1. 目标值递减
 * 2. 叶子节点判断
 * 3. 递归参数传递
 * 4. 时间复杂度：O(n)
 */

describe('路径总和（Path Sum）', () => {
  const createTree = (val: number, left?: TreeNode | null, right?: TreeNode | null): TreeNode => {
    return new TreeNode(val, left, right);
  };

  describe('hasPathSum - 判断是否存在路径', () => {
    it('应该处理空树', () => {
      expect(hasPathSum(null, 0)).toBe(false);
      expect(hasPathSum(null, 5)).toBe(false);
    });

    it('应该处理单节点树', () => {
      const root = createTree(5);
      expect(hasPathSum(root, 5)).toBe(true);
      expect(hasPathSum(root, 10)).toBe(false);
    });

    it('应该找到存在的路径', () => {
      //       5
      //      / \
      //     4   8
      //    /   / \
      //   11  13  4
      //  /  \      \
      // 7    2      1
      const root = createTree(5,
        createTree(4,
          createTree(11,
            createTree(7),
            createTree(2)
          )
        ),
        createTree(8,
          createTree(13),
          createTree(4,
            null,
            createTree(1)
          )
        )
      );

      expect(hasPathSum(root, 22)).toBe(true); // 5 -> 4 -> 11 -> 2
      expect(hasPathSum(root, 26)).toBe(true); // 5 -> 8 -> 13
      expect(hasPathSum(root, 27)).toBe(true); // 5 -> 8 -> 4 -> 1, but 1 is leaf
      expect(hasPathSum(root, 18)).toBe(true); // 5 -> 4 -> 11 -> 7, but 7 is leaf
      expect(hasPathSum(root, 100)).toBe(false);
    });

    it('应该判断不存在的路径', () => {
      //     1
      //    / \
      //   2   3
      const root = createTree(1,
        createTree(2),
        createTree(3)
      );

      expect(hasPathSum(root, 1)).toBe(false); // 1 is not a leaf
      expect(hasPathSum(root, 3)).toBe(false); // 1 -> 2, but 2 is leaf
      expect(hasPathSum(root, 4)).toBe(true); // 1 -> 3
      expect(hasPathSum(root, 5)).toBe(false);
    });

    it('应该处理只有左子树的树', () => {
      //   1
      //  /
      // 2
      const root = createTree(1,
        createTree(2)
      );

      expect(hasPathSum(root, 3)).toBe(true); // 1 -> 2
      expect(hasPathSum(root, 1)).toBe(false);
      expect(hasPathSum(root, 2)).toBe(false);
    });

    it('应该处理只有右子树的树', () => {
      // 1
      //  \
      //   2
      const root = createTree(1,
        null,
        createTree(2)
      );

      expect(hasPathSum(root, 3)).toBe(true); // 1 -> 2
      expect(hasPathSum(root, 1)).toBe(false);
      expect(hasPathSum(root, 2)).toBe(false);
    });

    it('应该处理包含负数的树', () => {
      //     1
      //    / \
      //  -2   3
      const root = createTree(1,
        createTree(-2),
        createTree(3)
      );

      expect(hasPathSum(root, -1)).toBe(true); // 1 -> -2
      expect(hasPathSum(root, 4)).toBe(true); // 1 -> 3
      expect(hasPathSum(root, 0)).toBe(false);
    });

    it('应该处理较深的树', () => {
      //     1
      //    /
      //   2
      //  /
      // 3
      const root = createTree(1,
        createTree(2,
          createTree(3)
        )
      );

      expect(hasPathSum(root, 6)).toBe(true); // 1 -> 2 -> 3
      expect(hasPathSum(root, 3)).toBe(false); // 1 -> 2, but 2 is not leaf
    });
  });

  describe('pathSum - 返回所有路径和', () => {
    it('应该返回空树的结果', () => {
      expect(pathSum(null, 0)).toEqual([]);
    });

    it('应该返回单节点树的路径', () => {
      const root = createTree(5);
      expect(pathSum(root, 5)).toEqual([[5]]);
      expect(pathSum(root, 10)).toEqual([]);
    });

    it('应该返回所有满足条件的路径', () => {
      //       5
      //      / \
      //     4   8
      //    /   / \
      //   11  13  4
      //  /  \      \
      // 7    2      1
      const root = createTree(5,
        createTree(4,
          createTree(11,
            createTree(7),
            createTree(2)
          )
        ),
        createTree(8,
          createTree(13),
          createTree(4,
            null,
            createTree(1)
          )
        )
      );

      const result = pathSum(root, 22);
      expect(result).toEqual([[5, 4, 11, 2]]);
    });
  });

  describe('findAllPaths - 返回所有路径', () => {
    it('应该返回空树的所有路径', () => {
      expect(findAllPaths(null, 0)).toEqual([]);
    });

    it('应该返回单节点树的所有路径', () => {
      const root = createTree(1);
      expect(findAllPaths(root, 1)).toEqual([[1]]);
    });

    it('应该返回所有从根到叶子的路径', () => {
      //     1
      //    / \
      //   2   3
      const root = createTree(1,
        createTree(2),
        createTree(3)
      );

      expect(findAllPaths(root)).toEqual([[1, 2], [1, 3]]);
    });

    it('应该返回更复杂的树的所有路径', () => {
      //       1
      //      / \
      //     2   3
      //    / \
      //   4   5
      const root = createTree(1,
        createTree(2,
          createTree(4),
          createTree(5)
        ),
        createTree(3)
      );

      expect(findAllPaths(root)).toEqual([
        [1, 2, 4],
        [1, 2, 5],
        [1, 3]
      ]);
    });
  });
});
