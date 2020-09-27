import React, { Component } from 'react'
import moment from 'moment'
import './CreateTaskForm.scss'
import {
    Form,
    Input,
    Button,
    Modal,
    Radio,
    DatePicker,
    InputNumber,
    Switch
  } from 'antd';

import {
    PlusOutlined,
    FileDoneOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons'
import Requests from '../../../utils/requests/requests'
import { RadioChangeEvent } from 'antd/lib/radio'
import { FormInstance } from 'antd/lib/form'

interface Props {
    handleExitButtonClick:Function
}

interface State {
    isTaskVerifiedOnlyByMentor:boolean,
    deadlineDate: string|null,
    isItFirstItemOfTask:boolean,
    taskItemScope:string
}

export class CreateTaskForm extends Component<Props, State> {
    request = new Requests();
    formRef = React.createRef<FormInstance>();

    state = {
        isTaskVerifiedOnlyByMentor:false,
        deadlineDate:null,
        isItFirstItemOfTask:true,
        taskItemScope:'Basic'
    }

    setSavedValues = () => {
      this.formRef.current!.setFieldsValue({
        taskName: localStorage.getItem('createFormTaskName'),
        deadlineDate: this.setDataValue()
      });
    }

    componentDidMount(){
      this.setSavedValues();
    }

    clearItemFields = () => {
      this.formRef.current!.resetFields();
      this.setSavedValues();
    }

    openSuccessNotification = (nameOfEssense:string) : void => {
      const handleExitButtonClick:Function = this.props.handleExitButtonClick;
      const setState = this.setState.bind(this);
      Modal.success({
        title: `Your ${nameOfEssense} has been successfully added`,
        content: nameOfEssense === 'item'?`You can continue adding items or finish creating the task.`:'You can view it in the list of tasks',
        onOk(){
          if(nameOfEssense === 'task'){
                localStorage.createFormTaskName = '';
                localStorage.createFormDeadlineDate = '';
                setState({isItFirstItemOfTask:true})
                setTimeout(handleExitButtonClick(), 1000);
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
        },
        onCancel() {},
      });
    }

    handleScopeChange = (e:RadioChangeEvent) => {
      let scopeValue;
      switch(e.target.value) {
        case 'default':scopeValue = 'Basic';
        break;
        case 'small': scopeValue = 'Advanced';
        break;
        case 'large': scopeValue = 'Extra';
          break;
        default: scopeValue = 'Basic';
        break;
      }
      this.setState({
        taskItemScope:scopeValue
      })
    }

    handleMentorVerificationSwitch = (checked:boolean) => {
      this.setState({
        isTaskVerifiedOnlyByMentor:checked
      })
    }

    checkIsThisDeadlineDateImpossible=(newDeadlineDateString:string):boolean=>{
      const deadlineDate:any = new Date(newDeadlineDateString);
      const dateNow:any = new Date();
      return ((deadlineDate - dateNow) > 0);
    }

    setDataValue = ():moment.Moment| null => {
        const dateNow:any = new Date();
        const isDateCorrect:boolean = this.checkIsThisDeadlineDateImpossible(localStorage.createFormDeadlineDate);
        return  isDateCorrect?moment(localStorage.getItem('createFormDeadlineDate'), 'YYYY-MM-DD') : moment(dateNow.toLocaleString(),'DD-MM-YYYY');
    }

    createTaskRequest = async () :Promise<any> => {
      const fieldValues = this.formRef.current!.getFieldsValue();
      const taskItem:object = {
        id: fieldValues.taskName,
        author: "test",
        state: "DRAFT",
        categoriesOrder: [
          "Basic Scope",
          "Advanced Scope",
          "Extra Scope"
        ],
        deadline:moment(fieldValues.deadlineDate).format('YYYY-MM-DD'),
        items: [
          {
            minScore: fieldValues.minScore,
            maxScore: fieldValues.maxScore,
            category: `${this.state.taskItemScope} Scope`,
            title: fieldValues.title,
            description: fieldValues.itemDescription,
            verifiedOnlyByMentor: this.state.isTaskVerifiedOnlyByMentor
          }
        ]
      }
      await this.request.addData('tasks', taskItem);
    }

    addTaskItemRequest = async() =>{
      const fieldValues = this.formRef.current!.getFieldsValue();
      const taskName: any = localStorage.getItem('createFormTaskName');
      const existingData = await this.request.getDataByParameter('tasks','id',taskName);
      existingData[0].items.push({
        minScore: fieldValues.minScore,
        maxScore: fieldValues.maxScore,
        category: `${this.state.taskItemScope} Scope`,
        title: fieldValues.title,
        description: fieldValues.itemDescription,
        verifiedOnlyByMentor:this.state.isTaskVerifiedOnlyByMentor
      });
      await this.request.changeData('tasks', taskName, existingData[0]);
    }

    onFormFieldsValuesChange = (target:any) => {
      for(let key of target) {
        switch(key.name[0]) {
          case 'taskName': localStorage.createFormTaskName = key.value;
          break;
          case 'deadlineDate':
          localStorage.createFormDeadlineDate = target[0].value === null?'':moment(target[0].value).format('YYYY-MM-DD');
          break;
          default:break;
        }
      }
    }

    checkIsTaskNameUnique = async():Promise<any> => {
      const data = await this.request.getData('tasks');
      let isTaskUnique:boolean = true;
      data.map(( item : { id : string }) => {
        if (item.id === localStorage.getItem('createFormTaskName')) isTaskUnique = false;
        return 0;
      })
      return isTaskUnique;
    }

     taskNameValidator = async() : Promise<any> => {
      if (!this.state.isItFirstItemOfTask) return true;
      if (await  this.checkIsTaskNameUnique()) {
        return Promise.resolve();
      }
      return Promise.reject("A task with the same name already exist!");
    }

    onFinish = async () : Promise<any> => {
      if(this.state.isItFirstItemOfTask) {
        await this.createTaskRequest();
        this.setState({
          isItFirstItemOfTask:false
        })
      } else {
        await this.addTaskItemRequest();
      }
      this.clearItemFields();
      this.openSuccessNotification('item');
    }

    disabledDate = (current:moment.Moment) => {
      return current && current < moment().endOf('day');
    }

    render() {
        return (
        <div className = "create-task-form-container">
        <Form
          ref={this.formRef}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          className = 'create-task-main'
          onFinish={this.onFinish}
          onFieldsChange = {this.onFormFieldsValuesChange}
          initialValues = {{
            size:'default'
          }}
        >
        <Form.Item
        className = "create-task-name"
        rules={[
          { required: true, message: 'Please input task name!' },
          {validator:this.taskNameValidator}
        ]}
        name = "taskName"
        >
          <Input
          className = "create-task-name-input"
          placeholder = 'Create Your Task Name'
          name = "taskName"
          />
        </Form.Item>

        <hr/>
        <Form.Item label="Categories" name="size">
          <Radio.Group onChange = {(e:RadioChangeEvent) => this.handleScopeChange(e)}>
            <Radio.Button value="default">Basic Scope</Radio.Button>
            <Radio.Button value="small">Advanced Scope</Radio.Button>
            <Radio.Button value="large">Extra Scope</Radio.Button>
          </Radio.Group>
        </Form.Item>

         <Form.Item
         label="Title"
         rules={[{ required: true, message: 'Please input item title' }]}
         name = "title"
         shouldUpdate
         >
          <Input name = "title"/>
        </Form.Item>

        <Form.Item
        label="Item Description"
        rules={[{ required: true, message: 'Please input item description!' }]}
        name = "itemDescription"
        >
          <Input name = "itemDescription"/>
        </Form.Item>

        <Form.Item
        label="Min Score"
        rules={[{ required: true, message: 'Please input minimum score value!' }]}
        name = "minScore"
        >
          <InputNumber max={0} name = "minScore"/>
        </Form.Item>

        <Form.Item
        label="Max Score"
        rules={[{ required: true, message: 'Please input maximum score value!' }]}
        name = "maxScore"
        >
          <InputNumber min={0} name = "maxScore"/>
        </Form.Item>
        <Form.Item
        label="Verified Only By a Mentor"
        name = "VerifiedOnlyByMentor"
        >
          <Switch onChange = {(checked:boolean) => this.handleMentorVerificationSwitch(checked)}/>
        </Form.Item>

        <Form.Item className = "buttons-row">
          <Form.Item>
            <Button
            className = "add-button"
            type="primary"
            htmlType="submit"
            ><PlusOutlined />Add</Button>
          </Form.Item>

          <Form.Item  rules={[{ required: true, message: 'Please input deadline date!' }]} name = "deadlineDate">
            <DatePicker
            placeholder = 'Deadline Date'
            disabledDate={this.disabledDate}
           /*  onChange = {(_, dateString:string) => this.changeDeadlineDate(dateString)}
            value = {this.setDataValue()} */
            name = "deadlineDate"
            />
          </Form.Item>

          <Button className = "finish-button" onClick = {():void =>this.openConfirmNotification()}><FileDoneOutlined />Finish Creating</Button>
        </Form.Item>
      </Form>
    </div>
)}};

export default CreateTaskForm
