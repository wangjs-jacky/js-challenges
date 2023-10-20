import React, { useEffect, useState } from 'react';

// 工具函数
type MaybeNull<T> = T | null;

const Loading: React.FC = () => {
  return <div>Loading.........</div>;
};

/* 缓存 Function Component */
const dynamicComponent = (asyncComponent: { (): Promise<any> }) => {
  return <P extends {}>(props: P): JSX.Element => {
    const [Component, setComponent] = useState<MaybeNull<React.FC<P>>>(null);

    /* 异步获取包 */
    useEffect(() => {
      if (Component) return;
      asyncComponent()
        .then((module) => module?.default || module)
        .then((c) => {
          return setComponent(() => c as React.FC);
        });
    }, []);

    return Component ? <Component {...props} info="123" /> : <Loading />;
  };
};

export default dynamicComponent;
