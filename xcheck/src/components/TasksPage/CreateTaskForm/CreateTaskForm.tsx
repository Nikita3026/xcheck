import React, { Component } from 'react'
import moment from 'moment'
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
import Requests from '../../../utils/requests/requests'
import { RadioChangeEvent } from 'antd/lib/radio'
import { FormInstance } from 'antd/lib/form'

interface Props {
    handleExitButtonClick:Function
}

interface State {
    componentSize:string,
    taskName:string|null,
    itemDescription:string,
    title:string,
    maxScore:number,
    minScore:number,
    isTaskVerifiedOnlyByMentor:boolean,
    deadlineDate: string|null,
    isItFirstItemOfTask:boolean,
    taskItemScope:string
}

export class CreateTaskForm extends Component<Props, State> {
    request = new Requests();
    formRef = React.createRef<FormInstance>();

    state = {
        componentSize:'default',
        taskName:'',
        itemDescription:'',
        title:'',
        maxScore:0,
        minScore:0,
        isTaskVerifiedOnlyByMentor:false,
        deadlineDate:null,
        isItFirstItemOfTask:true,
        taskItemScope:'Basic'
    }



    componentDidMount(){
    /*   this.formRef.current!.setFieldsValue({
        taskName: localStorage.getItem('createFormTaskName'),
        deadlineDate: localStorage.getItem('createFormDeadlineDate')
      }); */
      /* this.setState({
        taskName:,
        deadlineDate: localStorage.getItem('createFormDeadlineDate')
      }) */
    }

    clearItemFields = () => {
      this.setState({
        itemDescription:'',
        title:'',
        maxScore:0,
        minScore:0,
        isTaskVerifiedOnlyByMentor:false
      })
    }

    openSuccessNotification = (nameOfEssense:string) : void => {
      const handleExitButtonClick:Function = this.props.handleExitButtonClick;
      const setState = this.setState.bind(this);
      Modal.success({
        title: `Your ${nameOfEssense} has been successfully added`,
        content: nameOfEssense === 'item'?`You can continue adding items or finish creating the task.`:'You can view it in the list of tasks',
        onOk(){
          if(nameOfEssense === 'task'){
            return new Promise((resolve:Function, reject) => {
                localStorage.createFormTaskName = '';
                localStorage.createFormDeadlineDate = '';
                setState({
                  isItFirstItemOfTask:true
                })
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
        },
        onCancel() {},
      });
    }

    handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>):void =>{
      this.setState({
        taskName:event.target.value
      })
      localStorage.createFormTaskName = event.target.value;
    }

    handleItemDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>):void =>{
      this.setState({
        itemDescription:event.target.value
      })
    }

    handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>):void =>{
      this.setState({
        title:event.target.value
      })
    }

