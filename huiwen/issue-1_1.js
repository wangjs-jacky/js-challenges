/* 
  最长回文串(找)

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
*/

/* 对于找回文串，构造由 中心 → 外 扩展 */
function spreadfromCenter(l, r) {
  while (l >= 0 && r <= s.length) {
    if (s[l] === s[r]) {
      if (r - l + 1 > maxlength) {
        start = l;
        maxlength = r - l + 1;
      }
      l--;
      r++;
    } else {
      break;
    }
  }
}

const longestPalindrome = (s) => {
  let start = 0;
  let maxlength = 1;
  for (let i = 0; i < s.length; i++) {
    /* 考虑：c[aba]d  */
    spreadfromCenter(i, i + 1);
    /* 考虑：c[abba]d（中心点bb） */
    spreadfromCenter(i - 1, i + 1);
  }

  return s.substring(start, start + maxlength)
};

console.log(longestPalindrome("babad"))