import React, {  } from 'react'

import { Form, Icon, Input, Button} from 'antd';

import axios from 'axios'

class Registry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          username: '',
          password: ''
        }
      }
  
  handleSubmit = e => {
    e.preventDefault();
   
    this.props.form.validateFields((err, values) => {
      if (!err) {
          const { username,password } = this.state
          axios.post('/registry',{username,password}).then(res=>{
                  this.props.history.push('/login')
              
          })
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    console.log( this.props.history)

    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的账户' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入账号"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button"
          style={{marginLeft:30}}
          >
           注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'registry' })(Registry);
