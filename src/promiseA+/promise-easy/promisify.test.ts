import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { promisify } from './promisify';

/**
 * Promisify 测试用例
 *
 * 测试重点：
 * 1. 将错误优先的回调风格转换为 Promise
 * 2. 错误处理：err 非 null/undefined 时 reject
 * 3. 成功处理：err 为 null/undefined 时 resolve
 * 4. 多参数返回：多个结果值作为数组返回
 * 5. 保持 this 上下文
 * 6. 支持带参数的函数
 */

describe('promisify', () => {
  it('应该将回调风格转换为 Promise（成功情况）', async () => {
    function callbackStyle(callback: (err: Error | null, result: string) => void) {
      setTimeout(() => {
        callback(null, 'success');
      }, 10);
    }

    const promiseStyle = promisify(callbackStyle);
    const result = await promiseStyle();

    expect(result).toBe('success');
  });

  it('应该处理错误情况（err 非 null/undefined）', async () => {
    function callbackWithError(callback: (err: Error | null, result: string) => void) {
      setTimeout(() => {
        callback(new Error('failed'), '');
      }, 10);
    }

    const promiseWithError = promisify(callbackWithError);

    await expect(promiseWithError()).rejects.toThrow('failed');
  });

  it('应该支持多参数返回（返回数组）', async () => {
    function callbackWithMultiple(callback: (err: Error | null, ...results: string[]) => void) {
      setTimeout(() => {
        callback(null, 'result1', 'result2', 'result3');
      }, 10);
    }

    const promiseWithMultiple = promisify(callbackWithMultiple);
    const results = await promiseWithMultiple();

    expect(results).toEqual(['result1', 'result2', 'result3']);
  });

  it('应该保持 this 上下文', async () => {
    const obj = {
      name: 'test',
      method: function(this: any, callback: (err: Error | null, result: string) => void) {
        callback(null, this.name);
      }
    };

    const promisified = promisify(obj.method);
    const result = await promisified.call(obj);

    expect(result).toBe('test');
  });

  it('应该支持带参数的函数', async () => {
    function withParams(
      arg1: string,
      arg2: string,
      callback: (err: Error | null, result: string) => void
    ) {
      setTimeout(() => {
        callback(null, arg1 + arg2);
      }, 10);
    }

    const promisified = promisify(withParams);
    const result = await promisified('Hello, ', 'World!');

    expect(result).toBe('Hello, World!');
  });

  it('应该处理 err 为 undefined 的情况（视为成功）', async () => {
    function callbackWithUndefined(callback: (err: Error | undefined, result: string) => void) {
      setTimeout(() => {
        callback(undefined, 'success');
      }, 10);
    }

    const promisified = promisify(callbackWithUndefined);
    const result = await promisified();

    expect(result).toBe('success');
  });

  it('应该处理同步回调', async () => {
    function syncCallback(callback: (err: Error | null, result: string) => void) {
      callback(null, 'immediate');
    }

    const promisified = promisify(syncCallback);
    const result = await promisified();

    expect(result).toBe('immediate');
  });

  it('应该处理只有错误没有结果值的情况', async () => {
    function errorOnlyCallback(callback: (err: Error | null) => void) {
      setTimeout(() => {
        callback(new Error('error only'));
      }, 10);
    }

    const promisified = promisify(errorOnlyCallback);

    await expect(promisified()).rejects.toThrow('error only');
  });
});
