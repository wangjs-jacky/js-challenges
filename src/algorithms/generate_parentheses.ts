/**
 * 实现生成括号（Generate Parentheses）
 *
 * 要求：
 * - 回溯算法
 * - 剪枝条件：左括号数 < n，右括号数 < 左括号数
 * - 生成 n 对括号的所有有效组合
 * - 时间复杂度：O(4^n / sqrt(n)) - 第 n 个卡特兰数
 * - 空间复杂度：O(n)
 */

/**
 * 生成 n 对括号的所有有效组合
 * 使用回溯算法，通过左右括号计数进行剪枝
 *
 * @param n 括号对数
 * @returns 所有可能的有效括号组合
 *
 * @example
 * generateParenthesis(3);
 * // [
 * //   "((()))",
 * //   "(()())",
 * //   "(())()",
 * //   "()(())",
 * //   "()()()"
 * // ]
 */
export function generateParenthesis(n: number): string[] {
  // TODO: 实现递归版本的生成括号
  throw new Error('Not implemented');
}

/**
 * 迭代版本：生成 n 对括号的所有有效组合
 * @param n 括号对数
 * @returns 所有可能的有效括号组合
 */
export function generateParenthesisIterative(n: number): string[] {
  // TODO: 可选：实现迭代版本的生成括号
  throw new Error('Not implemented');
}

/**
 * 计算 n 对括号的有效组合数量（卡特兰数）
 * @param n 括号对数
 * @returns 有效组合数量
 *
 * @example
 * countValidParentheses(3); // 5
 * countValidParentheses(4); // 14
 */
export function countValidParentheses(n: number): number {
  // TODO: 实现卡特兰数计算
  throw new Error('Not implemented');
}

/**
 * 动态规划版本：生成括号（可选实现）
 * @param n 括号对数
 * @returns 所有可能的有效括号组合
 */
export function generateParenthesisDP(n: number): string[] {
  // TODO: 可选：使用动态规划实现
  throw new Error('Not implemented');
}

/**
 * 验证括号字符串是否有效（可选实现）
 * @param s 括号字符串
 * @returns 是否有效
 */
export function isValidParentheses(s: string): boolean {
  // TODO: 可选：实现括号有效性验证
  throw new Error('Not implemented');
}
