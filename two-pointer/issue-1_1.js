/* 
  题目：移动零
  双指针的入门题

输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
*/

const moveZeroes = function (nums) {
  /* 操作指针 */
  let j = 0;
  /* i 遍历数组指针 */
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      continue;
    } else {
      // 不为0，则交给j
      nums[j] = nums[i];
      j++; // j多走了一步
    }
  }
  for (let i = j; i < nums.length; i++) {
    nums[i] = 0;
  }
  return nums;
};

console.log(moveZeroes([0, 1, 0, 3, 12]));