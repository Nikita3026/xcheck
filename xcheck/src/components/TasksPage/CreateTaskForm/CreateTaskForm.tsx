import React, { Component } from 'react'
import './CreateTaskForm.scss'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
  } from 'antd';

import {
    PlusOutlined
} from '@ant-design/icons'

interface Props {
    handleExitButtonClick:Function
}

interface State {
    componentSize:string
}

export class CreateTaskForm extends Component<Props, State> {
    state = {
        componentSize:'default'
    }

    onFormLayoutChange =({size}:{size:string}):void => {
        this.setState({
            componentSize:size
        });
    }

    render() {
        return (
            <div className = "create-task-form-container">
                <div className = "create-task-header">Create your task here</div>
                <hr/>
                <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: this.state.componentSize,
        }}
        onValuesChange={this.onFormLayoutChange}
       /*  size={this.state.componentSize} */
      >
        <Form.Item label="Categories" name="size">
          <Radio.Group>
            <Radio.Button value="default">Basic Scope</Radio.Button>
            <Radio.Button value="small">Advanced Scope</Radio.Button>
            <Radio.Button value="large">Extra Scope</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Item Description">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Max Score">
          <InputNumber min={0}/>
        </Form.Item>
        <Form.Item label="Verified Only By a Mentor">
          <Switch />
        </Form.Item>
        <Form.Item className = "buttons-row">
          <Button className = "add-button"><PlusOutlined />Add</Button>
          <DatePicker placeholder = 'Deadline Date'/>
          <Button className = "finish-button"><PlusOutlined />Finish Creating</Button>
        </Form.Item>
      </Form>
    </div>
)}};

export default CreateTaskForm
