import React, { Component } from 'react'
import './Navbar.scss';

import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  PlusCircleOutlined,
  ExclamationCircleOutlined,
  BarChartOutlined,
  CarryOutOutlined,
  SwapOutlined,
  LogoutOutlined,
  /* IssuesCloseOutlined */
} from '@ant-design/icons';


const { Sider } = Layout;
const { SubMenu } = Menu;

interface State {
    collapsed:boolean
}

class Navbar extends Component {
  state : State = {
    collapsed: false,
  };

  onCollapse = (collapsed : boolean) : void => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Tasks
            </Menu.Item>
            <Menu.Item key="2" icon={<ExclamationCircleOutlined />}>
              Reviews requests
            </Menu.Item>
            <Menu.Item key="3" icon={<PlusCircleOutlined />}>
              Verification request
            </Menu.Item>
            <SubMenu key="sub1" icon={<CarryOutOutlined />} title="Works check">
              <Menu.Item key="4" icon={<TeamOutlined />}>Check another person work</Menu.Item>
              <Menu.Item key="5" icon={<UserOutlined />}>Self-test</Menu.Item>
            </SubMenu>
           <Menu.Item key="6" icon={<BarChartOutlined />}>
              Reviews
            </Menu.Item>
            <Menu.Item key="7" icon={<SwapOutlined />}>
              Cross-check
            </Menu.Item>
            <Menu.Item key="8" icon={<LogoutOutlined />}>
              Exit
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    );
  }
}


export default Navbar
