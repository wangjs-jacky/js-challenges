import { describe, it, expect } from 'vitest';
import { numIslands } from './num_islands';

/**
 * 岛屿数量测试用例
 *
 * 测试重点：
 * 1. 使用深度优先搜索（DFS）或广度优先搜索（BFS）
 * 2. 标记已访问的陆地，避免重复计算
 * 3. 处理边界情况（空网格、全0、全1）
 * 4. 正确计算相连的陆地数量
 */

describe('岛屿数量（Number of Islands）', () => {
  it('应该计算单个岛屿', () => {
    const grid = [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0']
    ];
    expect(numIslands(grid)).toBe(1);
  });

  it('应该计算多个岛屿', () => {
    const grid = [
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1']
    ];
    expect(numIslands(grid)).toBe(3);
  });

  it('应该处理空网格', () => {
    expect(numIslands([])).toBe(0);
    expect(numIslands([[]])).toBe(0);
  });

  it('应该处理全水域的网格', () => {
    const grid = [
      ['0', '0'],
      ['0', '0']
    ];
    expect(numIslands(grid)).toBe(0);
  });

  it('应该处理全陆地的网格', () => {
    const grid = [
      ['1', '1'],
      ['1', '1']
    ];
    expect(numIslands(grid)).toBe(1);
  });

  it('应该处理单个陆地', () => {
    const grid = [
      ['1']
    ];
    expect(numIslands(grid)).toBe(1);
  });

  it('应该处理单个水域', () => {
    const grid = [
      ['0']
    ];
    expect(numIslands(grid)).toBe(0);
  });

  it('应该正确计算对角线不相连的陆地', () => {
    const grid = [
      ['1', '0', '1'],
      ['0', '1', '0'],
      ['1', '0', '1']
    ];
    expect(numIslands(grid)).toBe(5);
  });

  it('应该处理狭长的岛屿', () => {
    const grid = [
      ['1', '1', '1'],
      ['0', '0', '0'],
      ['0', '0', '0']
    ];
    expect(numIslands(grid)).toBe(1);
  });

  it('应该处理垂直的岛屿', () => {
    const grid = [
      ['1', '0', '0'],
      ['1', '0', '0'],
      ['1', '0', '0']
    ];
    expect(numIslands(grid)).toBe(1);
  });

  it('应该处理分离的单个陆地', () => {
    const grid = [
      ['1', '0', '1'],
      ['0', '0', '0'],
      ['1', '0', '1']
    ];
    expect(numIslands(grid)).toBe(4);
  });

  it('应该处理复杂的网格', () => {
    const grid = [
      ['1', '1', '0', '0', '0'],
      ['1', '0', '0', '0', '0'],
      ['0', '0', '0', '1', '1'],
      ['0', '0', '0', '1', '1']
    ];
    expect(numIslands(grid)).toBe(2);
  });

  it('应该处理大网格', () => {
    const grid = [
      ['1', '1', '0', '0', '0', '1'],
      ['1', '1', '0', '1', '0', '1'],
      ['0', '0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1', '1']
    ];
    expect(numIslands(grid)).toBe(3);
  });

  it('应该正确处理岛屿的边界', () => {
    const grid = [
      ['1', '1', '1', '1', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '1', '1', '1', '1']
    ];
    expect(numIslands(grid)).toBe(1);
  });
});
