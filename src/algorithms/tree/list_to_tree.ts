/**
 * 实现列表转成树形结构
 *
 * 要求：
 * - 根据 parentId 建立父子关系
 * - 支持根节点（parentId 为 null / undefined / 0）
 * - 处理多级嵌套
 * - 支持自定义字段映射（idKey、parentIdKey、childrenKey、rootId）
 * - 处理数据异常（循环引用、孤立节点等）
 */

export interface ListToTreeOptions {
  idKey?: string;
  parentIdKey?: string;
  childrenKey?: string;
  rootId?: null | undefined | number | string;
}

/**
 * 将扁平列表转换为树形结构
 * @param list 扁平列表，每项含 id、parentId
 * @param options 字段映射与根标识：idKey、parentIdKey、childrenKey、rootId
 * @returns 树形结构数组，每项含 children 数组
 */
export function listToTree<T extends Record<string, unknown>>(
  list: T[],
  options?: ListToTreeOptions
): T[] {
  // 边界检查
  if (!list || list.length === 0) return [];

  // 解析配置，设置默认值
  const {
    idKey = 'id',
    parentIdKey = 'parentId',
    childrenKey = 'children',
    rootId = null
  } = options || {};

  // 使用 Map 优化查找性能（O(n) vs O(n²)）
  const idMap = new Map<unknown, T>();

  // 第一次遍历：建立 id → item 映射，初始化 children
  for (const item of list) {
    const itemId = item[idKey];
    idMap.set(itemId, item);
    // 使用配置的 childrenKey 初始化，避免硬编码
    if (!(item as any)[childrenKey]) {
      (item as any)[childrenKey] = [];
    }
  }

  // 用于检测循环引用
  const visited = new Set<unknown>();

  // 第二次遍历：构建父子关系
  for (const item of list) {
    const itemId = item[idKey];
    const parentId = item[parentIdKey];

    // 检测循环引用
    if (visited.has(itemId)) {
      console.warn(`[listToTree] 检测到循环引用节点: ${idKey}=${itemId}`);
      continue;
    }
    visited.add(itemId);

    // 判断是否为根节点
    if (parentId === rootId || parentId === undefined) {
      continue;
    }

    // 查找父节点（使用 Map，O(1) 查找）
    const parent = idMap.get(parentId);

    if (parent) {
      // 找到父节点，添加到父节点的 children
      (parent as any)[childrenKey].push(item);
    } else {
      // parentId 不存在（孤立节点），处理为根节点
      console.warn(`[listToTree] 孤立节点: ${idKey}=${itemId}, ${parentIdKey}=${parentId} 不存在`);
      (item as any)[parentIdKey] = rootId;
    }
  }

  // 返回所有根节点
  return list.filter((item: T) => item[parentIdKey] === rootId);
}
