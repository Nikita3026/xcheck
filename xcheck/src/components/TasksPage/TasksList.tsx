import React from 'react'
import { List, Avatar, Button, Skeleton } from 'antd'
import Requests from '../../utils/requests/requests'
import API from '../../utils/API'
import {
  AimOutlined,
  CarryOutOutlined,
  EditOutlined
} from '@ant-design/icons'
import './TasksList.scss'

/*const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`; */

interface State {
  initLoading: boolean,
  loading: boolean,
  data: Array<{}>,
  list: Array<{}>,
  numberOfTasksAtPage:number
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
    numberOfTasksAtPage:0
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
    callback(res.data);
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
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={() =>this.onLoadMore()}>loading more</Button>
        </div>
      ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item:taskObject) =>(
          <List.Item
            actions={[<a key="list-loadmore-edit"><EditOutlined /></a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={this.state.loading} active>
              <List.Item.Meta
                avatar={<CarryOutOutlined />}
                title={<a href="https://ant.design">{item.id}</a>}/>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}

export default TasksList
