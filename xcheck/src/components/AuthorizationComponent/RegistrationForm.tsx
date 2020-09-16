import React, { Component } from 'react';
import './Authorization.scss';
import Requests from '../../utils/requests/requests'
import { passwordRegExp } from './AuthConstants'
import {Link, Redirect} from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    Select,
    Spin 
  } from 'antd';
import {
    LockFilled,
    GithubFilled,
    TeamOutlined
} from '@ant-design/icons';
import { SelectAllLabel } from 'antd/lib/transfer';
interface IRegister{
    history:object
}
interface CurrentState {
    login: string|null,
    role: string|null,
    password: string|null,
    passwordRepeat: string|null,
    error: string|null,
    isRegistrationEnd:boolean
}
const { Option } = Select;
class RegistrationForm extends Component<IRegister, {}> {
    state /* : CurrentState */ = {
      login: '',
      role: 'Student',
      password: '',
      passwordRepeat: '',
      error: '',
      isRegistrationEnd: false,
      isLoad: false
    }
    request = new Requests();

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
    onFinish = async () : Promise<any> => {
      this.setState({isLoad: true})
      const isloginunic = await this.isAccountUnic();
      if (isloginunic === 0) this.registrationRequest();
      else {
        this.setState(
          {
            error: 'Account already exists',
            isRegistrationEnd:true
          });
      }
    };
    registrationRequest = async () : Promise<any>=> {
      await this.request.addData('users', {
        'githubId': this.state.login,
        'roles': [this.state.role],
        'password': this.state.password
      })
      this.setState(
        {
          isRegistrationEnd:true,
          isLoad: false
        });
    }
    isAccountUnic = async () : Promise<any>=> {
      const data = await this.request.getDataByParameter('users', 'githubId', this.state.login);
      return data.length;
    }
    inputHandler = (event : React.ChangeEvent<HTMLInputElement>) : void => {
      this.setState({[event.target.name]: event.target.value});
    }
    selectHandler = (event : SelectAllLabel) => {
      this.setState({role: event});
    }
    render(){
      if(this.state.isRegistrationEnd) return <Redirect to='/'/>
        return(
          <Form
            {...this.formItemLayout}
            name="register"
            onFinish={this.onFinish}
            scrollToFirstError
            className='autorization-container'
          >
            <h1 className='authentification-title'>Registration</h1>
            <p className='error-block'>{this.state.error}</p>
            <p className='error-block'>{(this.state.isLoad) && <Spin />}</p>
            <div className='input-items'>
                <Form.Item
                    name="login"
                    label={<GithubFilled/>}
                    rules={[
                    {
                        required: true,
                        message: 'Please input your github!',
                        whitespace: true,
                    },
                    ]}
                >
                    <Input placeholder="Input your github"
                      value={this.state.login}
                      name="login"
                      onChange={this.inputHandler}/>
                </Form.Item>

               <Form.Item
                    name="role"
                    label={<TeamOutlined />}
                    rules={[
                        {
                        required: true,
                        message: 'Please select your role!',
                        type: 'array',
                        },
                    ]}
                >
                  <Select mode="multiple"
                    className='select'
                    placeholder="Please select your role"
                    onChange={ e => this.selectHandler(e) }>
                      <Option value="author" >Author</Option>
                      <Option value="student">Student</Option>
                      <Option value="supervizor">Supervizor</Option>
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
                        ({ getFieldValue }) => ({
                          validator() {
                            const pass = getFieldValue('password').match(passwordRegExp);
                            if (pass) {
                              return Promise.resolve();
                            }
                            return Promise.reject("Password must at least one uppercase letter, lowercase letter and number");
                          },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password
                      placeholder="Input your password"
                      name="password"
                      value={this.state.password}
                      onChange={this.inputHandler}/>
                </Form.Item>
                <Form.Item
                name="passwordRepeat"
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
                    <Input.Password
                      placeholder="Confirm your password"
                      name="passwordRepeat"
                      onChange={this.inputHandler}
                      value={this.state.passwordRepeat}/>
                </Form.Item>
            </div>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Sign up
                </Button>
            </Form.Item>
            <Form.Item>
                <p className='authorization-transition'>I already have an account. <Link to="/">Sign in</Link></p>
            </Form.Item>
          </Form>
        );
    }
}

export default RegistrationForm;
