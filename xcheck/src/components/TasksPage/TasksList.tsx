import React from 'react'
import { List, Avatar, Button, Skeleton } from 'antd'
import Requests from '../../utils/requests/requests'
import API from '../../utils/API'
import {
  CarryOutOutlined,
  EditOutlined,
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons'
import './TasksList.scss'
import CreateTaskForm from './CreateTaskForm/CreateTaskForm'


interface State {
  initLoading: boolean,
  loading: boolean,
  data: Array<{}>,
  list: Array<{}>,
  numberOfTasksAtPage:number,
  isTasksExist:boolean,
  isCreateTaskFormNeed:boolean
}

interface taskObject {
  id:string,
  author:string,
  state:string,
  categoriesOrder:Array<string>,
  items:Array<object>
}

class TasksList extends React.Component<{}, State> {
  count:number = 3;

  state = {
    initLoading: true,
    loading: false,
    data:  [],
    list:  [],
    numberOfTasksAtPage:0,
    isTasksExist:true,
    isCreateTaskFormNeed:false
  };

  changeNumberOfTasksAtPage =(newNumber:number):void =>{
    this.setState({
      numberOfTasksAtPage:newNumber
    });
  }

  componentDidMount() : void {
    this.getData((res: Array<{}>) => {
      const numberOfTasks = this.state.numberOfTasksAtPage;
      const newNumberOfTasks = numberOfTasks + this.count;
      const newArray = res.slice(numberOfTasks, newNumberOfTasks);
      this.changeNumberOfTasksAtPage(newNumberOfTasks);
      this.setState({
        initLoading: false,
        data: newArray,
        list: newArray
      })
    });
  }

  async getData(callback : Function) : Promise<any>{
    const res = await API.get('tasks');
    if(res.data.length === 0) {
      this.setState({
        isTasksExist:false
      })
    } else {
      callback(res.data);
    }
  };

  onLoadMore():void{
    this.setState({
      loading: true
    });
    this.getData((res : Array<{}>) => {
      const tempData: Array<{}> = [];
      res.map((item:object) => {
        tempData.push(item);
      })
      this.setState(
        {
          data:tempData,
          list: tempData,
          loading: false,
        },
        () => {
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };

  handleCreateFormButtonsClick = () => {
    this.setState({
      isCreateTaskFormNeed:!this.state.isCreateTaskFormNeed
    })
  }

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            marginTop: 40,
            height: 32,
            lineHeight: '32px',
            display:'flex',
            justifyContent:'space-between'
          }}
        >
          <Button className = "add-button" type="primary" icon={<PlusOutlined />} onClick = {this.handleCreateFormButtonsClick}>
            Add
         </Button>
          <Button className = "loading-more-button" onClick={() =>this.onLoadMore()}>Loading more</Button>
        </div>
      ) : null;


    if(!this.state.isTasksExist) return (
      <div className = "empty-tasks-list-message">
        <span>You do not have created tasks, try adding them by clicking on the add button...</span>
        {loadMore}
      </div>
    );

    if(this.state.isCreateTaskFormNeed) {
      return <CreateTaskForm handleExitButtonClick = {this.handleCreateFormButtonsClick}/>
    }

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item:taskObject) =>(
          <List.Item
            actions={[<a className = "additional-link change" key="list-loadmore-edit"><EditOutlined /></a>, <a className = "additional-link more" key="list-loadmore-more">More</a>]}
          >
            <Skeleton avatar title={false} loading={this.state.loading} active>
              <List.Item.Meta
                avatar={<CarryOutOutlined />}
                title={<a className = "tasks-name" href="https://ant.design">{item.id}</a>}/>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}

export default TasksList
