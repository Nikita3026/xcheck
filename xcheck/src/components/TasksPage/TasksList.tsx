import React from 'react'
import { List, Avatar, Button, Skeleton } from 'antd'
import Requests from '../../utils/requests/requests'
import API from '../../utils/API'

/*const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`; */

interface State {
  initLoading: boolean,
  loading: boolean,
  data: Array<{}>,
  list: Array<{}>
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
    list:  []
  };

  componentDidMount() : void {
    this.getData((res: Array<{}>) => {
      this.setState({
        initLoading: false,
        data: res,
        list: res
      })
    });
  }

  async getData(callback : Function) : Promise<any>{
    const res = await API.get('tasks');
    callback(res.data);
  };

  onLoadMore():void{
    const listAdditional : Array<{}> = [...new Array(this.count)].map(() => ({ loading: true, name: {} }));
    const newList : Array<{}> = this.state.data;
    listAdditional.map((item:object) => {
      newList.push(item);
    });
    this.setState({
      loading: true,
      list: newList
    });
    this.getData((res : Array<{}>) => {
      const tempData: Array<{}> = this.state.data;
      res.map((item:object) => {
        tempData.push(item);
      })
      const data = tempData;
      this.setState(
        {
          data,
          list: data,
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
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={this.state.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.id}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}

export default TasksList
