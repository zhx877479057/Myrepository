import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input, DatePicker, Select, Icon, Popconfirm, message, Cascader } from 'antd';
import moment from "moment";
import MyUpload from './Upload';

/**
 * @author 翟浩翔 
 * @fileoverview 培训班管理_班级管理__新建培训班
 * @Time 2019-7-12~15
 * @copyright 中移铁通陕西分公司
 */

// const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const urlQuery = 'http://122.77.240.123:9201/asmx/trainManage.asmx/trainClassQueryWithParam'; // 查询接口
const urlEdit = 'http://122.77.240.123:9201/asmx/trainManage.asmx/trainClass_edit'

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, record } = this.props;
      const { getFieldDecorator } = form;
      const { CD_Rank, CD_ClassName, CD_YearPlan, CD_Name, CD_Phone, CD_StartDate, CD_EndDate, CD_Hour, CD_StopDate } = record;

      const options = [
        {
          value: '省分',
          label: '省分',
        },
        {
          value: '地市',
          label: '地市',
          children: [
            {
              value: '西安',
              label: '西安',
            },
            {
              value: '咸阳',
              label: '咸阳',
            },
            {
              value: '宝鸡',
              label: '宝鸡',
            },
            {
              value: '渭南',
              label: '渭南',
            },
            {
              value: 'YuLin',
              label: '榆林',
            },
            {
              value: '榆林',
              label: '延安',
            },
            {
              value: '铜川',
              label: '铜川',
            },
            {
              value: '商洛',
              label: '商洛',
            },
            {
              value: '安康',
              label: '安康',
            },
            {
              value: '汉中',
              label: '汉中',
            }
          ],
        }
      ];

      return (
        <Modal
          visible={visible}
          title="修改记录"
          okText="确认"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="inline">
            <Form.Item label="培训班级别:">
              {getFieldDecorator('CC_Rank', {
                rules: [{ type: 'array', required: true, message: '请选择培训班级别' }],
                initialValue: [record.CD_Rank, record.CD_City]
              })(
                <Cascader
                  placeholder="选择培训班级别"
                  options={options}
                />
              )}
            </Form.Item>

            <Form.Item label="年度计划:">
              {getFieldDecorator('CC_YearPlan', {
                rules: [{ required: true, message: '请选择年度计划' }],
                initialValue: CD_YearPlan
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
                initialValue: CD_ClassName,
              })(<Input />)}
            </Form.Item>

            <Form.Item label="负责人姓名:">
              {getFieldDecorator('CC_Name', {
                rules: [{ required: true, message: '请输入讲师姓名!' }],
                initialValue: CD_Name
              })(<Input />)}
            </Form.Item>

            <Form.Item label="负责人手机号:">
              {getFieldDecorator('CC_Phone', {
                rules: [{ required: true, message: '请输入手机号!' }],
                initialValue: CD_Phone
              })(<Input />)}
            </Form.Item>

            <Form.Item label="课时数">
              {getFieldDecorator('CC_Hour', {
                initialValue: CD_Hour
              }
              )(<Input type="textarea" />)}
            </Form.Item>

            <Form.Item label="培训起始日期:">
              {getFieldDecorator('CC_StartDate', {
                initialValue: moment(CD_StartDate, dateFormat)
              }
              )(<DatePicker />)}
            </Form.Item>

            <Form.Item label="培训结束日期:">
              {getFieldDecorator('CC_EndDate', {
                initialValue: moment(CD_EndDate, dateFormat)
              })(<DatePicker />)}
            </Form.Item>

            <Form.Item label="报名截止日期:">
              {getFieldDecorator('CC_StopDate', {
                initialValue: moment(CD_StopDate, dateFormat)
              })(<DatePicker />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class Editcolumns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      rank: '',
      StartDate: '',
      EndDate: '',
      ClassName: '',
      TeacherName: ''
    };
  }

  showModal = () => {
    this.setState({ visible: true });
    // console.log(this.state.visible);//false
    // console.log(this.props.record);
    // console.log(this.props.record.CD_Rank);
    const { record } = this.props;
    // const { CD_Rank, CD_ClassName, CD_YearPlan, CD_Name, CD_Phone, CD_StartDate, CD_EndDate, CD_Hour, CD_StopDate } = record;
    console.log(record.CD_Rank, record.CD_City);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    let dataform;
    const {record} = this.props;// oldID,CD_Id
    const {form} = this.formRef.props;

    form.validateFields(
      (err, values) => {
        if (err) {
          return;
        }
        // console.log(values);//打印表单值

        form.resetFields();
        this.setState({
          visible: false,
        });
        dataform = values;// 将表单的数据传递
      }
    );

    if (dataform != null) {
      const s1 = dataform.CC_ClassName;// 培训班名称
      const s2 = dataform.CC_YearPlan;// 年度计划
      const s3 = dataform.CC_Name;// 负责人姓名
      const s4 = dataform.CC_Phone;// 负责人手机
      const s5 = dataform.CC_Rank;// 培训等级
      const s6 = moment(dataform.CC_StartDate).format('YYYY-MM-DD');// 开始日期
      const s7 = moment(dataform.CC_EndDate).format('YYYY-MM-DD');// 结束日期
      const s8 = dataform.CC_Hour;// 课时数
      const s9 = moment(dataform.CC_StopDate).format('YYYY-MM-DD');// 截止日期

      console.log(`oldID=${record.CD_Id}`);

      this.fetchWithPost(urlEdit, s1, s2, s3, s4, s5, s6, s7, s8, s9, record.CD_Id);
    } else {
      alert("请完成修改填写!");
    }
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  // 参数格式: "a=1&b=2&c=3"
  fetchWithPost=(url, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10)=> {
    // let postData = 's1=' + s1 + '&s2=' + s2 + '&s3=' + s3 + '&s4=' + s4 + '&s5=' + s5 + '&s6=' + s6 + '&s7=' + s7 + '&s8=' + s8 + '&s9=' + s9 + '&s10=' + s10;
    const postData = `s1=${s1}&s2=${s2}&s3=${s3}&s4=${s4}&s5=${s5}&s6=${s6}&s7=${s7}&s8=${s8}&s9=${s9}&s10=${s10}`; // 最好使用模板字符串格式

    const options = {
      method: 'POST',
      body: postData,
      headers: {        // 请求头
        // 'Accept': 'application/json',//非必须
        'Content-Type': 'application/x-www-form-urlencoded', // 必须,不能是application/json
      },
    };

    fetch(url, options)
      .then(response => {return response.json();})
      .then(data => {
        message.info(data.state, 3);
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchQuery=(url, s1, s2, s3, s4, s5)=> {
    // const postData = 's1=' + s1 + '&s2=' + s2 + '&s3=' + s3 + '&s4=' + s4 + '&s5=' + s5;
    const postData = `s1=${s1}&s2=${s2}&s3=${s3}&s4=${s4}&s5=${s5}`; // 最好使用模板字符串格式

    const options = {
      method: 'POST',
      body: postData,
      headers: {
        // 'Accept': 'application/json',//非必须
        'Content-Type': 'application/x-www-form-urlencoded', // 必须,不能是application/json
      },
    };

    fetch(url, options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        message.info(data.state, 3);
      })
      .catch(error => {
        console.log(error);
      });
  }

  query() {
    const { rank, StartDate, EndDate, ClassName, TeacherName } = this.state;
    this.fetchQuery(urlQuery, rank, StartDate, EndDate, ClassName, TeacherName);
    this.state.flag = false;
  }

  render() {
    const {record} = this.props;
    const {visible} = this.state;  
    return (
      <span>
        <Popconfirm
          title="你确认对该条数据进行修改?"
          onConfirm={() => 
            record.CD_State === '待开始' ? this.showModal() : message.info('只能修改待开始的记录！')
          }
        >
          <a title="修改" className="mgl10">
            <Icon type="delete" />修改
          </a>
        </Popconfirm>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          record={record}
        />
      </span>
    );
  }
}

export default Editcolumns;
