import { describe, it, expect } from 'vitest';
import { promisifyCustom, promisifyCustomSymbol } from './promisify_custom';

/**
 * Promisify Custom 测试用例
 *
 * 测试重点：
 * 1. 默认行为：标准的错误优先回调转换
 * 2. 自定义 promisify：通过 Symbol 定义自定义行为
 * 3. 优先级：自定义 promisify 优先于默认行为
 * 4. 带参数函数的转换
 * 5. 处理不遵循标准回调格式的函数
 */

describe('promisifyCustom', () => {
  it('应该支持默认行为（标准错误优先回调）', async () => {
    function normalCallback(callback: (err: Error | null, result: string) => void) {
      setTimeout(() => callback(null, 'normal'), 10);
    }

    const promisified = promisifyCustom(normalCallback);
    const result = await promisified();

    expect(result).toBe('normal');
  });

  it('应该使用自定义 promisify 行为（当存在时）', async () => {
    function customCallback(callback: (data: string, err: Error | null) => void) {
      // 不遵循标准回调格式：参数顺序相反
      setTimeout(() => callback('success', null), 10);
    }

    // 自定义 promisify 处理
    (customCallback as any)[promisifyCustomSymbol] = function(this: any) {
      return new Promise((resolve, reject) => {
        this.call(this, (data: string, err: Error | null) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    };

    const promisified = promisifyCustom(customCallback);
    const result = await promisified();

    expect(result).toBe('success');
  });

  it('应该支持带参数的函数（默认行为）', async () => {
    function withParams(
      arg1: string,
      arg2: string,
      callback: (err: Error | null, result: string) => void
    ) {
      setTimeout(() => callback(null, arg1 + arg2), 10);
    }

    const promisified = promisifyCustom(withParams);
    const result = await promisified('Hello, ', 'World!');

    expect(result).toBe('Hello, World!');
  });

  it('应该支持带参数的自定义 promisify', async () => {
    function customWithParams(callback: (err: Error | null, result: number) => void, a: number, b: number) {
      // 特殊格式：callback 在第一个参数
      setTimeout(() => callback(null, a + b), 10);
    }

    // 自定义 promisify 处理
    (customWithParams as any)[promisifyCustomSymbol] = function(this: any) {
      const self = this;
      return function(a: number, b: number) {
        return new Promise((resolve, reject) => {
          self.call(self, (err: Error | null, result: number) => {
            if (err) reject(err);
            else resolve(result);
          }, a, b);
        });
      };
    };

    const promisified = promisifyCustom(customWithParams);
    const result = await promisified(1, 2);

    expect(result).toBe(3);
  });

  it('应该在自定义 promisify 中正确处理错误', async () => {
    function customWithError(callback: (data: string, err: Error) => void) {
      setTimeout(() => callback('', new Error('custom error')), 10);
    }

    (customWithError as any)[promisifyCustomSymbol] = function(this: any) {
      return new Promise((resolve, reject) => {
        this.call(this, (data: string, err: Error) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    };

    const promisified = promisifyCustom(customWithError);

    await expect(promisified()).rejects.toThrow('custom error');
  });

  it('应该优先使用自定义 promisify 而非默认行为', async () => {
    let customUsed = false;

    function mixedFunction(callback: (err: Error | null, result: string) => void) {
      // 这个回调不会被使用，因为有自定义 promisify
      callback(null, 'default');
    }

    (mixedFunction as any)[promisifyCustomSymbol] = function(this: any) {
      customUsed = true;
      return new Promise((resolve) => {
        resolve('custom');
      });
    };

    const promisified = promisifyCustom(mixedFunction);
    const result = await promisified();

    expect(result).toBe('custom');
    expect(customUsed).toBe(true);
  });

  it('应该处理没有自定义 promisify 的函数（回退到默认行为）', async () => {
    function normalFunction(callback: (err: Error | null, result: string) => void) {
      setTimeout(() => callback(null, 'normal'), 10);
    }

    const promisified = promisifyCustom(normalFunction);
    const result = await promisified();

    expect(result).toBe('normal');
  });
});
