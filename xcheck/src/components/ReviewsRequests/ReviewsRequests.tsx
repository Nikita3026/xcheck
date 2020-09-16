import React, {Component} from "react"
import {Table, Input, Button, Space} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {ColumnsType} from "antd/es/table"
import Requests from "../../utils/requests/requests"

import stringSorter from './stringSorter'

import './ReviewsRequests.scss'

const tempRequests = [
  {
    key: '1',
    name: 'Alexandra Burdina',
    task: 'Songbird',
    status: 'PUBLISHED'
  }, {
    key: '2',
    name: 'Nikita Mikhaduk',
    task: 'X Check App ',
    status: 'DRAFT'
  }, {
    key: '3',
    name: 'Yulia Zaripova',
    task: 'schedule',
    status: 'COMPLETED'
  }, {
    key: '4',
    name: 'Pavlo Tatarskyi',
    task: 'Songbird',
    status: 'PUBLISHED'
  }, {
    key: '5',
    name: 'Iuliia Stetskaia',
    task: 'X Check App ',
    status: 'DRAFT'
  }, {
    key: '6',
    name: 'Sergey Yakushinsky',
    task: 'schedule',
    status: 'COMPLETED'
  },
] //! ВРЕМЕННЫЕ ДЕМО ДАННЫЕ УДАЛИТЬ

interface ReviewsRequestsState {
  tasks: object[]
  loading: boolean
  searchText: string
  searchedColumn: string
}

interface ReviewRequestObject {
  id: string
  crossCheckSessionId: string
  author: string
  task: string
  state: string
  selfGrade: {}
}

interface RecordObject {
  status: string
}


class ReviewsRequests extends Component<{}, ReviewsRequestsState> {
  state = {
    tasks: [],
    loading: true,
    searchText: '',
    searchedColumn: ''
  }

  requests = new Requests

  componentDidMount = async () => {
    this.setState({loading: true})
    const requests = await this.getRequests()
    this.setState({tasks: tempRequests, loading: false})
  }

  getRequests = async () => {
    const res = await this.requests.getRequest('reviewRequests')
    const data = await res.data
    return data.map((request: ReviewRequestObject, index: number) => ({
        key: index++,
        name: request.author,
        task: request.task,
        status: request.state
      })
    )
  }
  searchInput: any
  getColumnSearchProps = (dataIndex:string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }:any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node
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
    filterIcon: (filtered:boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value:any, record:any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible:boolean) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100)
      }
    }
  })

  handleSearch = (selectedKeys:any, confirm:any, dataIndex:any) => {
    confirm()
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    })
  }

  handleReset = (clearFilters:any) => {
    clearFilters()
    this.setState({ searchText: '' })
  }


  render() {
    const {tasks, loading} = this.state

    const columns:ColumnsType<never> = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter:  stringSorter('name'),
        ...this.getColumnSearchProps('name')
      },
      {
        title: 'Task',
        dataIndex: 'task',
        key: 'task',
        sorter:  stringSorter('task'),
        ...this.getColumnSearchProps('task')
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [
          {
            text: 'PUBLISHED',
            value: 'PUBLISHED',
          }, {
            text: 'DRAFT',
            value: 'DRAFT',
          }, {
            text: 'COMPLETED',
            value: 'COMPLETED',
          },
        ],
        filterMultiple: true,
        onFilter: (value: any, record: RecordObject):boolean => record.status.indexOf(value) === 0,
        sorter:  stringSorter('status'),
        sortDirections: ['descend', 'ascend'],
      }
    ]

    return (
      <div className="reviews-request">
        <Table loading={loading} columns={columns} dataSource={tasks}/>
      </div>
    )
  }
}

export default ReviewsRequests

