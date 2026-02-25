/* 
  验证回文串（支持删除一个字符）

输入：s = "abca"
输出：true
*/

// 第1步：将验证回文子符串编写为一个函数
function isPalindrome(left, right, s) {
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    } else {
      left++;
      right--;
    }
  }
  return true;
}


const validPalindrome = s => {
  let l = 0;
  let r = s.length - 1;

  /* 扩展参数 chance */
  function allowDelete(l, r, chance = 1) {
    console.log(l, r, s, isPalindrome(l, r, s));
    if (isPalindrome(l, r, s)) {
      return true;
    } else {
      if (chance >= 0) {
        return allowDelete(l + 1, r, chance - 1) ||
          allowDelete(l, r - 1, chance - 1)
      }
      return false
    }
  }

  return allowDelete(l, r);
}

console.log(validPalindrome("abca"));