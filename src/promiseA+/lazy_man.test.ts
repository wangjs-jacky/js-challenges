import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LazyMan } from './lazy_man.solution';

/**
 * LazyMan 测试用例
 * 
 * 测试重点：
 * 1. 支持链式调用
 * 2. 支持 sleep（延迟执行）
 * 3. 支持 eat（立即执行）
 * 4. 支持 sleepFirst（优先延迟执行）
 * 5. 任务按顺序执行
 * 6. 构造函数输出问候语
 */

describe('LazyMan', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // 捕获 console.log 输出
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该支持基本的链式调用和 eat 方法', async () => {
    const lazyMan = LazyMan('Tony');
    
    lazyMan.eat('lunch');
    
    await vi.advanceTimersByTimeAsync(0);
    
    expect(console.log).toHaveBeenCalledWith("Hi, I'm Tony");
    expect(console.log).toHaveBeenCalledWith('Eat lunch');
  });

  it('应该支持多个 eat 方法链式调用', async () => {
    const lazyMan = LazyMan('Tony');
    
    lazyMan.eat('lunch').eat('dinner');
    
    await vi.advanceTimersByTimeAsync(0);
    
    expect(console.log).toHaveBeenCalledWith("Hi, I'm Tony");
    expect(console.log).toHaveBeenCalledWith('Eat lunch');
    expect(console.log).toHaveBeenCalledWith('Eat dinner');
  });

  it('应该支持 sleep 延迟执行', async () => {
    const lazyMan = LazyMan('Tony');
    
    lazyMan.eat('lunch').sleep(3).eat('dinner');
    
    // 初始执行
    await vi.advanceTimersByTimeAsync(0);
    expect(console.log).toHaveBeenCalledWith("Hi, I'm Tony");
    expect(console.log).toHaveBeenCalledWith('Eat lunch');
    
    // 等待3秒后执行下一个任务
    await vi.advanceTimersByTimeAsync(3000);
    expect(console.log).toHaveBeenCalledWith('Eat dinner');
  });

  it('应该支持 sleepFirst 优先延迟执行', async () => {
    const lazyMan = LazyMan('Tony');
    
    lazyMan.eat('lunch').sleepFirst(2).eat('dinner');
    
    // 初始执行，应该先等待2秒
    await vi.advanceTimersByTimeAsync(0);
    // sleepFirst 应该先执行，所以此时还没有输出问候语
    
    // 等待2秒后，应该输出问候语和 lunch
    await vi.advanceTimersByTimeAsync(2000);
    expect(console.log).toHaveBeenCalledWith("Hi, I'm Tony");
    expect(console.log).toHaveBeenCalledWith('Eat lunch');
    expect(console.log).toHaveBeenCalledWith('Eat dinner');
  });

  it('应该按照正确的顺序执行任务', async () => {
    const lazyMan = LazyMan('Tony');
    const callOrder: string[] = [];
    
    vi.spyOn(console, 'log').mockImplementation((msg: string) => {
      callOrder.push(msg);
    });
    
    lazyMan
      .eat('lunch')
      .eat('dinner')
      .sleep(3)
      .eat('junk food');
    
    // 初始执行
    await vi.advanceTimersByTimeAsync(0);
    expect(callOrder).toEqual([
      "Hi, I'm Tony",
      'Eat lunch',
      'Eat dinner'
    ]);
    
    // 等待3秒后执行最后一个任务
    await vi.advanceTimersByTimeAsync(3000);
    expect(callOrder).toEqual([
      "Hi, I'm Tony",
      'Eat lunch',
      'Eat dinner',
      'Eat junk food'
    ]);
  });

  it('应该正确处理 sleepFirst 在中间的情况', async () => {
    const lazyMan = LazyMan('Tony');
    const callOrder: string[] = [];
    
    vi.spyOn(console, 'log').mockImplementation((msg: string) => {
      callOrder.push(msg);
    });
    
    lazyMan
      .eat('lunch')
      .sleepFirst(2)
      .eat('dinner');
    
    // 初始执行，sleepFirst 应该先执行
    await vi.advanceTimersByTimeAsync(0);
    // 此时应该还没有输出
    
    // 等待2秒后，应该按顺序输出
    await vi.advanceTimersByTimeAsync(2000);
    expect(callOrder).toEqual([
      "Hi, I'm Tony",
      'Eat lunch',
      'Eat dinner'
    ]);
  });

  it('应该支持多个 sleepFirst，按添加顺序执行', async () => {
    const lazyMan = LazyMan('Tony');
    const callOrder: string[] = [];
    
    vi.spyOn(console, 'log').mockImplementation((msg: string) => {
      callOrder.push(msg);
    });
    
    lazyMan
      .eat('lunch')
      .sleepFirst(2)
      .sleepFirst(1)
      .eat('dinner');
    
    // 初始执行
    await vi.advanceTimersByTimeAsync(0);
    
    // 第一个 sleepFirst(2) 应该先执行
    await vi.advanceTimersByTimeAsync(2000);
    // 然后执行第二个 sleepFirst(1)
    await vi.advanceTimersByTimeAsync(1000);
    
    expect(callOrder).toEqual([
      "Hi, I'm Tony",
      'Eat lunch',
      'Eat dinner'
    ]);
  });

  it('应该支持复杂的任务组合', async () => {
    const lazyMan = LazyMan('Tony');
    const callOrder: string[] = [];
    
    vi.spyOn(console, 'log').mockImplementation((msg: string) => {
      callOrder.push(msg);
    });
    
    lazyMan
      .eat('lunch')
      .sleep(2)
      .eat('dinner')
      .sleepFirst(1)
      .eat('junk food');
    
    // 初始执行，sleepFirst(1) 应该先执行
    await vi.advanceTimersByTimeAsync(0);
    
    // 等待1秒后，开始执行其他任务
    await vi.advanceTimersByTimeAsync(1000);
    expect(callOrder).toEqual([
      "Hi, I'm Tony",
      'Eat lunch'
    ]);
    
    // 等待2秒后，执行 dinner
    await vi.advanceTimersByTimeAsync(2000);
    expect(callOrder).toEqual([
      "Hi, I'm Tony",
      'Eat lunch',
      'Eat dinner'
    ]);
    
    // 最后执行 junk food
    await vi.advanceTimersByTimeAsync(0);
    expect(callOrder).toEqual([
      "Hi, I'm Tony",
      'Eat lunch',
      'Eat dinner',
      'Eat junk food'
    ]);
  });

  it('应该支持链式调用返回实例', () => {
    const lazyMan = LazyMan('Tony');
    
    const result1 = lazyMan.eat('lunch');
    expect(result1).toBe(lazyMan);
    
    const result2 = lazyMan.sleep(1);
    expect(result2).toBe(lazyMan);
    
    const result3 = lazyMan.sleepFirst(1);
    expect(result3).toBe(lazyMan);
  });

  it('应该正确处理空任务队列', async () => {
    const lazyMan = LazyMan('Tony');
    
    await vi.advanceTimersByTimeAsync(0);
    
    expect(console.log).toHaveBeenCalledWith("Hi, I'm Tony");
  });
});
