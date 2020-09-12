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
    TeamOutlined
} from '@ant-design/icons';
interface IRegister{
    history:object
    onClick: Function
}
interface CurrentState {
    login: string|null,
   /*  role: string|null, */
    password: string|null,
    passwordRepeat: string|null,
}
const { Option } = Select;
class RegistrationForm extends Component<IRegister, {}> {
    state /* : CurrentState */ = {
        login: '',
        /* role: '', */
        password: '',
        passwordRepeat: '',
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
    registrationRequest = async () => {
        /* let newUser = {
            'email': 'alex',
            'password': 'alex'
        }
        const userId = await addUser(newUser); */
    }
    render(){
        return( 
          <Form
            {...this.formItemLayout}
            name="register"
            onFinish={this.registrationRequest}
            scrollToFirstError
            className='autorization-container'
          >
            <h1 className='authentification-title'>Registration</h1>
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
                      validator(rule, value) {
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
                <p className='authorization-transition'>I already have an account. <a href='/#' onClick={() => this.props.onClick()}>Sign in</a></p>
            </Form.Item>
          </Form>
        
        );
    }
}

export default RegistrationForm;