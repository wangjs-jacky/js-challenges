/**
 * 实现岛屿数量（Number of Islands）
 *
 * 要求：
 * - 使用深度优先搜索（DFS）或广度优先搜索（BFS）
 * - 标记已访问的陆地，避免重复计算
 * - 处理边界情况（空网格、全0、全1）
 * - 只考虑水平和垂直方向相连的陆地
 */

/**
 * 计算岛屿数量
 * 给定一个由 '1'（陆地）和 '0'（水域）组成的二维网格
 * 计算岛屿的数量。岛屿是被水包围的陆地，通过水平或垂直方向连接
 *
 * @param grid 二维字符数组，'1' 表示陆地，'0' 表示水域
 * @returns 岛屿的数量
 */
export function numIslands(grid: string[][]): number {
  // TODO: 实现岛屿数量计算
  throw new Error('Not implemented');
}

/**
 * DFS 版本的岛屿数量计算（可选实现）
 * @param grid 二维字符数组
 * @returns 岛屿的数量
 */
export function numIslandsDFS(grid: string[][]): number {
  // TODO: 可选：使用 DFS 实现
  throw new Error('Not implemented');
}

/**
 * BFS 版本的岛屿数量计算（可选实现）
 * @param grid 二维字符数组
 * @returns 岛屿的数量
 */
export function numIslandsBFS(grid: string[][]): number {
  // TODO: 可选：使用 BFS 实现
  throw new Error('Not implemented');
}

/**
 * 并查集版本的岛屿数量计算（可选实现）
 * @param grid 二维字符数组
 * @returns 岛屿的数量
 */
export function numIslandsUnionFind(grid: string[][]): number {
  // TODO: 可选：使用并查集实现
  throw new Error('Not implemented');
}
