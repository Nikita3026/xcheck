import React, { Component } from 'react';
import './Authorization.scss';
import AuthorizationForm from '../AuthorizationComponent/AuthorizationForm'

import {
    Form,
    Input,
    Button,
    Select,
  } from 'antd';
import {
    LockFilled,
    GithubFilled,
    TeamOutlined
} from '@ant-design/icons';
interface IRegister{
    history:object
    onClick: Function
}
interface CurrentState {
    login: string|null,
    role: string|null,
    password: string|null,
    passwordRepeat: string|null,
    
    /* isLoginValid: boolean|null,
    isPasswordValid: boolean|null,
    isPasswordRepeatValid: boolean|null,
    isPasswordsMatch: boolean|null,
    isFormValid: boolean|null, */
}
const { Option } = Select;
class RegistrationForm extends Component<IRegister, {}> {
    state /* : CurrentState */ = {
        login: '',
        role: '',
        password: '',
        passwordRepeat: '',
        /* isLoginValid: '',
        isPasswordValid: '',
        isPasswordRepeatValid: '',
        isPasswordsMatch: '',
        isFormValid: '', */
    }
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
            name="register"
            onFinish={this.onFinish}
            scrollToFirstError
            className='autorization-container'
          >
            <h1 className='authentification-title'>Registration</h1>
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
                    name="select-multiple"
                    label={<TeamOutlined />}
                    rules={[
                        {
                        required: true,
                        message: 'Please select your role!',
                        type: 'array',
                        },
                    ]}
                >
                    <Select mode="multiple" placeholder="Please select your role">
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
                <Form.Item
                name="confirm"
                label={<LockFilled/>}
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                    },
                }),
                ]}
            >
                <Input.Password placeholder="Confirm your password" value={this.state.passwordRepeat}/>
            </Form.Item>
            </div>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Sign up
                </Button>
                </Form.Item>
            <Form.Item>
                <a className='authorization-transition' onClick={() => this.props.onClick()}>I already have an account</a>
            </Form.Item>
          </Form>
        
        );
    }
}

export default RegistrationForm;