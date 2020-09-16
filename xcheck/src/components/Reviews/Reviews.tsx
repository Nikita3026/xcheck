import React from 'react';
import './Reviews.scss'
import Requests from '../../utils/requests/requests'
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
class Reviews extends React.Component<{},{}> {
  counter = 3;

  state = {
    searchText: '',
    data: [],
    isTasksExist: true,
    numberOfTasksAtPage: 0
  }; 
  componentDidMount = async() : Promise<any> => {
    this.getData((res: Array<{}>) => {
      const numberOfTasks = this.state.numberOfTasksAtPage;
      const newNumberOfTasks = numberOfTasks + this.counter;
      const newArray = res.slice(numberOfTasks, newNumberOfTasks);
      this.changeNumberOfTasksAtPage(newNumberOfTasks);
      this.setState({
        data: newArray,
      })
    });
    /* const reviewRequest = new Requests();
    const reviews = await reviewRequest.getData('reviews')
    this.setState({
      data: reviews
    }) 
    console.log(reviews) */
  };
  changeNumberOfTasksAtPage =(newNumber:number):void =>{
    this.setState({
      numberOfTasksAtPage:newNumber
    });
  }
  sortByAlphabet = (a:string, b:string) => {
    if ( a < b ) return -1;
    if ( b < a ) return 1;
    return 0;
  }
  async getData(callback : Function) : Promise<any>{
    const reviewRequest = new Requests();
    const res = await reviewRequest.getRequest('reviews');
    if(res.data.length === 0) {
      this.setState({
        isTasksExist:false
      })
    } else {
      callback(res.data);
    }
  };
  onLoadMore = () => {
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
  }
  render() {
    return (
      <div className='reviews'>
        <Table dataSource={this.state.data}>
            <Table.Column key="task" 
                title="Task" 
                dataIndex="task"     
                sorter={(a:{task:string},b:{task:string}) => this.sortByAlphabet(a.task,b.task)}
                /* filters={this.getColumnSearchProps} */
                />
            <Table.Column key="score" 
                title="Score" 
                dataIndex="score"
                sorter={(a:any, b:any) => a.score - b.score}/>
            <Table.Column key="deadline" 
                title="Deadline" 
                dataIndex="deadline"
                sorter={(a:any, b:any) => a.deadline - b.deadline}/>
            <Table.Column key="author" 
                title="Author" 
                dataIndex="author"
                sorter={(a:{author:string},b:{author:string}) => this.sortByAlphabet(a.author,b.author)}/>
        </Table>
        <Button className = "loading-more-button" onClick={() =>this.onLoadMore()}>Loading more</Button>
      </div>
    );
  }
}

export default Reviews

