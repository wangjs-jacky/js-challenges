/**
 * 实现函数柯里化（Curry）
 *
 * 要求：
 * - 接收一个函数和可选的参数数量
 * - 返回一个柯里化后的函数
 * - 当参数数量足够时执行原函数
 * - 参数不足时返回新函数，等待更多参数
 * - 支持 sum(x)(y) 这种调用方式
 * - 支持灵活的参数传递（可以一次传入多个参数）
 */

/**
 * 函数柯里化实现
 * 将多参数函数转换为单参数函数序列
 *
 * @param fn 要柯里化的函数
 * @param arity 可选，函数的参数数量，默认为 fn.length
 * @returns 柯里化后的函数
 *
 * @example
 * function add(a, b, c) {
 *   return a + b + c;
 * }
 * const curriedAdd = curryFn(add);
 * curriedAdd(1)(2)(3); // 6
 * curriedAdd(1, 2)(3); // 6
 * curriedAdd(1)(2, 3); // 6
 */
export function curryFn<T extends (...args: any[]) => any>(
  fn: T,
  arity?: number
): (...args: any[]) => any {
  const fnLength = arity ?? fn.length;

  const curried = (...args: any[]) => {
    // 如果已收集的参数数量达到要求，执行函数
    if (args.length >= fnLength) {
      return fn(...args);
    }

    // 否则返回一个继续收集参数的函数
    return (...moreArgs: any[]) => {
      // 合并已有参数和新参数，递归调用
      return curried(...args, ...moreArgs);
    };
  };

  return curried;
}

/**
 * 柯里化的右偏应用版本（可选实现）
 * 参数从右边开始应用
 *
 * @param fn 要柯里化的函数
 * @param arity 可选，函数的参数数量
 * @returns 右偏柯里化后的函数
 *
 * @example
 * const divide = (a, b) => a / b;
 * const curriedDivide = curryRight(divide);
 * const divideBy2 = curriedDivide(2);
 * divideBy2(10); // 5 (10 / 2)
 */
export function curryRight<T extends (...args: any[]) => any>(
  fn: T,
  arity?: number
): (...args: any[]) => any {
  // TODO: 可选：实现右偏柯里化
  throw new Error('Not implemented');
}

/**
 * 带占位符的柯里化（可选实现）
 * 允许使用占位符跳过某些参数
 *
 * @param fn 要柯里化的函数
 * @param placeholder 占位符符号
 * @returns 带占位符的柯里化函数
 *
 * @example
 * const curriedMap = curryWithPlaceholder(Array.prototype.map, curry.placeholder);
 * const double = x => x * 2;
 * curriedMap(curry.placeholder, [1, 2, 3])(double); // [2, 4, 6]
 */
export function curryWithPlaceholder<T extends (...args: any[]) => any>(
  fn: T,
  placeholder?: symbol
): (...args: any[]) => any {
  // TODO: 可选：实现带占位符的柯里化
  throw new Error('Not implemented');
}

/**
 * 占位符常量，用于 curryWithPlaceholder
 */
export const curryPlaceholder = Symbol('curry placeholder');

/**
 * 柯里化的辅助工具函数（可选实现）
 */
export const curryHelpers = {
  /**
   * 基础柯里化
   */
  basic: curryFn,

  /**
   * 右偏柯里化
   */
  right: curryRight,

  /**
   * 带占位符的柯里化
   */
  withPlaceholder: curryWithPlaceholder,

  /**
   * 占位符
   */
  placeholder: curryPlaceholder
} as const;
