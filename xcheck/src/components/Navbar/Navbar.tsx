import React, { Component } from 'react'
import './Navbar.scss'
import bigLogo from '../../assets/img/logo-big.png'
import smallLogo from '../../assets/img/logo-small.png'

import { Layout, Menu, Breadcrumb } from 'antd'
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
} from '@ant-design/icons'

import {
  Link
} from "react-router-dom"


const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
interface State {
    collapsed:boolean
}

interface NavbarProps {
  history:object,
  pageName:string
}

class Navbar extends Component<NavbarProps, State> {
  state : State = {
    collapsed: false,
  };

  onCollapse = (collapsed : boolean) : void => {
    this.setState({ collapsed });
  };

  renderLogo() {
    if(this.state.collapsed) {
      return smallLogo;
    }
    return bigLogo;
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className = "logo">
              <img alt = "logo" className = "logo-img" src = {this.renderLogo()}></img>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  <Link to="/tasks">Tasks</Link>
                </Menu.Item>
                  <Menu.Item key="2" icon={<ExclamationCircleOutlined />}>
                  <Link to="/reviews-requests">Reviews requests </Link>
                  </Menu.Item>
                <Menu.Item key="3" icon={<PlusCircleOutlined />}>
                  <Link to="/verification-request">Verification request</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<CarryOutOutlined />} title="Works check">
                  <Menu.Item key="4" icon={<TeamOutlined />}>
                    <Link to="/checking-another">Work of people</Link>
                  </Menu.Item>
                  <Menu.Item key="5" icon={<UserOutlined />}>
                    <Link to="/self-test">Self-test</Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="6" icon={<BarChartOutlined />}>
                    <Link to="/reviews">Reviews</Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<SwapOutlined />}>
                  <Link to="/cross-check">Cross-check</Link>
                </Menu.Item>
                <Menu.Item key="8" icon={<LogoutOutlined />}>
                  <Link to="/">Exit</Link>
                </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
    <Header className="site-layout-background" style={{
      padding: 0,
      fontSize:'40px',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      textTransform:'capitalize'
      }}>
        {this.props.pageName}
      </Header>
          <Content style={{ margin: '16px 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>RSS React 2020Q3 ©2020 Created by Team 31</Footer>
        </Layout>
      </Layout>
    );
  }
}


export default Navbar
