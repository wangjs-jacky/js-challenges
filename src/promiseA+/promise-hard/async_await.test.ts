import { describe, it, expect, vi } from 'vitest';
import { asyncToGenerator } from './async_await';

/**
 * async/await 实现原理测试用例
 * 
 * 测试重点：
 * 1. 自动执行 Generator 函数
 * 2. 处理 Promise 的 resolve
 * 3. 处理 Promise 的 reject
 * 4. 支持 try/catch 错误处理
 * 5. 支持多个 yield 语句
 */

describe('async/await 实现原理', () => {
  it('应该自动执行 Generator 函数并返回 Promise', async () => {
    function* simpleGenerator() {
      const result = yield Promise.resolve(1);
      return result;
    }

    const asyncFn = asyncToGenerator(simpleGenerator);
    const result = await asyncFn();

    expect(result).toBe(1);
  });

  it('应该支持多个 yield 语句', async () => {
    function* multiYieldGenerator() {
      const data1 = yield Promise.resolve(1);
      const data2 = yield Promise.resolve(2);
      const data3 = yield Promise.resolve(3);
      return [data1, data2, data3];
    }

    const asyncFn = asyncToGenerator(multiYieldGenerator);
    const result = await asyncFn();

    expect(result).toEqual([1, 2, 3]);
  });

  it('应该处理 Promise reject', async () => {
    function* errorGenerator() {
      try {
        yield Promise.reject('error');
        return 'success';
      } catch (err) {
        return err;
      }
    }

    const asyncFn = asyncToGenerator(errorGenerator);
    const result = await asyncFn();

    expect(result).toBe('error');
  });

  it('应该支持 try/catch 错误处理', async () => {
    function* tryCatchGenerator() {
      try {
        yield Promise.reject('error');
      } catch (err) {
        return `caught: ${err}`;
      }
    }

    const asyncFn = asyncToGenerator(tryCatchGenerator);
    const result = await asyncFn();

    expect(result).toBe('caught: error');
  });

  it('应该支持传递参数给 Generator 函数', async () => {
    function* paramGenerator(initial: number) {
      const result = yield Promise.resolve(initial * 2);
      return result;
    }

    const asyncFn = asyncToGenerator(paramGenerator);
    const result = await asyncFn(5);

    expect(result).toBe(10);
  });

  it('应该支持异步操作链式调用', async () => {
    function* chainGenerator() {
      const step1 = yield Promise.resolve(1);
      const step2 = yield Promise.resolve(step1 + 1);
      const step3 = yield Promise.resolve(step2 + 1);
      return step3;
    }

    const asyncFn = asyncToGenerator(chainGenerator);
    const result = await asyncFn();

    expect(result).toBe(3);
  });
});
