import { describe, it, expect } from 'vitest';
import { curryFn } from './curry';

/**
 * 函数柯里化测试用例
 *
 * 测试重点：
 * 1. 将多参数函数转换为单参数函数序列
 * 2. 参数数量足够时执行原函数
 * 3. 参数不足时返回新函数，等待更多参数
 * 4. 支持 sum(x)(y) 这种调用方式
 * 5. 支持部分参数应用
 */

describe('函数柯里化（Curry）', () => {
  describe('基础柯里化功能', () => {
    it('应该支持两参数函数的柯里化', () => {
      const add = (a: number, b: number) => a + b;
      const curriedAdd = curryFn(add);

      expect(curriedAdd(1)(2)).toBe(3);
      expect(curriedAdd(5)(3)).toBe(8);
    });

    it('应该支持三参数函数的柯里化', () => {
      const add = (a: number, b: number, c: number) => a + b + c;
      const curriedAdd = curryFn(add);

      expect(curriedAdd(1)(2)(3)).toBe(6);
      expect(curriedAdd(10)(20)(30)).toBe(60);
    });

    it('应该支持多参数函数的柯里化', () => {
      const add = (a: number, b: number, c: number, d: number) => a + b + c + d;
      const curriedAdd = curryFn(add);

      expect(curriedAdd(1)(2)(3)(4)).toBe(10);
      expect(curriedAdd(1)(2)(3)(4)).toBe(10);
    });
  });

  describe('部分参数应用', () => {
    it('应该支持一次传入多个参数', () => {
      const add = (a: number, b: number, c: number) => a + b + c;
      const curriedAdd = curryFn(add);

      expect(curriedAdd(1, 2)(3)).toBe(6);
      expect(curriedAdd(1)(2, 3)).toBe(6);
      expect(curriedAdd(1, 2, 3)).toBe(6);
    });

    it('应该支持灵活的参数传递', () => {
      const multiply = (a: number, b: number, c: number) => a * b * c;
      const curriedMultiply = curryFn(multiply);

      expect(curriedMultiply(2)(3)(4)).toBe(24);
      expect(curriedMultiply(2, 3)(4)).toBe(24);
      expect(curriedMultiply(2)(3, 4)).toBe(24);
      expect(curriedMultiply(2, 3, 4)).toBe(24);
    });
  });

  describe('实际应用场景', () => {
    it('应该支持 map 的柯里化', () => {
      const map = curryFn((fn: (x: number) => number, array: number[]) => array.map(fn));

      const double = map((x: number) => x * 2);
      expect(double([1, 2, 3])).toEqual([2, 4, 6]);

      const triple = map((x: number) => x * 3);
      expect(triple([1, 2, 3])).toEqual([3, 6, 9]);
    });

    it('应该支持 filter 的柯里化', () => {
      const filter = curryFn((fn: (x: number) => boolean, array: number[]) => array.filter(fn));

      const isEven = filter((x: number) => x % 2 === 0);
      expect(isEven([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);

      const isPositive = filter((x: number) => x > 0);
      expect(isPositive([-1, 0, 1, 2, -2])).toEqual([1, 2]);
    });

    it('应该支持 reduce 的柯里化', () => {
      const reduce = curryFn((
        fn: (acc: number, val: number) => number,
        initial: number,
        array: number[]
      ) => array.reduce(fn, initial));

      const sum = reduce((acc: number, val: number) => acc + val, 0);
      expect(sum([1, 2, 3, 4, 5])).toBe(15);

      const multiply = reduce((acc: number, val: number) => acc * val, 1);
      expect(multiply([1, 2, 3, 4])).toBe(24);
    });

    it('应该支持函数组合', () => {
      const map = curryFn((fn: (x: number) => number, array: number[]) => array.map(fn));
      const filter = curryFn((fn: (x: number) => boolean, array: number[]) => array.filter(fn));

      const doubleAndFilterEven = (arr: number[]) =>
        filter((x: number) => x % 2 === 0)(map((x: number) => x * 2)(arr));

      expect(doubleAndFilterEven([1, 2, 3, 4])).toEqual([4, 8]);
    });
  });

  describe('特殊场景', () => {
    it('应该支持函数柯里化的复用', () => {
      const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
      const curriedGreet = curryFn(greet);

      const sayHello = curriedGreet('Hello');
      const sayHi = curriedGreet('Hi');

      expect(sayHello('World')).toBe('Hello, World!');
      expect(sayHi('Alice')).toBe('Hi, Alice!');
    });

    it('应该支持创建预设参数的函数', () => {
      const calculateDiscount = (price: number, discount: number) => price * (1 - discount / 100);
      const curriedDiscount = curryFn(calculateDiscount);

      const tenPercentOff = curriedDiscount(10);
      expect(tenPercentOff(100)).toBe(90);

      const twentyPercentOff = curriedDiscount(20);
      expect(twentyPercentOff(100)).toBe(80);
    });

    it('应该支持带默认参数的函数', () => {
      const concat = (a: string, b: string, c: string = '!') => a + b + c;
      const curriedConcat = curryFn(concat);

      expect(curriedConcat('Hello')('World')).toBe('HelloWorld!');
      expect(curriedConcat('Hello')('World')('?')).toBe('HelloWorld?');
    });

    it('应该支持不同类型的参数', () => {
      const format = (prefix: string, value: number, suffix: string) => `${prefix}${value}${suffix}`;
      const curriedFormat = curryFn(format);

      expect(curriedFormat('$')(100)(' USD')).toBe('$100 USD');
    });
  });

  describe('边界情况', () => {
    it('应该处理无参数函数', () => {
      const noop = () => 'result';
      const curriedNoop = curryFn(noop);

      expect(curriedNoop()).toBe('result');
    });

    it('应该处理单参数函数', () => {
      const increment = (x: number) => x + 1;
      const curriedIncrement = curryFn(increment);

      expect(curriedIncrement(5)).toBe(6);
    });

    it('应该处理返回函数的函数', () => {
      const createAdder = (n: number) => (x: number) => x + n;
      const curriedCreateAdder = curryFn(createAdder);

      const addFive = curriedCreateAdder(5);
      expect(addFive(10)).toBe(15);
    });

    it('应该保持 this 上下文（如果适用）', () => {
      const obj = {
        multiplier: 2,
        multiply: function(a: number, b: number) {
          return a * b * this.multiplier;
        }
      };

      const curriedMultiply = curryFn(obj.multiply.bind(obj));
      expect(curriedMultiply(3)(4)).toBe(24);
    });
  });

  describe('函数式编程特性', () => {
    it('应该支持 pipe 风格的组合', () => {
      const pipe = <T>(...fns: Array<(arg: T) => T>) => (value: T) =>
        fns.reduce((acc, fn) => fn(acc), value);

      const addOne = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const square = (x: number) => x * x;

      const pipeline = pipe(addOne, double, square);
      expect(pipeline(3)).toBe(64); // ((3 + 1) * 2) ^ 2 = 64
    });

    it('应该支持创建可配置的函数', () => {
      const fetchData = curryFn((url: string, method: string, data: any) =>
        `${method} ${url} with ${JSON.stringify(data)}`
      );

      const get = fetchData('GET');
      const post = fetchData('POST');

      expect(get('/api/users', null)).toBe('GET /api/users with null');
      expect(post('/api/users', { name: 'John' })).toBe('POST /api/users with {"name":"John"}');
    });
  });
});
