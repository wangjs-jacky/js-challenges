/* 
  题目: 二分查找
  给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

  示例 1:
  输入: nums = [-1,0,3,5,9,12], target = 9
  输出: 4
  解释: 9 出现在 nums 中并且下标为 4

  视频资料：https://www.bilibili.com/video/BV1d54y1q7k7/
*/

/* 
  Blue area : [-1,0,3,5,9] 
  Red area : [12]
*/
const isBlue = (num, target) => {
  return num <= target;
}

const search = (arr, target) => {
  let l = -1;
  let r = arr.length - 1;
  while (l + 1 !== r) {
    let m = l + Math.floor((r - l) / 2);
    if (isBlue(arr[m], target)) {
      l = m;
    } else {
      r = m;
    }
  }
  return arr[l] === target ? l : -1;
}

const nums = [-1, 0, 3, 5, 9, 12]
const target = 9;

console.log(search(nums, 9)) // 4
console.log(search(nums, 2)) // -1