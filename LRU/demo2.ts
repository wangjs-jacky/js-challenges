/* 
在 demo1 的基础上，实现 TTL 缓存
原题意没有很明确的点：
1. 过期时间，需要将 cacheList 中的 expireTime 进行判断，如果过期了，则删除该缓存。理论上应该有个定时的清理的机制，但是有些消耗性能。
2. 判断时机没有明确清楚：当 get，即仅更新时，去清理缓存值（题目仅 get 有超时清理判断），是否需要 set 时，也去清理缓存值（此时需要遍历数组，O(N)时间复杂度）
3. expireTime 是否可能为可选值，当不设置时，是否认为永不会超时。
*/

class LRUCache2 {
  private capacity: number;
  private cacheList: {
    key: string;
    value: any; // 不是核心关注点
    expireTime?: number;
  }[];
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cacheList = [];
  }

  checkExpire(expireTime?: number) {
    // 当不存在 expireTime 时，则认为永不过时
    if(expireTime === undefined) {
      return false;
    }
    return expireTime < Date.now();
  }

  get(key: string) {
    // 获取值
    const idx = this.cacheList.findIndex(item => key === item.key);
    if (idx === -1) {
      return undefined;
    };
    const value = this.cacheList[idx];
    // 检查是否超时，超时，则直接删除
    if (this.checkExpire(value.expireTime)) {
      this.cacheList.splice(idx, 1);
      return undefined;
    }
    // 更新位置，移动到数组的最后一位（前提要把之前的位置删除）
    this.cacheList.splice(idx, 1);
    this.cacheList.push(value);
    return value;
  }

  set(key: string, value: any, ttlMS?:number) {
    // 获取值
    const index = this.cacheList.findIndex(item => key === item.key);
    // 如果不存在就增(此时)
    if (index === -1) {
      this.cacheList.push({ key, value, expireTime:ttlMS ? Date.now() + ttlMS : undefined });
    } else {
      // 更新位置，移动到数组的最后一位（前提要把之前的位置删除）
      this.cacheList.splice(index, 1);
      this.cacheList.push({ key, value, expireTime: ttlMS ? Date.now() + ttlMS : undefined });
    }
    // 检查是否超过最大的容量
    if (this.cacheList.length > this.capacity) {
      this.cacheList.shift();
    }
  }
}