import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { findFastestAPI } from './network_speed_test';

/**
 * 网络测速选择最快 API 测试用例
 * 
 * 测试重点：
 * 1. 同时请求多个 API 端点
 * 2. 测量每个请求的响应时间
 * 3. 返回最快响应的 API 地址和结果
 * 4. 可以取消其他未完成的请求
 * 5. 处理所有 API 都失败的情况
 */

describe('findFastestAPI', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该返回最快响应的 API', async () => {
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        json: async () => ({ data: 'api1' }),
        ok: true
      })
      .mockResolvedValueOnce({
        json: async () => ({ data: 'api2' }),
        ok: true
      })
      .mockResolvedValueOnce({
        json: async () => ({ data: 'api3' }),
        ok: true
      });

    global.fetch = mockFetch;

    const apiUrls = [
      'https://api1.example.com/data',
      'https://api2.example.com/data',
      'https://api3.example.com/data'
    ];

    // 模拟不同的响应时间
    const originalFetch = global.fetch;
    global.fetch = vi.fn((url: string) => {
      let delay = 300;
      if (url.includes('api2')) delay = 100; // 最快
      if (url.includes('api3')) delay = 200;
      
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            json: async () => ({ data: url }),
            ok: true
          } as Response);
        }, delay);
      });
    });

    const result = await findFastestAPI(apiUrls);
    await vi.advanceTimersByTimeAsync(300);

    expect(result.fastest).toBe('https://api2.example.com/data');
    expect(result.duration).toBeLessThanOrEqual(200);
  });

  it('应该测量每个请求的响应时间', async () => {
    global.fetch = vi.fn((url: string) => {
      let delay = 100;
      if (url.includes('api2')) delay = 50;
      
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            json: async () => ({ data: url }),
            ok: true
          } as Response);
        }, delay);
      });
    });

    const apiUrls = [
      'https://api1.example.com/data',
      'https://api2.example.com/data'
    ];

    const result = await findFastestAPI(apiUrls);
    await vi.advanceTimersByTimeAsync(150);

    expect(result.duration).toBeGreaterThan(0);
    expect(result.allResults).toBeDefined();
    expect(result.allResults.length).toBeGreaterThan(0);
  });

  it('应该处理所有 API 都失败的情况', async () => {
    global.fetch = vi.fn(() => Promise.reject('Network error'));

    const apiUrls = [
      'https://api1.example.com/data',
      'https://api2.example.com/data'
    ];

    await expect(findFastestAPI(apiUrls)).rejects.toThrow('所有 API 都失败');
  });

  it('应该处理部分 API 失败的情况', async () => {
    global.fetch = vi.fn((url: string) => {
      if (url.includes('api1')) {
        return Promise.reject('Error');
      }
      return Promise.resolve({
        json: async () => ({ data: url }),
        ok: true
      } as Response);
    });

    const apiUrls = [
      'https://api1.example.com/data',
      'https://api2.example.com/data',
      'https://api3.example.com/data'
    ];

    const result = await findFastestAPI(apiUrls);
    await vi.runAllTimersAsync();

    expect(result.fastest).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.allResults.length).toBe(2);
  });

  it('应该处理空数组', async () => {
    await expect(findFastestAPI([])).rejects.toThrow();
  });

  it('应该返回所有结果供参考', async () => {
    global.fetch = vi.fn((url: string) => {
      let delay = 100;
      if (url.includes('api2')) delay = 50;
      if (url.includes('api3')) delay = 75;
      
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            json: async () => ({ data: url }),
            ok: true
          } as Response);
        }, delay);
      });
    });

    const apiUrls = [
      'https://api1.example.com/data',
      'https://api2.example.com/data',
      'https://api3.example.com/data'
    ];

    const result = await findFastestAPI(apiUrls);
    await vi.advanceTimersByTimeAsync(150);

    expect(result.allResults).toBeDefined();
    expect(result.allResults.length).toBe(3);
    expect(result.allResults[0].duration).toBeDefined();
  });
});
