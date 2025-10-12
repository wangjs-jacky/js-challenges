/* 
实现带 TTL 的 LRU 缓存，实现 class LRUCache { get(k); set(k,v,ttlMS?) }，容量固定 capacity，
支持：LRU 淘汰；TTL 到期自动失效（get 时判定）;set 覆盖时更新过期时间
时间复杂度：get/set 都是 O(1)。
*/

/* 
思维过程：
1. 首先明确题意（即明确解决的问题-Situation）：
  本题实现的是一个资源缓存策略，可以先用前端中的类似的业务场景辅助理解题意，我这个时候会想到前端的 require 操作，第一次导入包的时候会执行真实的代码，该过程比较好使，当第二次导入包的时候，则直接从缓存中获取。
2. 再此基础上扩展几个额外的需求：
  2.1 因为缓存的空间是有限的，因此有个最大的容量，capacity，因此会有淘汰策略，
  2.2 策略一：LRU(Latest Recent Used) 淘汰最久未被使用的资源。
  2.3 策略二：TTL(Time To Live) 过期时间，资源在缓存中可以设置过期时间，过期后自动失效。
3. 思考使用什么样的结构来实现这个需求
  3.1 思考1：数组 [{key,value},{key,value},{key,value}]
  3.2 思考2：Map结构 Map(key,value)
  3.3 思考3：对象结构 {key:value,key:value,key:value}
4. 代码可以渐进实现，不用一次全部实现！！！
5. 隐藏条件
  5.1 当 get 时，即代表使用了，因此需要将该资源移动到最末端，并且删除原有的位置。
  5.2 当 set 时，即代码使用了，因此需要将原有的位置删除，并且再末尾新增的资源缓存。
*/


// 版本1：LRU 缓存
// 实现思路：需要实现一个 LRUCache，初始值使用 MaxLength
class LRUCache {
  private capacity: number;
  private cacheList: {
    key: string;
    value: any; // 不是核心关注点
  }[];
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cacheList = [];
  }

  get(key: string) {
    // 获取值
    const idx = this.cacheList.findIndex(item => key === item.key);
    if (idx === -1) {
      return undefined;
    };
    const value = this.cacheList[idx];
    // 更新位置，移动到数组的最后一位（前提要把之前的位置删除）
    this.cacheList.splice(idx, 1);
    this.cacheList.push(value);
    return value;
  }

  set(key: string, value: any) {
    // 获取值
    const index = this.cacheList.findIndex(item => key === item.key);
    // 如果不存在就增
    if (index === -1) {
      this.cacheList.push({ key, value });
    } else {
      // 更新位置，移动到数组的最后一位（前提要把之前的位置删除）
      this.cacheList.splice(index, 1);
      this.cacheList.push({ key, value });
    }
    // 检查是否超过最大的容量
    if (this.cacheList.length > this.capacity) {
      this.cacheList.shift();
    }
  }
}