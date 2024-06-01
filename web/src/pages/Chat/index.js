import React, { useState, useEffect } from 'react';
import { Tabs, TabPane } from '@douyinfe/semi-ui';

const YourComponent = () => {
  // 设置状态来存储两个链接
  const [chatLink, setChatLink] = useState('');
  const [chatLink2, setChatLink2] = useState('');

  // 使用useEffect来监听localStorage中值的变化
  useEffect(() => {
    // 获取localStorage中的链接
    const link1 = localStorage.getItem('chat_link');
    const link2 = localStorage.getItem('chat_link2');

    // 如果localStorage中的值不存在，则设置默认文本
    setChatLink(link1 ? link1 : '还未设置聊天界面1');
    setChatLink2(link2 ? link2 : '还未设置聊天界面2');
  }, []); // 空依赖数组意味着这个effect只会在组件加载时运行一次

  return (
    <Tabs>
      <TabPane
        tab={<span>nextchat</span>}
        itemKey="1"
      >
        {
          // 如果 chatLink 是URL则显示iframe，否则显示文本
          chatLink.startsWith('http') ? (
            <iframe src={chatLink} style={{ width: '100%', height: '85vh', border: 'none' }}></iframe>
          ) : (
            <div>{chatLink}</div>
          )
        }
      </TabPane>
      <TabPane
        tab={<span>lobechat</span>}
        itemKey="2"
      >
        {
          // 如果 chatLink2 是URL则显示iframe，否则显示文本
          chatLink2.startsWith('http') ? (
            <iframe src={chatLink2} style={{ width: '100%', height: '85vh', border: 'none' }}></iframe>
          ) : (
            <div>{chatLink2}</div>
          )
        }
      </TabPane>
    </Tabs>
  );
};

export default YourComponent;