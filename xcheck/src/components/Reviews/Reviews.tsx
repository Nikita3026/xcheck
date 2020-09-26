import React from 'react';
import './Reviews.scss'
import Requests from '../../utils/requests/requests'
import { Table, Button } from 'antd';
interface State{
  data: Array<object>,
  isTasksExist: boolean,
  numberOfTasksAtPage: number,
  initLoading: boolean
}
class Reviews extends React.Component<{},State> {
  counter = 3;
  requests = new Requests()
  state : State= {
    data: [],
    isTasksExist: true,
    numberOfTasksAtPage: 0,
    initLoading: true
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
  };
  changeNumberOfTasksAtPage =(newNumber:number):void =>{
    this.setState({
      numberOfTasksAtPage:newNumber
    });
  }
  async getData(callback : Function) : Promise<any>{
    const res = await this.requests.getRequest('reviews');
    if(res.data.length === 0) {
      this.setState({
        isTasksExist:false
      })
    } else {
      callback(res.data);
    }
    this.setState({initLoading:false})
  };
  onLoadMore = () => {
    this.setState({initLoading:true})
    this.getData((res : Array<{}>) => {
      const tempData: Array<{}> = [];
      res.map((item:object) => {
        return tempData.push(item);
      })
      this.setState(
        {
          data:tempData
        },
        () => {
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  }
  sortByAlphabet = (a:string, b:string) => {
    if ( a < b ) return -1;
    if ( b < a ) return 1;
    return 0;
  }
  sortDate = (a:string, b:string) => {
    const arr_a = a.split('-').reverse();
    const arr_b = b.split('-').reverse();
    const date_a = new  Date(+arr_a[0], +arr_a[1], +arr_a[2]);
    const date_b = new  Date(+arr_b[0], +arr_b[1], +arr_b[2]);
    if ( date_a < date_b ) return -1;
    if ( date_b < date_a ) return 1;
    return 0;
  }
  render() {
    return (
      <div className='reviews'>
        <Table dataSource={this.state.data} 
              loading={this.state.initLoading}>
            <Table.Column key="task" 
                title="Task" 
                dataIndex="task"     
                sorter={(a:{task:string},b:{task:string}) => this.sortByAlphabet(a.task,b.task)}
                />
            <Table.Column key="score" 
                title="Score" 
                dataIndex="score"
                sorter={(a:any, b:any) => a.score - b.score}/>
            <Table.Column key="deadline" 
                title="Deadline" 
                dataIndex="deadline"
                sorter={(a:{deadline:string},b:{deadline:string}) => this.sortDate(a.deadline,b.deadline)}/>
            <Table.Column key="author" 
                title="Author" 
                dataIndex="author"
                sorter={(a:{author:string},b:{author:string}) => this.sortByAlphabet(a.author,b.author)}/>
        </Table>
        <Button className="loading-more-button" onClick={() =>this.onLoadMore()}>Loading more</Button>
      </div>
    );
  }
}

export default Reviews

