import React, { useState } from 'react';
import dynamicComponent from './dynamicComponent';
import useBoolean from './useBoolean';

type PropType = {
  title: string;
};

export function delaySeconds(seconds: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds);
  });
}

const DynamicComponent: React.FC<PropType> = dynamicComponent(() => {
  delaySeconds(1000).then(() => import('./FunctionComponent'));
});

function Main() {
  const [visible, { toggle }] = useBoolean();
  const [param, setParam] = useState('');
  return (
    <div>
      <input
        placeholder="用户输入的参数"
        onChange={(e) => setParam(e.target.value)}
      ></input>
      <br></br>
      <button onClick={() => toggle()}>
        {visible ? '卸载组件' : '加载组件'}
      </button>
      {visible ? <DynamicComponent title={param} /> : null}
    </div>
  );
}

export default Main;
