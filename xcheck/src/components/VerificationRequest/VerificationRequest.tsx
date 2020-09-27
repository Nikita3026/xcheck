import React, {Component} from "react"
import {Form, Input, Button, Select, Spin} from 'antd'
import Requests from "../../utils/requests/requests"
import './verificationRequest.scss'


const {Option} = Select

interface State {
  options: taskObject[]
  isChosen: boolean
  task: string | null
  author: string | null
  pull_request: string
  demo: string
  isLoading: boolean
}

interface taskObject {
  id:string,
  author:string,
  state:string,
}

class VerificationRequest extends Component<{}, State> {
  state: State = {
    options: [],
    isChosen: false,
    task: null,
    author: null,
    pull_request: '',
    demo: '',
    isLoading: false
  }

  requests = new Requests()

  componentDidMount = async () => {
    this.setState({isLoading: true})
    const res = await this.requests.getRequest('tasks')
    const data = await res.data
    this.setState({
      options: data,
      isLoading: false
    })
  }

  handleSelectChange = (value: string) => {
    const chosenTask = this.state.options.find(option => option.id === value)
    if (chosenTask){
      this.setState({
        isChosen: true,
        task: chosenTask.id,
        author: chosenTask.author
      })
    }
  }
  handlePrChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({pull_request: evt.target.value})
  }
  handleDemoChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({demo: evt.target.value})
  }
  handleFinish = () => {

  }

  render() {
    if (this.state.isLoading){
      return <div className="spin-wrapper"><Spin /></div>
    }

    return (
      <Form layout="vertical" className="verification-request" onFinish={this.handleFinish}>
        <Form.Item label="Task" name="task" rules={[{required: true, message: 'Please choose task'}]}>
          <Select
            showSearch
            placeholder="Select task"
            onChange={this.handleSelectChange}
          >
            {this.state.options.map(option => (
              <Option key={`${option.id}${(+new Date()).toString(16)}`} value={option.id}>{option.id}</Option>))}
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
    )
  }
}

export default VerificationRequest
