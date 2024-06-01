/*
 * @Author: fwh 1522594448@qq.com
 * @Date: 2024-05-14 15:38:37
 * @LastEditors: fwh 1522594448@qq.com
 * @LastEditTime: 2024-05-18 11:04:42
 * @FilePath: \undefinedc:\Users\fwh\Desktop\gpt\new-api-github\web\src\pages\Token\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import { IconKey, IconHelpCircle } from '@douyinfe/semi-icons';
import TokensTable from '../../components/TokensTable';
import { Layout } from '@douyinfe/semi-ui';

const Token = () => (
  <Tabs>
    <TabPane
      tab={
        <span>
          <IconKey />
          管理apikey
        </span>
      }
      itemKey="1"
    >
      <Layout>
        <Layout.Header>
          <h3>我的令牌</h3>
        </Layout.Header>
        <Layout.Content>
          <TokensTable />
        </Layout.Content>
      </Layout>
    </TabPane>
    <TabPane
      tab={
        <span>
          <IconHelpCircle />
          调试文档
        </span>
      }
      itemKey="2"
    >
      <iframe
        src="https://z4dsd2bzes.apifox.cn"
        style={{ width: '100%', height: 'calc(100vh - 100px)', border: 'none' }} 
        title="API Document"
        sandbox="allow-scripts allow-same-origin"
      />
    </TabPane>
  </Tabs>
);

export default Token;