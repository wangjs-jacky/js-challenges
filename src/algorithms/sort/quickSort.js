/* 
  题目：快速排序
  视频材料：https://www.bilibili.com/video/BV1cU4y167GB
*/

const arr = [3, 5, 2, 1, 4, 6];

function quickSort(arr, left, right) {
  if (left > right) return;

  /* 取基准值，可随机取，如取 left 值 */
  let base = arr[left]; // 3
  let i = left;
  let j = right;

  /* 复杂操作：分割数组  [<3] [3] [>3]  */
  while (i !== j) {
    while (arr[j] >= base && i < j) {
      j--;
    }

    while (arr[i] <= base && i < j) {
      i++;
    }

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  /* i === j 时，arr[i] 必定大于等于 m，因此与 base 交换 */
  [arr[left], arr[i]] = [arr[i], arr[left]];

  quickSort(arr, left, i - 1);
  quickSort(arr, i + 1, arr.length - 1);
}

quickSort(arr, 0, arr.length - 1);
console.log("arr", arr);