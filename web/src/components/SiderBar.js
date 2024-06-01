import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { StatusContext } from '../context/Status';
import { Avatar, Divider, Layout, Nav } from '@douyinfe/semi-ui';

import {
  API,
  getLogo,
  getSystemName,
  isAdmin,
  isMobile,
  showError,
  showSuccess
} from '../helpers';
import '../index.css';
import {
  IconComment,
  IconGift,
  IconHistogram,
  IconHome,
  IconKey,
  IconPriceTag,
  IconSetting,
  IconExit,
  IconCreditCard
} from '@douyinfe/semi-icons';
import { IconIntro, IconRating, IconForm, IconToken, IconImage, IconBanner, IconTag, IconSlider, IconWheelChair, IconProgress } from '@douyinfe/semi-icons-lab';
import { setStatusData } from '../helpers/data.js';
import { stringToColor } from '../helpers/render';
// HeaderBar Buttons

const SiderBar = () => {
  const [userState, userDispatch] = useContext(UserContext);
  const [statusState, statusDispatch] = useContext(StatusContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const defaultIsCollapsed =
    isMobile() || localStorage.getItem('default_collapse_sidebar') === 'true';

  let navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState(['home']);
  const systemName = getSystemName();
  const logo = getLogo();
  const [isCollapsed, setIsCollapsed] = useState(defaultIsCollapsed);

  const routerMap = {
    home: '/',
    channel: '/channel',
    token: '/token',
    redemption: '/redemption',
    topup: '/topup',
    user: '/user',
    log: '/log',
    midjourney: '/midjourney',
    setting: '/setting',
    about: '/about',
    chat: '/chat',
    detail: '/detail',
    pricing: '/pricing',
    login: 'login'
  };

  async function logout() {
    setShowSidebar(false);
    await API.get('/api/user/logout');
    showSuccess('注销成功!');
    userDispatch({ type: 'logout' });
    localStorage.removeItem('user');
    navigate('/login');
  }


  const headerButtons = useMemo(
    () => [
      {
        text: '首页',
        itemKey: 'home',
        to: '/',
        icon: <IconIntro />,
      },
      {
        text: '渠道',
        itemKey: 'channel',
        to: '/channel',
        icon: <IconSlider />,
        className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
      },
      {
        text: '聊天',
        itemKey: 'chat',
        to: '/chat',
        icon: <IconComment style={{ color: '#dda0dd' }} />,
        className: localStorage.getItem('chat_link')
          ? 'semi-navigation-item-normal'
          : 'tableHiddle',
      },
      {
        text: '令牌',
        itemKey: 'token',
        to: '/token',
        icon: <IconKey style={{ color: '#1c90ed' }} />,
      },
      {
        text: '兑换码',
        itemKey: 'redemption',
        to: '/redemption',
        icon: <IconGift style={{ color: '#f82c2c' }} />,
        className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
      },
      {
        text: '模型价格',
        itemKey: 'pricing',
        to: '/pricing',
        icon: <IconRating />,
      },
      {
        text: '用户管理',
        itemKey: 'user',
        to: '/user',
        icon: <IconWheelChair />,
        className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
      },
      {
        text: '日志',
        itemKey: 'log',
        to: '/log',
        icon: <IconForm />,
      },
      {
        text: '数据看板',
        itemKey: 'detail',
        to: '/detail',
        icon: <IconBanner />,
        className:
          localStorage.getItem('enable_data_export') === 'true'
            ? 'semi-navigation-item-normal'
            : 'tableHiddle',
      },
      {
        text: '绘图',
        itemKey: 'midjourney',
        to: '/midjourney',
        icon: <IconImage />,
        className:
          localStorage.getItem('enable_drawing') === 'true'
            ? 'semi-navigation-item-normal'
            : 'tableHiddle',
      },
      // {
      //   text: '设置',
      //   itemKey: 'setting',
      //   to: '/setting',
      //   icon: <IconToken />,
      // },
      // {
      //   text: '余额充值',
      //   itemKey: 'topup',
      //   to: '/topup',
      //   icon: <IconTag />,
      // },

    ],
    [
      localStorage.getItem('enable_data_export'),
      localStorage.getItem('enable_drawing'),
      localStorage.getItem('chat_link'),
      isAdmin(),
    ],
  );

  const loadStatus = async () => {
    const res = await API.get('/api/status');
    if (res === undefined) {
      return;
    }
    const { success, data } = res.data;
    if (success) {
      statusDispatch({ type: 'set', payload: data });
      setStatusData(data);
    } else {
      showError('无法正常连接至服务器！');
    }
  };

  useEffect(() => {
    loadStatus().then(() => {
      setIsCollapsed(
        isMobile() ||
        localStorage.getItem('default_collapse_sidebar') === 'true',
      );
    });
    let localKey = window.location.pathname.split('/')[1];
    if (localKey === '') {
      localKey = 'home';
    }
    setSelectedKeys([localKey]);
    const user = localStorage.getItem('user');
    if (user) {
      userDispatch({ type: 'setUser', payload: JSON.parse(user) });
    } else {
      userDispatch({ type: 'logout' });
    }
  }, []);

  return (
    <>
      <Layout>
        <div style={{ height: '100%' }}>
          <Nav
            // bodyStyle={{ maxWidth: 200 }}
            style={{ maxWidth: 200 }}
            defaultIsCollapsed={
              isMobile() ||
              localStorage.getItem('default_collapse_sidebar') === 'true'
            }
            isCollapsed={isCollapsed}
            onCollapseChange={(collapsed) => {
              setIsCollapsed(collapsed);
            }}
            selectedKeys={selectedKeys}
            renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
              return (
                <Link
                  style={{ textDecoration: 'none' }}
                  to={routerMap[props.itemKey]}
                >
                  {itemElement}
                </Link>
              );
            }}
            items={headerButtons}
            onSelect={(key) => {
              setSelectedKeys([key.itemKey]);
            }}
            header={{
              logo: (
                <img src={logo} alt='logo' style={{ marginRight: '0.75em' }} />
              ),
              text: systemName,
            }}
          >
            <Nav.Footer style={{ display: 'block' }}>
              <Divider margin='12px'></Divider>
              <>{userState.user ? (
                <>
                  <Link to="/setting" style={{ textDecoration: 'none' }}>
                    <Nav.Item
                      itemKey="setting"
                      text={userState.user.username}
                      style={{ alignItems: 'center' }}
                      icon={
                        <Avatar
                          size='extra-extra-small'
                          color={stringToColor(userState.user.username)}
                          style={{ margin: '4px', display: 'flex' }}
                        >
                          {userState.user.username[0]}
                        </Avatar>
                      }
                    />
                  </Link>
                  <Link to="/topup" style={{ textDecoration: 'none' }}>
                    <Nav.Item itemKey="topup" text="余额充值" icon={<IconCreditCard />} />
                  </Link>
                  <Nav.Item onClick={logout} icon={<IconExit />} text="退出"></Nav.Item>
                </>
              ) : (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Nav.Item itemKey="login" text="登录" icon={<IconProgress />} />
                </Link>
              )}</>
              <Nav.Footer collapseButton={true} />
            </Nav.Footer>
          </Nav>
        </div>
      </Layout>
    </>
  );
};

export default SiderBar;
