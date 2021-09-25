import config from '@/config';
import {
  EditOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SearchOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Grid, Menu, Row } from 'antd';
import { useEffect } from 'react';
import { Link, useHistory, useModel } from 'umi';

const navMenuItems = [
  { key: '/latest', text: '最新', linkTo: '/latest' },
  { key: '/courses', text: '课程库', linkTo: '/courses' },
];
const { useBreakpoint } = Grid;

const NavBar = (props: { pathname: string }) => {
  const screens = useBreakpoint();
  const history = useHistory();
  const { pathname } = props;
  const { user, getProfile, logout, toAdmin } = useModel('useAuthModel');
  useEffect(() => {
    getProfile();
  }, []);
  const handleMenuClick = (e: { key: string }) => {
    if (e.key == 'activity') {
      history.push('/activity');
    } else if (e.key == 'sync') {
      history.push('/sync');
    } else if (e.key == 'logout') {
      logout();
    } else if (e.key == 'account' && user?.is_staff) {
      toAdmin();
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      {user && user.account != '' && (
        <Menu.Item key="account" icon={<UserOutlined />}>
          {user.account}
        </Menu.Item>
      )}
      <Menu.Item key="activity" icon={<ProfileOutlined />}>
        我的点评
      </Menu.Item>
      <Menu.Item key="sync" icon={<SyncOutlined />}>
        同步课表
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item danger key="logout" icon={<LogoutOutlined />}>
        登出
      </Menu.Item>
    </Menu>
  );

  return (
    <Row
      style={{
        alignContent: 'center',
        marginInline: 'auto',
        maxWidth: config.LAYOUT_WIDTH - 2 * config.LAYOUT_MARGIN,
      }}
    >
      <Col>
        <Link
          className="title"
          to="/"
          style={{
            fontSize: screens.xs ? 14 : 18,
          }}
        >
          SJTU选课社区
        </Link>
      </Col>

      <Col style={{ marginInline: 'auto' }} flex="auto">
        <Menu
          selectedKeys={[pathname]}
          style={{ height: 64, border: 0 }}
          mode="horizontal"
        >
          {navMenuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.linkTo}>{item.text}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Col>
      <Col>
        <Link to="/review">
          {screens.xs ? (
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          ) : (
            <Button type="primary">写点评</Button>
          )}
        </Link>
      </Col>
      <Col>
        <Link to="/search">
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            style={{ margin: 8 }}
          />
        </Link>
      </Col>

      <Col>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button shape="circle" icon={<UserOutlined />}></Button>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default NavBar;
