import React, { Component } from 'react'
import './Navbar.scss'
import bigLogo from '../../assets/img/logo-big.png'
import smallLogo from '../../assets/img/logo-small.png'


import { Layout, Menu } from 'antd'
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
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"


const { Sider } = Layout
const { SubMenu } = Menu
interface State {
    collapsed:boolean
}

class Navbar extends Component<{}, State> {
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
        <Router>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className = "logo">
              <img alt = "logo" className = "logo-img" src = {this.renderLogo()}></img>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  <Link to="/">Tasks</Link>
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
                  <Link to="/authorization">Exit</Link>
                </Menu.Item>

              <Switch>
                <Route path="/reviews-requests"></Route>
                <Route path="/verification-request"></Route>
                <Route path="/checking-another"></Route>
                <Route path="/self-test"></Route>
                <Route path="/reviews"></Route>
                <Route path="/cross-check"></Route>
                <Route path="/authorization"></Route>
                <Route path="/"></Route>
              </Switch>
            </Menu>
          </Sider>
        </Router>
      </Layout>
    );
  }
}


export default Navbar
