import React, {Component} from 'react'
import { githubAuthConst } from './AuthConstants'
import { Modal, Button, Select, Form } from 'antd';
import { GithubFilled } from '@ant-design/icons';
import { SelectValue } from 'antd/lib/select';
import { TeamOutlined } from '@ant-design/icons';
const { Option } = Select;

class ModalComponent extends Component<{ text:string, isGithubOAuth: Function}, {}> {
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
        window.location.href=githubAuthConst.githubHref;
    } else this.setState({error: 'Select the role'});
    this.props.isGithubOAuth();
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
            <GithubFilled/><a href={githubAuthConst.githubHref}>
          {this.props.text}</a>
        </Button>
        <Modal
          title="Please select your role"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            name="signin"
            id='form'
          >
            <p className='error-block'>{this.state.error}</p>
            <Form.Item
                  name="select"
                  label={<TeamOutlined />}
                  rules={[{
                    required: true,
                    message: 'Please select your role!',
                  },]}
                >
              <Select placeholder="Please select your role"
                  className='select'
                  onChange={ e => this.selectHandler(e) }>
                  <Option value="author" >Author</Option>
                  <Option value="student">Student</Option>
                  <Option value="supervizor">Supervizor</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default ModalComponent
