/* 
  扩展： isLoading 参数
*/

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Spin } from 'antd';
import { useState } from 'react';

const WithComponent = (Component) => {
  return (props: any): JSX.ELement => {
    const { loading, ...restProps } = props as any;
    return (
      <Spin spinning={loading}>
        <Component {...restProps} />
      </Spin>
    );
  };
};

const HOC = WithComponent(Avatar);

export default () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Button onClick={() => setLoading((x) => !x)}>切换</Button>
      <HOC loading={loading} icon={<UserOutlined />} />
    </div>
  );
};
