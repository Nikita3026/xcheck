import React, { Component } from 'react'
import './CreateTaskForm.scss'
import {
    Form,
    Input,
    Button,
    Modal,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch
  } from 'antd';

import {
    PlusOutlined,
    FileDoneOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons'

interface Props {
    handleExitButtonClick:Function
}

interface State {
    componentSize:string,
    taskName:string,
    itemDescription:string,
    maxScore:number,
    isTaskVerifiedOnlyByMentor:boolean
}

export class CreateTaskForm extends Component<Props, State> {
    state = {
        componentSize:'default',
        taskName:'',
        itemDescription:'',
        maxScore:0,
        isTaskVerifiedOnlyByMentor:false
    }

    onFormLayoutChange =({size}:{size:string}):void => {
        this.setState({
            componentSize:size
        });
    }

    openSuccessNotification = (nameOfEssense:string) : void => {
      const handleExitButtonClick:Function = this.props.handleExitButtonClick;
      Modal.success({
        title: `Your ${nameOfEssense} has been successfully added`,
        content: nameOfEssense === 'item'?`You can continue adding items or finish creating the task.`:'You can view it in the list of tasks',
        onOk(){
          if(nameOfEssense === 'task'){
            return new Promise((resolve:Function, reject) => {
                setTimeout(resolve(handleExitButtonClick()), 1000);
            }).catch(() => console.log('Oops errors!'));
          }
        }
      });
    }

    openConfirmNotification = () => {
      const succesNotification:Function = this.openSuccessNotification;
      Modal.confirm({
        title: 'Do you really want to create a task?',
        icon: <ExclamationCircleOutlined />,
        content: 'After that, it will be added to the list of your created tasks.',
        onOk() {
          setTimeout(succesNotification('task'),1000);
          /* return new Promise((resolve, reject) => {
            setTimeout(, 1000);
          }) */

        /*  return new Promise((resolve, reject) => {
            setTimeout(resolve(this.openSuccessNotification()), 1000);
          }).catch(() => console.log('Oops errors!')); */
        },
        onCancel() {},
      });
    }

    handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>):void =>{
      this.setState({
        taskName:event.target.value
      })
    }

    handleItemDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>):void =>{
      this.setState({
        itemDescription:event.target.value
      })
    }

  /*   handleMaxScoreChange = (event: React.ChangeEvent<HTMLInputElement>):void =>{
      this.setState({
        maxScore:event.target === undefined?0:+event.target.value
      })
      setTimeout(() => { console.log(this.state.maxScore)},1000);
    }
 */
    render() {
        return (
            <div className = "create-task-form-container">
              <Form.Item className = "create-task-name">
                <Input
                className = "create-task-name-input"
                placeholder = 'Create Your Task Name'
                value = {this.state.taskName}
                onChange = {(e:React.ChangeEvent<HTMLInputElement>) => this.handleTaskNameChange(e)}
                />
              </Form.Item>

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
        className = 'create-task-main'
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
          <Input
          value = {this.state.itemDescription}
          onChange = {(e:React.ChangeEvent<HTMLInputElement>) => this.handleItemDescriptionChange(e)}
          />
        </Form.Item>
        <Form.Item label="Max Score">
          <InputNumber
          min={0}
         /*  value = { this.state.maxScore===undefined?0:this.state.maxScore}
          onChange = {(e:any) => this.handleMaxScoreChange(e)} */
          />
        </Form.Item>
        <Form.Item label="Verified Only By a Mentor">
          <Switch />
        </Form.Item>
        <Form.Item className = "buttons-row">
          <Button className = "add-button" onClick={():void => this.openSuccessNotification('item')}><PlusOutlined />Add</Button>
          <DatePicker
          placeholder = 'Deadline Date'
          onChange = {(date, dateString) => console.log(dateString)}
          />
          <Button className = "finish-button" onClick = {():void =>this.openConfirmNotification()}><FileDoneOutlined />Finish Creating</Button>
        </Form.Item>
      </Form>
    </div>
)}};

export default CreateTaskForm
