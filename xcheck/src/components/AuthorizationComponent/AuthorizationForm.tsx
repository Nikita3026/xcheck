import React, { Component } from 'react';
import './Authorization.scss';
import {githubAuth} from './AuthConstants'
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
import {
    LockFilled,
    GithubFilled,
    TeamOutlined,
} from '@ant-design/icons';
interface IAuth{
    history:object,
    onClick: Function
}
interface CurrentState {
    login: string|null,
    role: string|null,
    password: string|null,
     passwordRepeat: string|null,
}
const { Option } = Select;
class AuthorizationForm extends Component<IAuth, {}>{
    state/*  : CurrentState */ = {
        login: '',
        role: '',
        password: '',
        passwordRepeat: '',
    };
    formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },   
          sm: {
            span: 6,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 16,
          },
        },
    };
    onFinish = ()=> {
        console.log('Received values of form: ');
    };
    render(){
        return( 
          <Form
            {...this.formItemLayout}
            name="signin"
            onFinish={this.onFinish}
            scrollToFirstError
            className='autorization-container'
          >
            <h1 className='authentification-title'>Authorization</h1>
            <div className='input-items'>
                <Form.Item
                    name="github"
                    label={<GithubFilled/>}
                    rules={[
                    {
                        required: true,
                        message: 'Please input your github!',
                        whitespace: true,
                    },
                    ]}
                >
                    <Input placeholder="Input your github" value={this.state.login}/>
                </Form.Item>

                <Form.Item
                    name="select"
                    label={<TeamOutlined />}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please select your role!',
                    },
                    ]}
                >
                    <Select placeholder="Please select your role">
                        <Option value="admin">Admin</Option>
                        <Option value="student">Student</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="password"
                    label={<LockFilled/>}
                    rules={[
                        {
                        required: true, 
                        message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Input your password" value={this.state.password}/>
                </Form.Item>
            </div>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Sign in
                </Button>
            </Form.Item>
            <p className='auth-choise'>Or</p>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                  <a href={githubAuth.githubHref} className='github-href'>
                    <GithubFilled className='github-icon'/>
                    Sign up with GitHub
                  </a>
                </Button>
            </Form.Item>
            <Form.Item>
                <p className='authorization-transition'>New to X-Check? <a href='/#' onClick={() => this.props.onClick()}>Sign up</a></p>
            </Form.Item>
          </Form>
        
        );
    }
}

export default AuthorizationForm;