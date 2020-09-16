import React, {Component} from 'react'
import { githubAuth } from './AuthConstants'
import { Modal, Button, Select } from 'antd';
import { GithubFilled } from '@ant-design/icons';
import { SelectValue } from 'antd/lib/select';
const { Option } = Select;

class ModalComponent extends Component<{text:string}, {}> {
    state = { 
      visible: false,
      isRoleSelected: false,
      error: '',
      role: ''
    };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e : React.MouseEvent<HTMLElement>) => {
    if(this.state.isRoleSelected){
        localStorage.role=this.state.role;
        this.setState({
            visible: false,
        });
        window.location.href=githubAuth.githubHref;
    } else this.setState({error: 'Select the role'})
  };

  handleCancel = (e : React.MouseEvent<HTMLElement>) => {
    this.setState({
      visible: false,
    });
  };
  selectHandler = (event : SelectValue) => {
    if (event === 'author' || event === 'student' || event === 'supervizor'){
        this.setState({
            isRoleSelected: true,
            error: '',
            role: event
        });
    }
  }
  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
            <GithubFilled/>
          {this.props.text}
        </Button>
        <Modal
          title="Please select your role"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
            <p className='error-block'>{this.state.error}</p>
            <Select placeholder="Please select your role"
                className='select'
                onChange={ e => this.selectHandler(e) }>
                <Option value="author" >Author</Option>
                <Option value="student">Student</Option>
                <Option value="supervizor">Supervizor</Option>
            </Select>
        </Modal>
      </>
    );
  }
}

export default ModalComponent