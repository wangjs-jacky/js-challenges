import { describe, it, expect } from 'vitest';
import { ListNode } from './types';
import { reverseList, reverseListIterative, reverseListBetween } from './reverse_linked_list';

/**
 * 反转链表测试用例
 *
 * 测试重点：
 * 1. 递归反转
 * 2. 下一个节点处理
 * 3. 返回新头节点
 * 4. 时间复杂度：O(n)
 */

describe('反转链表（Reverse Linked List）', () => {
  const createList = (arr: number[]): ListNode | null => {
    if (arr.length === 0) return null;
    const dummy = new ListNode(0);
    let current = dummy;
    for (const val of arr) {
      current.next = new ListNode(val);
      current = current.next;
    }
    return dummy.next;
  };

  const listToArray = (head: ListNode | null): number[] => {
    const result: number[] = [];
    while (head) {
      result.push(head.val);
      head = head.next;
    }
    return result;
  };

  describe('reverseList - 递归版本', () => {
    it('应该反转空链表', () => {
      expect(reverseList(null)).toBe(null);
    });

    it('应该反转单节点链表', () => {
      const list = createList([1]);
      const reversed = reverseList(list);
      expect(listToArray(reversed)).toEqual([1]);
    });

    it('应该反转两节点链表', () => {
      const list = createList([1, 2]);
      const reversed = reverseList(list);
      expect(listToArray(reversed)).toEqual([2, 1]);
    });

    it('应该反转三节点链表', () => {
      const list = createList([1, 2, 3]);
      const reversed = reverseList(list);
      expect(listToArray(reversed)).toEqual([3, 2, 1]);
    });

    it('应该反转多节点链表', () => {
      const list = createList([1, 2, 3, 4, 5]);
      const reversed = reverseList(list);
      expect(listToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
    });

    it('应该反转偶数长度链表', () => {
      const list = createList([1, 2, 3, 4]);
      const reversed = reverseList(list);
      expect(listToArray(reversed)).toEqual([4, 3, 2, 1]);
    });

    it('应该反转奇数长度链表', () => {
      const list = createList([1, 2, 3, 4, 5, 6, 7]);
      const reversed = reverseList(list);
      expect(listToArray(reversed)).toEqual([7, 6, 5, 4, 3, 2, 1]);
    });

    it('应该反转包含相同值的链表', () => {
      const list = createList([1, 1, 1]);
      const reversed = reverseList(list);
      expect(listToArray(reversed)).toEqual([1, 1, 1]);
    });

    it('应该反转包含负数的链表', () => {
      const list = createList([1, -2, 3, -4, 5]);
      const reversed = reverseList(list);
      expect(listToArray(reversed)).toEqual([5, -4, 3, -2, 1]);
    });

    it('应该反转包含零的链表', () => {
      const list = createList([0, 1, 2, 0]);
      const reversed = reverseList(list);
      expect(listToArray(reversed)).toEqual([0, 2, 1, 0]);
    });

    it('应该反转长链表', () => {
      const arr = Array.from({ length: 100 }, (_, i) => i + 1);
      const list = createList(arr);
      const reversed = reverseList(list);
      expect(listToArray(reversed)).toEqual(arr.reverse());
    });
  });

  describe('reverseListIterative - 迭代版本', () => {
    it('应该反转空链表', () => {
      expect(reverseListIterative(null)).toBe(null);
    });

    it('应该反转单节点链表', () => {
      const list = createList([1]);
      const reversed = reverseListIterative(list);
      expect(listToArray(reversed)).toEqual([1]);
    });

    it('应该反转多节点链表', () => {
      const list = createList([1, 2, 3, 4, 5]);
      const reversed = reverseListIterative(list);
      expect(listToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe('reverseListBetween - 部分反转', () => {
    it('应该反转链表的指定区间', () => {
      // 1 -> 2 -> 3 -> 4 -> 5, m=2, n=4
      // 结果: 1 -> 4 -> 3 -> 2 -> 5
      const list = createList([1, 2, 3, 4, 5]);
      const reversed = reverseListBetween(list, 2, 4);
      expect(listToArray(reversed)).toEqual([1, 4, 3, 2, 5]);
    });

    it('应该反转从头开始的区间', () => {
      // 1 -> 2 -> 3 -> 4 -> 5, m=1, n=3
      // 结果: 3 -> 2 -> 1 -> 4 -> 5
      const list = createList([1, 2, 3, 4, 5]);
      const reversed = reverseListBetween(list, 1, 3);
      expect(listToArray(reversed)).toEqual([3, 2, 1, 4, 5]);
    });

    it('应该反转到末尾的区间', () => {
      // 1 -> 2 -> 3 -> 4 -> 5, m=3, n=5
      // 结果: 1 -> 2 -> 5 -> 4 -> 3
      const list = createList([1, 2, 3, 4, 5]);
      const reversed = reverseListBetween(list, 3, 5);
      expect(listToArray(reversed)).toEqual([1, 2, 5, 4, 3]);
    });

    it('应该处理 m=n 的情况', () => {
      // 1 -> 2 -> 3 -> 4 -> 5, m=2, n=2
      // 结果不变: 1 -> 2 -> 3 -> 4 -> 5
      const list = createList([1, 2, 3, 4, 5]);
      const reversed = reverseListBetween(list, 2, 2);
      expect(listToArray(reversed)).toEqual([1, 2, 3, 4, 5]);
    });

    it('应该处理整个链表的反转', () => {
      // 1 -> 2 -> 3 -> 4 -> 5, m=1, n=5
      // 结果: 5 -> 4 -> 3 -> 2 -> 1
      const list = createList([1, 2, 3, 4, 5]);
      const reversed = reverseListBetween(list, 1, 5);
      expect(listToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe('两种实现的一致性', () => {
    it('递归和迭代应该产生相同结果', () => {
      const testCases = [
        [1],
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1],
        [1, 1, 2, 2, 3, 3]
      ];

      testCases.forEach(arr => {
        const list1 = createList([...arr]);
        const list2 = createList([...arr]);

        const recursiveResult = listToArray(reverseList(list1));
        const iterativeResult = listToArray(reverseListIterative(list2));

        expect(recursiveResult).toEqual(iterativeResult);
        expect(recursiveResult).toEqual(arr.reverse());
      });
    });
  });

  describe('边界情况', () => {
    it('应该处理单元素链表的部分反转', () => {
      const list = createList([1]);
      const reversed = reverseListBetween(list, 1, 1);
      expect(listToArray(reversed)).toEqual([1]);
    });

    it('应该处理两元素链表的反转', () => {
      const list = createList([1, 2]);
      const reversed = reverseListBetween(list, 1, 2);
      expect(listToArray(reversed)).toEqual([2, 1]);
    });
  });
});
