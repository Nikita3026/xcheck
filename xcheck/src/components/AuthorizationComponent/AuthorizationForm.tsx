import React, { Component } from 'react';
import './Authorization.scss';
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
/*    isLoginValid: boolean|null,
    isPasswordValid: boolean|null,
    isPasswordRepeatValid: boolean|null,
    isPasswordsMatch: boolean|null,
    isFormValid: boolean|null, */
}
const { Option } = Select;
class AuthorizationForm extends Component<IAuth, {}>{
    state/*  : CurrentState */ = {
        login: '',
        role: '',
        password: '',
        passwordRepeat: '',
       /*  isLoginValid: '',
        isPasswordValid: '',
        isPasswordRepeatValid: '',
        isPasswordsMatch: '',
        isFormValid: '', */
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
            /* form={form} */
            name="signin"
            onFinish={this.onFinish}
            scrollToFirstError
            className='autorization-container'
          >
            <h1 className='authentification-title'>Authorization</h1>
            <div className='input-items'>
                <Form.Item
                    name="nickname"
                    label={<GithubFilled/>}
                    rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
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
            <Form.Item>
                <a className='authorization-transition' onClick={() => this.props.onClick()}>Sign up</a>
            </Form.Item>
          </Form>
        
        );
    }
}

export default AuthorizationForm;