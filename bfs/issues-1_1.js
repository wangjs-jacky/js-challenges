/* 
  题目：岛屿数量

输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
*/

const grid = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"]
]

const numIslands = (grid) => {
  let count = 0;
  function dfs(row, col) {
    // 越界 和 “0” 就无需置零，跳过即可
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === "0") {
      return;
    }
    grid[row][col] = "0";
    dfs(row - 1, col); // ←
    dfs(row + 1, col); // →
    dfs(row, col - 1); // ↑
    dfs(row, col + 1); // ↓

  }
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "1") {
        //第1次检索到"1"时，count++，再调用广度搜索使所有其余区域为0
        count++;
        dfs(row, col);
      }
    }
  }
  return count;
};

console.log(numIslands(grid));