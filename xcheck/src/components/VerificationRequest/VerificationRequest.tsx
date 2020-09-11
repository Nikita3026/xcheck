import React, { Component } from "react";
import { Form, Input, Button, Select } from 'antd';
import './verificationRequest.scss'


const {Option} = Select;

interface State {
  options: string[],
  isChosen: boolean,
  task: string | null,
  pull_request: string,
  demo: string
}

class VerificationRequest extends Component<{}, State> {
  state: State = {
    options: ['Songbird', 'X Check App', 'schedule'],
    isChosen: false,
    task: null,
    pull_request: '',
    demo: ''
  }

  handleSelectChange = (value: string) => {
    this.setState(prev => ({...prev, isChosen: true, task: value}))
  };
  handlePrChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({pull_request: evt.target.value})
  };
  handleDemoChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({demo: evt.target.value})
  };
  handleFinish = () => {
    console.log(JSON.stringify(this.state))
  };

  render() {
    return (
      <Form layout="vertical" className="verification-request" onFinish={this.handleFinish}>
        <h1 className="verification-request-title">Verification request</h1>
        <Form.Item label="Task" name="task" rules={[{required: true, message: 'Please choose task'}]}>
          <Select
            showSearch
            placeholder="Select task"
            onChange={this.handleSelectChange}
          >
            {this.state.options.map(option => (
              <Option key={`${option}${(+new Date()).toString(16)}`} value={option}>{option}</Option>))}
          </Select>
        </Form.Item>
        {this.state.isChosen &&
        <>
          <Form.Item label="Pull request" name="pull_request"
                     rules={[{required: true, message: 'Please input link to pull request'}]}>
            <Input
              placeholder="Please input link to pull request"
              onChange={this.handlePrChange}
              value={this.state.pull_request || ''}/>
          </Form.Item>
          <Form.Item label="Demo" name="demo" rules={[{required: true, message: 'Please input link to demo'}]}>
            <Input placeholder="Please input link to demo"
                   onChange={this.handleDemoChange}
                   value={this.state.demo || ''}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </>
        }
      </Form>
    );
  }
}

export default VerificationRequest;
