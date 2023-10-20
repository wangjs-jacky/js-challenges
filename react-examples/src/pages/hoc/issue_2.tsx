/* 
  渲染拦截示例
*/

import React from 'react';

const ListComponent = (props) => {
  return (
    <div>
      <ul>
        <li>react</li>
        <li>vue</li>
        <li>Angular</li>
        <li>{props.title}</li>
      </ul>
    </div>
  );
};

function WithListComponent(ListComponent: any) {
  return (props: any): JSX.Element => {
    const element = ListComponent(props);

    /* 找到对应 li 标签对应 children 数组 */
    const newChildElement = element.props.children!.props.children.map(
      (child, index) => {
        if (index === 2) return <li key={index}>Hello,my name is jacky</li>;
        return child;
      },
    );

    /* 3.使用 React.clone 去修改 jsx 上的 props */
    const dom = React.cloneElement(
      element as ReactElement,
      (element as ReactElement).props,
      newChildElement,
    );

    return <>{dom}</>;
  };
}

const HocComp = WithListComponent(ListComponent);

export default () => {
  return <HocComp title="title" />;
};
