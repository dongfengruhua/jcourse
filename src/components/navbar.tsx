import {
  DollarOutlined,
  EditOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SearchOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Grid, Menu, Row, Typography } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

import { User } from "@/lib/models";
import { logout, toAdmin } from "@/services/user";

const { useBreakpoint } = Grid;

const NavBar = ({ user }: { user?: User }) => {
  const router = useRouter();
  const screens = useBreakpoint();
  const handleMenuClick = (e: { key: string }) => {
    if (e.key == "activity") {
      router.push("/activity");
    } else if (e.key == "sync") {
      router.push("/sync");
    } else if (e.key == "logout") {
      logout(router.basePath);
    } else if (e.key == "account" && user?.is_staff) {
      toAdmin();
    } else if (e.key == "point") {
      router.push("/point");
    }
  };
  const dropMenuItems: MenuProps["items"] = [
    {
      key: "account",
      label: user?.account,
      icon: <UserOutlined />,
    },
    { key: "point", label: "社区积分", icon: <DollarOutlined /> },
    { key: "activity", label: "我的点评", icon: <ProfileOutlined /> },
    { key: "sync", label: "同步课表", icon: <SyncOutlined /> },
    { type: "divider", key: "divider" },
    { key: "logout", label: "登出", icon: <LogoutOutlined />, danger: true },
  ];

  const navItems = [
    { label: "最新", value: "/latest" },
    { label: "关注", value: "/follow-review" },
    { label: "课程", value: "/courses" },
  ];

  const navMenuItems = navItems.map((item) => {
    return {
      key: item.value,
      label: <Link href={item.value}>{item.label}</Link>,
    };
  });

  return (
    <Row className="navbar">
      <Col>
        <Link href="/latest" className="title">
          SJTU选课社区
        </Link>
      </Col>

      <Col className="col-menu" flex="auto">
        <Menu
          selectedKeys={[router.pathname]}
          className="menu"
          mode="horizontal"
          items={navMenuItems}
        ></Menu>
      </Col>
      <Col>
        <Button
          shape="circle"
          icon={<SearchOutlined />}
          className="search-button"
          onClick={() => {
            router.push("/search");
          }}
        />
      </Col>

      <Col>
        <Dropdown
          menu={{ onClick: handleMenuClick, items: dropMenuItems }}
          placement="bottom"
        >
          <Button shape="circle" icon={<UserOutlined />}></Button>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default NavBar;
