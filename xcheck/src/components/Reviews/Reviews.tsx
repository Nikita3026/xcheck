import React from 'react';
import Navbar from '../Navbar/Navbar'

import { Table, Input, Button, Space } from 'antd';

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
  class Reviews extends React.Component<{history: object},{}> {
    state = {
      searchText: '',
      searchedColumn: '',
    };  
/*     getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      }); */
    
    render() {
      return (
        //<Navbar history={this.props.history}>
            <Table<User> dataSource={data}>
                <Table.Column key="task" 
                    title="Task" 
                    dataIndex="task"     
                    //{this.getColumnSearchProps('name')}
                    sorter={(str: any) => {str.task.split('').sort().join()}}
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
        //</Navbar>
      );
    }
  }

export default Reviews

