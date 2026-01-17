# 🚀 JavaScript 异步编程挑战集

> 💪 JavaScript/TypeScript 编程挑战集合 - 涵盖 Promise 核心方法、异步任务调度、并发控制、重试机制等面试高频考点

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-1.0+-green.svg)](https://vitest.dev/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

## 📋 目录

- [特性](#-特性)
- [快速开始](#-快速开始)
- [题目列表](#-题目列表)
  - [Promise 核心方法](#1-promise-核心方法)
  - [异步任务调度](#2-异步任务调度)
  - [工具函数](#3-工具函数)
- [项目结构](#-项目结构)
- [测试](#-测试)
- [参考资源](#-参考资源)

## ✨ 特性

- ✅ **完整的 TypeScript 实现** - 所有题目使用 TypeScript 编写，类型安全
- ✅ **测试驱动开发** - 每个实现都配备完整的单元测试（Vitest）
- ✅ **面试高频考点** - 覆盖前端面试中最常见的异步编程问题
- ✅ **实用工具函数** - 可直接应用于实际项目的代码
- ✅ **详细注释** - 每个实现都有清晰的注释说明

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 运行测试

```bash
# 运行所有测试
npm run test:unit

# 强制更新快照
npm run test:force
```

### 💡 开发建议

强烈建议配合 [Vitest VSCode 插件](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) 使用：

- ✅ 实时运行测试，无需手动执行命令
- ✅ 可视化测试结果，一目了然
- ✅ 支持单个测试用例的调试
- ✅ 自动监听文件变化，即时反馈

**安装方式：**
1. 在 VSCode 扩展市场搜索 "Vitest"
2. 安装 "Vitest" 插件（作者：vitest）
3. 打开项目后，测试文件旁会自动显示运行按钮

![image-20260117200916706](https://vblog-img.oss-cn-shanghai.aliyuncs.com/jacky-blog-vuepress/202601172009154.png)





## 📚 题目列表

### 1. Promise 核心方法

实现 Promise 的核心静态方法，理解其内部机制。

#### 1.1 Promise.all
- **文件**: [`src/promiseA+/Promise.all.ts`](src/promiseA+/Promise.all.ts)
- **描述**: 等待所有 Promise 完成，任意一个失败则整体失败
- **关键点**: 计数器、顺序保持、错误处理
- **应用场景**: 批量请求、资源预加载

#### 1.2 Promise.race
- **文件**: [`src/promiseA+/Promise.race.ts`](src/promiseA+/Promise.race.ts)
- **描述**: 返回第一个完成的 Promise 结果
- **关键点**: 竞态处理、状态锁定
- **应用场景**: 超时控制、请求竞速

#### 1.3 Promise.allSettled
- **文件**: [`src/promiseA+/Promise.allSettled.ts`](src/promiseA+/Promise.allSettled.ts)
- **描述**: 等待所有 Promise 完成，返回每个结果（无论成功或失败）
- **关键点**: 结果收集、状态区分
- **应用场景**: 批量操作结果统计、容错处理

### 2. 异步任务调度

实现各种异步任务的调度和控制模式。

#### 2.1 并发调度器 (Promise.scheduler)
- **文件**: [`src/promiseA+/Promise.scheduler.ts`](src/promiseA+/Promise.scheduler.ts)
- **描述**: 控制并发数量，限制同时执行的任务数
- **关键点**: 并发池管理、任务队列、自动调度
- **应用场景**: 批量上传、接口限流、资源控制

#### 2.2 任务队列 (TaskQueue)
- **文件**: [`src/promiseA+/task_queue.ts`](src/promiseA+/task_queue.ts)
- **描述**: 按时间间隔依次执行任务，支持动态添加
- **关键点**: while 循环、动态队列、延迟执行
- **应用场景**: 定时任务、流程控制

#### 2.3 串行 & 并行控制
- **文件**: [`src/promiseA+/async_serial_parallel.ts`](src/promiseA+/async_serial_parallel.ts)
- **描述**: 实现串行、并行、混合模式的任务执行
- **关键点**: 
  - 串行：`for...of` + `await`
  - 并行：`Promise.all()`
  - 混合：并发数控制 + `Promise.race()`
- **应用场景**: 
  - 串行：有依赖关系的任务
  - 并行：独立任务批量处理
  - 混合：受限资源的批量处理

### 3. 工具函数

实用的异步工具函数，可直接应用于项目。

#### 3.1 Promise.timeout
- **文件**: [`src/promiseA+/Promise.timeout.ts`](src/promiseA+/Promise.timeout.ts)
- **描述**: 为 Promise 添加超时控制
- **关键点**: `Promise.race`、`clearTimeout`、`AbortController`
- **应用场景**: 接口超时、资源加载超时

#### 3.2 Promise.retry
- **文件**: [`src/promiseA+/Promise.retry.ts`](src/promiseA+/Promise.retry.ts)
- **描述**: Promise 重试机制，失败后自动重试
- **关键点**: 递归调用、延迟重试、错误累积
- **应用场景**: 网络请求重试、不稳定接口处理

#### 3.3 sleep 函数
- **文件**: [`src/promiseA+/sleep.ts`](src/promiseA+/sleep.ts)
- **描述**: 实现延迟执行的 sleep 函数
- **关键点**: `setTimeout` + `Promise`
- **应用场景**: 延迟执行、动画间隔、测试辅助

#### 3.4 async/await 原理
- **文件**: [`src/promiseA+/async_await.ts`](src/promiseA+/async_await.ts)
- **描述**: 理解 async/await 的底层实现原理
- **关键点**: Generator + Promise、自动执行、错误处理
- **应用场景**: 理解异步语法糖、面试必考

#### 3.5 Promise 封装 AJAX
- **文件**: [`src/promiseA+/promise_ajax.ts`](src/promiseA+/promise_ajax.ts)
- **描述**: 使用 Promise 封装 XMLHttpRequest 和 Fetch
- **关键点**: 回调转 Promise、错误处理、统一接口
- **应用场景**: 网络请求封装、项目实践

## 📁 项目结构

```
js-challenges/
├── src/
│   └── promiseA+/              # Promise 相关实现
│       ├── Promise.all.ts       # Promise.all 实现
│       ├── Promise.all.test.ts  # 对应测试文件
│       ├── Promise.race.ts
│       ├── Promise.allSettled.ts
│       ├── Promise.scheduler.ts # 并发调度器
│       ├── Promise.timeout.ts   # 超时控制
│       ├── Promise.retry.ts     # 重试机制
│       ├── task_queue.ts        # 任务队列
│       ├── async_serial_parallel.ts  # 串行并行控制
│       ├── sleep.ts             # sleep 函数
│       ├── async_await.ts       # async/await 原理
│       └── promise_ajax.ts      # AJAX 封装
├── package.json
└── README.md
```

## 🧪 测试

所有实现都配备完整的单元测试，使用 [Vitest](https://vitest.dev/) 测试框架。

### 测试覆盖的场景

- ✅ 基本功能测试
- ✅ 边界条件测试（空数组、null、undefined）
- ✅ 错误处理测试
- ✅ 异步时序测试（使用 `vi.useFakeTimers`）
- ✅ 类型兼容性测试（thenable 对象、非 Promise 值）

### 测试示例

```typescript
import { describe, it, expect } from 'vitest';
import { myPromiseAll } from './Promise.all';

describe('Promise.all', () => {
  it('应该等待所有 Promise 完成', async () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.resolve(2);
    const p3 = Promise.resolve(3);
    
    const result = await myPromiseAll([p1, p2, p3]);
    expect(result).toEqual([1, 2, 3]);
  });
});
```

## 📖 参考资源

### 官方文档
- [MDN - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN - async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

### 推荐阅读
- [Promise A+ 规范](https://promisesaplus.com/)
- [JavaScript Promise 迷你书](https://github.com/azu/promises-book)
- [现代 JavaScript 教程 - Promise](https://zh.javascript.info/promise-basics)

### 相关 Issues

以下是一些经典的异步编程场景题：

- [使用 setTimeout 实现 setInterval](https://github.com/wangjs-jacky/js-challenges/issues/5) - 单一任务的 Loop 模式
- [交通灯问题](https://github.com/wangjs-jacky/js-challenges/issues/1) - 同步/异步任务 Loop 模式
- [扩展 console.log 功能](https://github.com/wangjs-jacky/js-challenges/issues/2) - 延时重复内容
- [Promise 超时控制](https://github.com/wangjs-jacky/js-challenges/issues/3) - 异步任务超时兜底
- [每隔一秒打印 1,2,3,4,5](https://github.com/wangjs-jacky/js-challenges/issues/4) - 异步任务串行模式

## 💡 学习建议

### 学习路径

1. **基础阶段** - 理解 Promise 基本概念
   - Promise 三种状态（pending、fulfilled、rejected）
   - Promise 链式调用
   - 错误处理机制

2. **进阶阶段** - 实现核心方法
   - Promise.all / race / allSettled
   - 理解并发和串行的区别
   - 掌握错误处理和边界情况

3. **实战阶段** - 解决实际问题
   - 并发控制和调度
   - 超时和重试机制
   - 任务队列设计

4. **原理阶段** - 深入理解
   - async/await 实现原理
   - Generator 函数
   - Promise A+ 规范

### 面试准备

每个实现都应该能够：
- 📝 **讲清楚思路** - 核心逻辑、关键步骤
- 💻 **手写实现** - 不看参考，默写代码
- 🎯 **说出应用场景** - 至少 2 个真实项目例子
- ⚠️ **注意边界情况** - 空数组、null、错误处理
- 🔄 **提供多种解法** - 不同的实现方式和优化

## 📄 License

ISC

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

⭐ 如果这个项目对你有帮助，欢迎 Star！
