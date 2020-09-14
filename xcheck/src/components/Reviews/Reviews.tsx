import React from 'react';
import './Reviews.scss'
import Requests from '../../utils/requests/requests'
import { Table } from 'antd';

const data: User[] = [
    {
      key: 1,
      task: 'SongBird',
      score: 32,
      deadline: '2020-09-01',
    },
    {
      key: 2,
      task: 'English for kids',
      score: 42,
      deadline: '2020-06-10',
    },
    {
      key: 3,
      task: 'Xcheck',
      score: 23,
      deadline: '2020-09-22',
    },
    {
      key: 4,
      task: 'Fancy weather',
      score: 102,
      deadline: '2020-06-31',
    },
  ];
  interface User {
    key: number;
    task: string;
    score: number;
    deadline: string;
  }
  class Reviews extends React.Component<{},{}> {
    state = {
      searchText: '',
      searchedColumn: '',
    }; 

    async getData() : Promise<any>{
      const reviewRequest = new Requests();
      const data = await reviewRequest.getRequest('tasks')
    }; 
    render() {
      return (
        <Table<User> dataSource={data}>
            <Table.Column key="task" 
                title="Task" 
                dataIndex="task"     
                //{this.getColumnSearchProps('name')}
                //sorter={(str: any) => {str.task.split('').sort().join()}}
                />
            <Table.Column key="score" 
                title="Score" 
                dataIndex="score"
                sorter={(a:any, b:any) => a.score - b.score} />
            <Table.Column key="deadline" 
                title="Deadline" 
                dataIndex="deadline"
                sorter={(a:any, b:any) => a.score - b.score} />
        </Table>
      );
    }
  }

export default Reviews

