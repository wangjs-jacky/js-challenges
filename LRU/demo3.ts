// 上述 case 中，数组的存储结构存在一定的问题，遍历均为 O(1)
/* 
数组操作：
1. 删除头部元素：shift O(N) (删除后，所有的元素都需要往前移动一位，因此时间复杂度为 O(N))
2. 插入尾部元素：push O(1)
3. 查找元素：findIndex O(N)
4. 删除元素：splice O(N)
5. 获取长度：length O(1)

Map操作：
1. 删除头部元素: this.#map.delete(this.#map.keys().next().value) !!! 这个需要记忆，用的比较少
2. 插入尾部元素：this.#map.set(key, value) Map天然有序 O(1)
3. 查找元素：this.#map.get(key) O(1)
4. 删除元素：this.#map.delete(key) O(1)
5. 获取长度：this.#map.size O(1)
*/

class LRUCache3 {
  private capacity: number;
  #map: Map<string, any>;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.#map = new Map();
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
    if(!this.#map.has(key)) {
      return undefined;
    };
    // 检查是否超时，超时，则直接删除
    if (this.checkExpire(this.#map.get(key).expireTime)) {
      this.#map.delete(key);
      return undefined;
    }
    // 更新位置，移动到数组的最后一位（前提要把之前的位置删除）
    this.#map.delete(key);
    this.#map.set(key, {
      value: this.#map.get(key).value,
      expireTime: this.#map.get(key).expireTime,
    });
    return this.#map.get(key).value;
  }

  set(key: string, value: any, ttlMS?:number) {
    // 如果不存在就增(此时)
    if (this.#map.has(key)) {
      this.#map.delete(key);
      this.#map.set(key, {
        value: value,
        expireTime: ttlMS ? Date.now() + ttlMS : undefined,
      });
    } else {
      // 更新位置，移动到数组的最后一位（前提要把之前的位置删除）
      this.#map.delete(key);
      this.#map.set(key, {
        value: value,
        expireTime: ttlMS ? Date.now() + ttlMS : undefined,
      });
    }
    // 检查是否超过最大的容量
    if (this.#map.size > this.capacity) {
      // 删除头部元素
      this.#map.delete(this.#map.keys().next().value);
    }
  }
}