    handleScoreChange = (type:string, value: number):void =>{
      const newValue = value === undefined?0:value;
      type === 'maxScore'?
      this.setState({
        maxScore:newValue
      })
      :this.setState({
        minScore:newValue
      })
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

    checkIsThisDeadlineDateImpossible=(newDeadlineDateString:string):boolean=>{
      const deadlineDate:any = new Date(newDeadlineDateString);
      const dateNow:any = new Date();
      return ((deadlineDate - dateNow) > 0);
    }

    changeDeadlineDate = (newDeadlineDateString:string) =>{
      if(newDeadlineDateString === '') {
        this.setState({
          deadlineDate:''
        })
        localStorage.createFormDeadlineDate = '';
      } else {
        const dateNow:any = new Date();
        const isDateCorrect:boolean = this.checkIsThisDeadlineDateImpossible(newDeadlineDateString);
        const newDeadlineDate = isDateCorrect ? newDeadlineDateString : dateNow.toLocaleString();
        this.setState({
          deadlineDate:newDeadlineDate
        })
        localStorage.createFormDeadlineDate = newDeadlineDate;
      }
    }

    setDataValue = ():moment.Moment| null => {
      if(localStorage.createFormDeadlineDate === '') {
        return null;
      } else {
        const dateNow:any = new Date();
        const isDateCorrect:boolean = this.checkIsThisDeadlineDateImpossible(localStorage.createFormDeadlineDate);
        return isDateCorrect?moment(localStorage.getItem('createFormDeadlineDate'), 'YYYY-MM-DD'):moment(dateNow.toLocaleString(),'DD-MM-YYYY')
      }
    }

    checkIsTaskNameUnique = async():Promise<any> => {
      const data = await this.request.getData('tasks');
      let isTaskUnique:boolean = true;
      data.map((item:{id:string}) => {
        if(item.id === localStorage.getItem('createFormTaskName')) isTaskUnique = false;
      })
      return isTaskUnique;
    }

    createTaskRequest = async () :Promise<any> => {
      const taskItem:object = {
        id: localStorage.getItem('createFormTaskName'),
        author: "test",
        state: "DRAFT",
        categoriesOrder: [
          "Basic Scope",
          "Advanced Scope",
          "Extra Scope"
        ],
        deadline:this.state.deadlineDate,
        items: [
          {
            minScore: this.state.minScore,
            maxScore: this.state.maxScore,
            category: `${this.state.taskItemScope} Scope`,
            title: this.state.title,
            description: this.state.itemDescription,
            verifiedOnlyByMentor:this.state.isTaskVerifiedOnlyByMentor
          }
        ]
      }
        await this.request.addData('tasks', taskItem);
    }

    addTaskItemRequest = async() =>{
      const taskName: any = localStorage.getItem('createFormTaskName');
      const existingData = await this.request.getDataByParameter('tasks','id',taskName);
      existingData[0].items.push({
        minScore: this.state.minScore,
        maxScore: this.state.maxScore,
        category: `${this.state.taskItemScope} Scope`,
        title: this.state.title,
        description: this.state.itemDescription,
        verifiedOnlyByMentor:this.state.isTaskVerifiedOnlyByMentor
      });
      await this.request.changeData('tasks', taskName, existingData[0]);
    }

    onFinish = async (): Promise<any> => {
      if(this.state.isItFirstItemOfTask) {
        await this.createTaskRequest();
        this.setState({
          isItFirstItemOfTask:false
        })
        this.clearItemFields();
      } else {
        await this.addTaskItemRequest();
      }
      this.openSuccessNotification('item');
    }


    render() {
      const checkIsTaskNumberUnique:Function = this.checkIsTaskNameUnique;
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
        initialValues={{
          size: this.state.componentSize,
        }}
        className = 'create-task-main'
        onFinish={this.onFinish}
      >
          <Form.Item
              className = "create-task-name"
              rules={[
                { required: true, message: 'Please input task name!' },
                () => ({
                  async validator() : Promise<any> {
                    if (await checkIsTaskNumberUnique()) {
                      return Promise.resolve();
                    }
                    return Promise.reject("A task with the same name already exist!");
                  },
                }),
              ]}
              name = "taskName"
              >
                <Input
                className = "create-task-name-input"
                placeholder = 'Create Your Task Name'
                value = {this.state.taskName}
                onChange = {(e:React.ChangeEvent<HTMLInputElement>) => this.handleTaskNameChange(e)}
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
          <Input
          value = {this.state.title}
          onChange = {(e:React.ChangeEvent<HTMLInputElement>) => this.handleTitleChange(e)}
          name = "title"
          />
        </Form.Item>
        <Form.Item
        label="Item Description"
        rules={[{ required: true, message: 'Please input item description!' }]}
        name = "item-description"
        >
          <Input
          value = {this.state.itemDescription}
          onChange = {(e:React.ChangeEvent<HTMLInputElement>) => this.handleItemDescriptionChange(e)}
          name = "item-description"
          />
        </Form.Item>
        <Form.Item
        label="Min Score"
        rules={[{ required: true, message: 'Please input minimum score value!' }]}
        name = "min-score"
        >
          <InputNumber
          max={0}
          value = {this.state.minScore}
          onChange = {(value:any) => this.handleScoreChange('minScore',value)}
          name = "min-score"
          />
        </Form.Item>
        <Form.Item
        label="Max Score"
        rules={[{ required: true, message: 'Please input maximum score value!' }]}
        name = "max-score"
        >
          <InputNumber
          min={0}
          value = {this.state.maxScore}
          onChange = {(value:any) => this.handleScoreChange('maxScore',value)}
          name = "max-score"
          />
        </Form.Item>
        <Form.Item label="Verified Only By a Mentor">
          <Switch />
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
            onChange = {(_, dateString:string) => this.changeDeadlineDate(dateString)}
            value = {this.setDataValue()}
            name = "deadlineDate"
            />
          </Form.Item>
          <Button className = "finish-button" onClick = {():void =>this.openConfirmNotification()}><FileDoneOutlined />Finish Creating</Button>
        </Form.Item>
      </Form>
    </div>
)}};

export default CreateTaskForm
