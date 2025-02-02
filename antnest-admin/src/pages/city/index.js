import React from 'react'
import { Card, Table, Button, Form, Select, Modal, message  } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'

const FormItem = Form.Item
const Option = Select.Option

export default class City extends React.Component{

  state={
    list: [],
    isShowOpenCity: false
  }

  params = {
    page: 1
  }

  componentDidMount() {
    this.requestList()
  }

  // 接口
  requestList =() => {
    let _this = this
    axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      this.setState({
        list: res.result.map((item, index) => {
          item.key = index
          return item
        }),
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current
          _this.requestList()
        })
      })
    })
  }

  handleOpenCity =()=> {
    // 开通城市
    this.setState({
      isShowOpenCity: true
    })
  }

  // 城市开通提交
  handleSubmit =() => {
    let cityInfo = this.cityForm.props.form.getFieldsValue()
    console.log(cityInfo)
    axios.ajax({
      url: '/cityOpen',
      data: {
        params: cityInfo
      }
    }).then((res) => {
      if (res.code === 200) {
        message.success('开通成功')
        this.setState({
          isShowOpenCity: false
        })
        this.requestList()
      }
    })
  }

  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      },
      {
        title: '城市名称',
        dataIndex: 'name'
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(h) {
          return h === 1 ? '停车点' : '禁停区'
        },
      },
      {
        title: '运营模式',
        dataIndex: 'op_mode',
        render(h) {
          return h === 1 ? '自营' : '加盟'
        },
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      },
      {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(h) {
          return h.map((item) => {
            return item.user_name
          }).join(',')
        },
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time'
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
        render: Utils.formateDate
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ]

    return(
      <div>
        <Card>
          <FilterForm/>
        </Card>

        <Card>
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className="content-wrap">
        <Table
          columns={columns}
          dataSource={this.state.list}
          bordered
          pagination={this.state.pagination}/>
        </div>

        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
          onOk={this.handleSubmit}>
            <OpenCityForm wrappedComponentRef={(inst) => {
              this.cityForm = inst
            }}/>
          </Modal>
      </div>
    )
  }
}

class FilterForm extends React.Component{
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {
            getFieldDecorator('city_id')(
              <Select style={{ width:150 }}
              placeholder="全部">
                <Option value="">全部</Option>
                <Option value="1">北京市</Option>
                <Option value="2">天津市</Option>
                <Option value="3">深圳市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="用车模式">
          {
            getFieldDecorator('mode')(
              <Select style={{ width:150 }}
              placeholder="全部">
                <Option value="">全部</Option>
                <Option value="1">指定停车模式</Option>
                <Option value="2">禁停区模式</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="运营模式">
          {
            getFieldDecorator('op_mode')(
              <Select style={{ width:150 }}
              placeholder="全部">
                <Option value="">全部</Option>
                <Option value="1">自营</Option>
                <Option value="2">加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="加盟商授权状态">
          {
            getFieldDecorator('auth_status')(
              <Select style={{ width:150 }}
              placeholder="全部">
                <Option value="">全部</Option>
                <Option value="1">已授权</Option>
                <Option value="2">未授权</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    )
  }
}
FilterForm = Form.create({})(FilterForm)

class OpenCityForm extends React.Component{

  render() {
    const formItemLayout = {
      labelCol:{
        span: 5
      },
      wrapperCol: {
        span: 10
      }
    }

    const { getFieldDecorator } = this.props.form // 取到form中的值 数据绑定
    return(
      <Form layout="horizontal">
        <FormItem label="选择城市" {...formItemLayout}>
          {
            getFieldDecorator('city_id', {
              initialValue: '1' // 初始化值
            })(
              <Select>
                <Option value="1">全部</Option>
                <Option value="2">北京市</Option>
                <Option value="3">天津市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="运营模式" {...formItemLayout}>
          {
            getFieldDecorator('op_mode', {
              initialValue: '1' // 初始化值
            })(
              <Select>
                <Option value="1">自营</Option>
                <Option value="2">加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="用车模式" {...formItemLayout}>
          {
            getFieldDecorator('use_mode', {
              initialValue: '1' // 初始化值
            })(
              <Select>
                <Option value="1">指定停车点</Option>
                <Option value="2">禁停区</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }

}
OpenCityForm = Form.create({})(OpenCityForm)