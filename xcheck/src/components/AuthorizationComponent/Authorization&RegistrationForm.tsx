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
interface IAuthAndRegister{
    type: string
}
interface CurrentState {
    login: string|null,
    role: string|null,
    password: string|null,
    passwordRepeat: string|null,
    isLoginValid: boolean|null,
    isPasswordValid: boolean|null,
    isPasswordRepeatValid: boolean|null,
    isPasswordsMatch: boolean|null,
    isFormValid: boolean|null,
}
const { Option } = Select;
class AuthorizationForm extends Component<IAuthAndRegister, {}>{
    state = {
        login: '',
        role: '',
        password: '',
        passwordRepeat: '',
        isLoginValid: '',
        isPasswordValid: '',
        isPasswordRepeatValid: '',
        isPasswordsMatch: '',
        isFormValid: '',
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
    handleUserInput(event:any): void {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value},
        () => { /* this.validateField(name, value) */ });
    }
    onFinish = ()=> {
        console.log('Received values of form: ');
      };
    isAuthorization = () => {
        if(this.props.type === 'auth'){
            return(
            <div className='form-authorization'>
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
                        message: 'Please select your favourite colors!',
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
            )
        }
            return(
                <div className='form-authorization'>
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
                        <Select placeholder="Please select a role">
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
            )
    }
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
            {this.isAuthorization()}
            
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        
        );
    }
}

export default AuthorizationForm;