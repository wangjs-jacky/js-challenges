/**
 * 实现 Map Async
 *
 * 要求：
 * - 接收一个数组和一个异步映射函数
 * - 返回 Promise，resolve 为映射后的结果数组
 * - 保持结果顺序与输入数组一致
 * - 并行执行所有异步操作
 */

/**
 * 异步映射函数类型
 */
type AsyncMapper<T, R> = (item: T, index: number) => R | Promise<R>;

/**
 * 异步 map 函数
 * @param array 可迭代对象（数组、字符串、Set 等）
 * @param mapper 异步映射函数，接收元素和索引，返回映射后的值或 Promise
 * @returns Promise，resolve 为映射后的结果数组
 */
export function mapAsync<T, R>(array: Iterable<T> | ArrayLike<T>, mapper: AsyncMapper<T, R>): Promise<R[]> {
  return Promise.all(
    [...array].map((item, index) => Promise.resolve().then(() => mapper(item, index)))
  );
}
