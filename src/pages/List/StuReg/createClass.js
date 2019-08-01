import React from 'react';
import 'antd/dist/antd.css';
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Cascader,
} from 'antd';
import MyUpload from './Upload';
import moment from "moment";

/**
 * @author 翟浩翔 
 * @fileoverview 培训班管理_班级管理__新建培训班
 * @Time 2019-7-12~15
 * @copyright 中移铁通陕西分公司
 */

const { RangePicker } = DatePicker;
const { Option } = Select;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const options = [
        {
          value: 'Province',
          label: '省分',
        },
        {
          value: 'City',
          label: '地市',
          children: [
            {
              value: 'Xian',
              label: '西安',
            },
            {
              value: 'XianYang',
              label: '咸阳',
            },
            {
              value: 'BaoJi',
              label: '宝鸡',
            },
            {
              value: 'WeiNan',
              label: '渭南',
            },
            {
              value: 'YuLin',
              label: '榆林',
            },
            {
              value: 'YanAn',
              label: '延安',
            },
            {
              value: 'TongChuan',
              label: '铜川',
            },
            {
              value: 'ShangLuo',
              label: '商洛',
            },
            {
              value: 'AnKang',
              label: '安康',
            },
            {
              value: 'HanZhong',
              label: '汉中',
            }
          ],
        }
      ];

      return (
        <Modal
          visible={visible}
          title="新建培训班"
          okText="创建"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="inline">
            <Form.Item label="培训班级别:">
              {getFieldDecorator('CC_Rank', {
                rules: [{ required: true, message: '请选择培训班级别' }],
              })(
                <Cascader
                  showSearch
                  style={{ width: 200 }}
                  placeholder="选择培训班级别"
                  options={options}
                />
              )}
            </Form.Item>

            <Form.Item label="年度计划:">
              {getFieldDecorator('CC_YearPlan', {
                rules: [{ required: true, message: '请选择年度计划' }],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择年度计划"
                >
                  <Option value="InPaln">计划内</Option>
                  <Option value="OutPlan">计划外</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label="培训班名称:">
              {getFieldDecorator('CC_ClassName', {
                rules: [{ required: true, message: '请输入培训班名称!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="负责人姓名:">
              {getFieldDecorator('CC_Name', {
                rules: [{ required: true, message: '请输入讲师姓名!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="负责人手机号:">
              {getFieldDecorator('CC_Phone', {
                rules: [{ required: true, message: '请输入手机号!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="课时数">
              {getFieldDecorator('CC_Hour')(<Input type="textarea" />)}
            </Form.Item>

            <Form.Item label="培训起始日期:">
              {getFieldDecorator('CC_StartDate')(<DatePicker />)}
            </Form.Item>

            <Form.Item label="培训结束日期:">
              {getFieldDecorator('CC_EndDate')(<DatePicker />)}
            </Form.Item>

            <Form.Item label="报名截止日期:">
              {getFieldDecorator('CC_StopDate')(<DatePicker />)}
            </Form.Item>

            <Form.Item label="上传通知及参陪人员名单">
              {getFieldDecorator('MemberForm')(<MyUpload />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class CreateClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      CC_ClassName: '',
      CC_YearPlan: '',
      CC_Name: '',
      CC_Phone: '',
      CC_Rank: '',
      CC_StartDate: '',
      CC_EndDate: '',
      CC_Hour: '',
      CC_StopDate: '',
    };
  }

  showModal = () => {
    this.setState({ visible: true });
    console.log(this.state.visible);//false
  };

  handleCancel = () => {
    this.setState({ visible: false });
    console.log(this.state.visible);//true
  };

  handleCreate = () => {
    var dataform;
    const form = this.formRef.props.form;
    form.validateFields(
      (err, values) => {
        if (err) {
          return;
        }
        console.log(values);//打印表单值

        form.resetFields();
        this.setState({
          visible: false,
        });
        console.log(this.state.visible);//返回true

        dataform = values//将表单的数据传递
      });
      
    if (dataform != null) {
      let s1 = dataform.CC_ClassName;//培训班名称
      let s2 = dataform.CC_YearPlan;//年度计划
      let s3 = dataform.CC_Name;//负责人姓名
      let s4 = dataform.CC_Phone;//负责人手机
      let s5 = dataform.CC_Rank;//培训等级
      let s6 = moment(dataform.CC_StartDate).format('YYYY-MM-DD');//开始日期
      let s7 = moment(dataform.CC_EndDate).format('YYYY-MM-DD');//结束日期
      let s8 = dataform.CC_Hour;//课时数
      let s9 = moment(dataform.CC_StopDate).format('YYYY-MM-DD');//截止日期
      this.query(s1, s2, s3, s4, s5, s6, s7, s8, s9);//带参执行query并响应后台
    } else {
      alert("请完成填写!");
    }
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  fetchWithPost(url, s1, s2, s3, s4, s5, s6, s7, s8, s9) {

    //参数格式: "a=1&b=2&c=3"
    let postData = 's1=' + s1 + '&s2=' + s2 + '&s3=' + s3 + '&s4=' + s4 + '&s5=' + s5 + '&s6=' + s6 + '&s7=' + s7 + '&s8=' + s8 + '&s9=' + s9;
    console.log(postData);

    let options = {
      method: 'POST',
      body: postData,
      headers: {
        // 请求头
        //'Accept': 'application/json',//非必须
        'Content-Type': 'application/x-www-form-urlencoded', //必须,不能是application/json
      },
    };

    fetch(url, options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          datasearch: data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  query(s1, s2, s3, s4, s5, s6, s7, s8, s9) {
    const url = 'http://122.77.240.123:9201/asmx/trainManage.asmx/trainClass_insert'; //带参数

    console.log(s1);//返回s1的结果

    // this.fetchWithPost(url2, s1, s2, s3, s4, s5);
    this.fetchWithPost(url, s1, s2, s3, s4, s5, s6, s7, s8, s9);

    this.state.flag = false;
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          新建培训班
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CreateClass;
