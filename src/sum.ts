// 同步求和函数
export const sum = (a: number, b: number) => a + b;

// 异步求和函数
export const sumAsync = async (a: number, b: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 100);
  });
};
