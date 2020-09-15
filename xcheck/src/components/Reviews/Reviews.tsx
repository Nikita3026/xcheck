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
      author: 'Dad'
    },
    {
      key: 2,
      task: 'English for kids',
      score: 42,
      deadline: '2020-06-10',
      author: 'Mom'
    },
    {
      key: 3,
      task: 'Xcheck',
      score: 23,
      deadline: '2020-09-22',
      author: 'Dog'
    },
    {
      key: 4,
      task: 'Fancy weather',
      score: 102,
      deadline: '2020-06-31',
      author: 'Son'
    },
    {
      key: 5,
      task: 'SangBird',
      score: 32,
      deadline: '2020-09-01',
      author: 'Dream'
    },
  ];
  interface User {
    key: number;
    task: string;
    score: number;
    deadline: string;
    author: string;
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
    sortByAlphabet = (a:string, b:string) => {
      if ( a < b ) return -1;
      if ( b < a ) return 1;
      return 0;
    }
    render() {
      return (
        <Table<User> dataSource={data}>
            <Table.Column key="task" 
                title="Task" 
                dataIndex="task"     
                sorter={(a:{task:string},b:{task:string}) => this.sortByAlphabet(a.task,b.task)}
                />
            <Table.Column key="score" 
                title="Score" 
                dataIndex="score"
                sorter={(a:any, b:any) => a.score - b.score} />
            <Table.Column key="deadline" 
                title="Deadline" 
                dataIndex="deadline"
                sorter={(a:any, b:any) => a.deadline - b.deadline} />
            <Table.Column key="author" 
                title="Author" 
                dataIndex="author"
                sorter={(a:{author:string},b:{author:string}) => this.sortByAlphabet(a.author,b.author)}/>
        </Table>
      );
    }
  }

export default Reviews

