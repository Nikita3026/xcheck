import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import './Authorization.scss';
import { githubAuth } from './AuthConstants'
import { passwordRegExp } from './AuthConstants'
import Requests from '../../utils/requests/requests'
import { SelectValue } from 'antd/lib/select';
import {Link} from 'react-router-dom';
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
  TeamOutlined,
} from '@ant-design/icons';

interface IAuth{
    history:object
}
interface State {
  login: string|null,
  role: Array<string>|null,
  password: string|null,
  passwordRepeat: string|null,
  error: string|null,
  isAuthorizationEnd: boolean,
}
const { Option } = Select;
class AuthorizationForm extends Component<IAuth, {}>{
    state = {
      login: '',
      role: [],
      password: '',
      passwordRepeat: '',
      error: '',
      isAuthorizationEnd:false,
      isLoad: false
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
    onFinish = async () : Promise<any>=> {
      this.setState({isLoad: true})
      const regRequest = new Requests();
      const data = await regRequest.getDataByParameter('users', 'githubId', this.state.login)
      this.setState({isLoad: false})
      if(data.length === 0)
        this.setState({error: "Account doesn't exists"});
      else {
        if(data[0].password !== this.state.password) this.setState({error: "Password isn't correct"});
        else this.setState({isAuthorizationEnd: true});
      }
    };
    inputHandler = (event : React.ChangeEvent<HTMLInputElement>) : void => {
      this.setState({[event.target.name]: event.target.value});
    }
    selectHandler = (event : SelectValue) => {
      this.setState({role: event});
    }

    render(){
      if(this.state.isAuthorizationEnd) return <Redirect to='/tasks'/>
        return(
          <Form
            {...this.formItemLayout}
            name="signin"
            id='form'
            onFinish={this.onFinish}
            scrollToFirstError
            className='autorization-container'
          >
            <h1 className='authentification-title'>Authorization</h1>
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
                    <Select placeholder="Please select your role"
                      className='select'
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
                    <Input.Password placeholder="Input your password"
                      value={this.state.password}
                      name="password"
                      onChange={this.inputHandler}/>
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
                <p className='authorization-transition'>New to X-Check? <Link to='/registration'>Sign up</Link></p>
            </Form.Item>
          </Form>
        );
    }
}

export default AuthorizationForm;
