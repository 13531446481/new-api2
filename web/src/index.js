/*
 * @Author: fwh 1522594448@qq.com
 * @Date: 2024-05-14 15:38:37
 * @LastEditors: fwh 1522594448@qq.com
 * @LastEditTime: 2024-05-15 11:05:26
 * @FilePath: \new-api-github\web\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import HeaderBar from './components/HeaderBar';
import Footer from './components/Footer';
import 'semantic-ui-offline/semantic.min.css';
import './index.css';
import { UserProvider } from './context/User';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatusProvider } from './context/Status';
import { Layout } from '@douyinfe/semi-ui';
import SiderBar from './components/SiderBar';
import { ThemeProvider } from './context/Theme';

// initialization

const root = ReactDOM.createRoot(document.getElementById('root'));
const { Sider, Content, Header } = Layout;
root.render(
  <React.StrictMode>
    <StatusProvider>
      <UserProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Layout>
              <Sider>
                <SiderBar />
              </Sider>
              <Layout>
                {/* <Header>
                  <HeaderBar />
                </Header> */}
                <Content
                  style={{
                    padding: '24px',
                  }}
                >
                  <App />
                </Content>
                <Layout.Footer>
                  <Footer></Footer>
                </Layout.Footer>
              </Layout>
              <ToastContainer />
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </UserProvider>
    </StatusProvider>
  </React.StrictMode>,
);
