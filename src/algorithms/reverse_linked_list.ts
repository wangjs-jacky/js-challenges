/**
 * 实现反转链表（Reverse Linked List）
 *
 * 要求：
 * - 递归和迭代两种实现
 * - 递归：理解递归返回值和下一个节点处理
 * - 迭代：使用 prev、current、next 三个指针
 * - 时间复杂度：O(n)
 * - 空间复杂度：递归 O(n)，迭代 O(1)
 */

import { ListNode } from './types';

/**
 * 递归版本：反转单链表
 * @param head 链表头节点
 * @returns 反转后的链表头节点
 *
 * @example
 * // 1 -> 2 -> 3 -> 4 -> 5
 * const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
 * const reversed = reverseList(head);
 * // 5 -> 4 -> 3 -> 2 -> 1
 */
export function reverseList(head: ListNode | null): ListNode | null {
  // TODO: 实现递归版本的反转链表
  throw new Error('Not implemented');
}

/**
 * 迭代版本：反转单链表
 * @param head 链表头节点
 * @returns 反转后的链表头节点
 */
export function reverseListIterative(head: ListNode | null): ListNode | null {
  // TODO: 实现迭代版本的反转链表
  throw new Error('Not implemented');
}

/**
 * 反转链表的一部分（可选实现）
 * 反转从位置 m 到 n 的链表部分
 * @param head 链表头节点
 * @param m 起始位置（从 1 开始）
 * @param n 结束位置
 * @returns 反转后的链表头节点
 *
 * @example
 * // 1 -> 2 -> 3 -> 4 -> 5, m=2, n=4
 * // 结果: 1 -> 4 -> 3 -> 2 -> 5
 */
export function reverseListBetween(head: ListNode | null, m: number, n: number): ListNode | null {
  // TODO: 可选：实现反转链表的一部分（LeetCode 92）
  throw new Error('Not implemented');
}

/**
 * 反转链表的前 k 个节点（可选实现）
 * @param head 链表头节点
 * @param k 要反转的节点数
 * @returns 反转后的链表头节点
 */
export function reverseListK(head: ListNode | null, k: number): ListNode | null {
  // TODO: 可选：实现反转链表的前 k 个节点
  throw new Error('Not implemented');
}

/**
 * 每 k 个节点反转一次链表（可选实现）
 * @param head 链表头节点
 * @param k 每组反转的节点数
 * @returns 反转后的链表头节点
 *
 * @example
 * // 1 -> 2 -> 3 -> 4 -> 5, k=2
 * // 结果: 2 -> 1 -> 4 -> 3 -> 5
 */
export function reverseListKGroup(head: ListNode | null, k: number): ListNode | null {
  // TODO: 可选：实现每 k 个节点反转一次（LeetCode 25）
  throw new Error('Not implemented');
}

/**
 * 判断链表是否为回文（可选实现）
 * @param head 链表头节点
 * @returns 是否为回文
 */
export function isPalindrome(head: ListNode | null): boolean {
  // TODO: 可选：实现回文链表判断（LeetCode 234）
  throw new Error('Not implemented');
}
