import { describe, it, expect } from 'vitest';
import { listToTree } from './list_to_tree';

/**
 * 列表转成树形结构 测试用例
 *
 * 测试重点：
 * 1. 根据 parentId 建立父子关系，多级嵌套
 * 2. 根节点：parentId 为 null / undefined / 0 等
 * 3. 自定义字段映射（idKey、parentIdKey、childrenKey、rootId）
 * 4. 空列表、孤立节点等边界与异常
 */

describe('listToTree', () => {
  const defaultList = [
    { id: 1, name: 'Node 1', parentId: null },
    { id: 2, name: 'Node 1-1', parentId: 1 },
    { id: 3, name: 'Node 1-1-1', parentId: 2 },
    { id: 4, name: 'Node 1-2', parentId: 1 },
    { id: 5, name: 'Node 2', parentId: null },
  ];

  it('应将扁平列表转为多级树', () => {
    const tree = listToTree(defaultList);

    expect(tree).toHaveLength(2);
    const node1 = tree.find(n => n.id === 1);
    expect(node1?.children).toHaveLength(2);
    const node1_1 = node1?.children?.find((n: { id: number }) => n.id === 2);
    expect(node1_1?.children).toHaveLength(1);
    expect(node1_1?.children?.[0]).toMatchObject({ id: 3, parentId: 2 });
    expect(tree.find(n => n.id === 5)?.children).toEqual([]);
  });

  it('应支持空数组', () => {
    expect(listToTree([])).toEqual([]);
  });

  it('应支持根节点 parentId 为 undefined', () => {
    const list = [
      { id: 1, name: 'Root', parentId: undefined },
      { id: 2, name: 'Child', parentId: 1 },
    ];
    const tree = listToTree(list);

    expect(tree).toHaveLength(1);
    expect(tree[0].id).toBe(1);
    expect(tree[0].children).toHaveLength(1);
  });

  it('应支持自定义 idKey、parentIdKey、childrenKey、rootId', () => {
    const list = [
      { key: 1, title: 'A', pid: null },
      { key: 2, title: 'A-1', pid: 1 },
    ];
    const tree = listToTree(list, {
      idKey: 'key',
      parentIdKey: 'pid',
      childrenKey: 'items',
      rootId: null,
    });

    expect(tree).toHaveLength(1);
    expect((tree[0] as { key: number; items: unknown[] }).key).toBe(1);
    expect((tree[0] as { items: { key: number }[] }).items).toHaveLength(1);
    expect((tree[0] as { items: { key: number }[] }).items[0].key).toBe(2);
  });

  it('应保留节点其它字段并包含 children 数组', () => {
    const tree = listToTree(defaultList);

    expect(tree[0]).toMatchObject({ id: 1, name: 'Node 1', parentId: null });
    expect(Array.isArray(tree[0].children)).toBe(true);
  });

  it('应处理孤立节点（parentId 指向不存在或视为根）', () => {
    const list = [
      { id: 1, name: 'Root', parentId: null },
      { id: 2, name: 'Orphan', parentId: 99 },
    ];
    const tree = listToTree(list);

    expect(tree).toHaveLength(2);
    const orphan = tree.find(n => n.id === 2);
    expect(orphan?.children).toEqual([]);
  });
});
