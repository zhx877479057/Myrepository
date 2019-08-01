import React from 'react';
import {
  Table,
  Popconfirm,
  Icon,
  Button,
  CascaderButton,
  Form,
  Modal,
  Cascader,
  Select,
  Input,
  DatePicker,
  Row,
  Col,
  Card,
  message
} from 'antd';
import 'antd/dist/antd.css';
// import styles from './ClassMana.css';
// import WrappedSearchCourse from '@/components/ClassManaC';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import { connect } from 'dva';

/**
 * @author 翟浩翔
 * @fileoverview 培训班管理_课程管理
 * @Time 2019-7
 * @copyright 中移铁通陕西分公司
 */

const { options } = Cascader;

@connect(({ ClassMana, loading }) => ({
  ClassMana,
  loading: loading.models.ClassMana
}))
@Form.create()
class ClassMana extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      { title: '序号', dataIndex: 'CourseId' },
      { title: '培训班名称', dataIndex: 'ClassName' },
      { title: '课程名称', dataIndex: 'CourseName' },
      { title: '讲师姓名', dataIndex: 'TeacherName' },
      { title: '讲师手机', dataIndex: 'TeacherPhone' },
      // { title: '培训等级', dataIndex: 'CD_Rank' },
      // { title: '开始日期', dataIndex: 'CD_StartDate' },
      // { title: '结束日期', dataIndex: 'CD_EndDate' },
      { title: '课程时长', dataIndex: 'CD_Hour' },
      { title: '状态', dataIndex: 'CD_State' },
      {
        title: '操作',
        dataIndex: '#',
        width: '32%',
        render: (text, record) => (
          <span>
            <Popconfirm
              title="删除不可恢复，你确定要删除吗?"
              onConfirm={() => {
                record.CD_State === '待开始'
                  ? this.onDelete(record.CourseId)
                  : message.info('只能删除待开始的记录！');
              }}
            >
              <a title="删除" className="mgl10">
                {' '}
                <Icon type="delete" />
                删除
              </a>
            </Popconfirm>
            <span>
              <Popconfirm
                title="修改不可恢复，你确定要修改吗?"
                onConfirm={() => {
                  record.CD_State == '待开始'
                    ? this.onDelete(record.CourseId)
                    : message.info('只能删除待开始的记录！');
                }}
              >
                <a title="修改" className="mgl10">
                  {' '}
                  <Icon type="delete" />
                  修改
                </a>
              </Popconfirm>
            </span>
          </span>
        ),
      },
    ];
    this.state = {
      dataSource: this.props.dataSource,
      visible: false,
    };
  }

  onDelete=(CourseId)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'ClassMana/submit',
      payload: { CourseId },
    });
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    const { dispatch } = this.props;

    dispatch({
      type: 'ClassMana/fetch',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  showModal = () => {
    this.setState({ visible: true });
    console.log(this.state.visible); //false
  };

  handleCancel = () => {
    this.setState({ visible: false });
    console.log(this.state.visible); //true
  };

  handleCreate = () => {
    var dataform;
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values); //打印表单值

      form.resetFields();
      this.setState({
        visible: false,
      });
      console.log(this.state.visible); //返回true
      dataform = values; //将表单的数据传递
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { ClassMana: { list } } = this.props;
    console.log(list);
    

    const { currentUserLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
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
          },
        ],
      },
    ];

    //培训班名称选择项
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
    }

    //课程名称选择项
    const children1 = [];
    for (let i = 10; i < 36; i++) {
      children1.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
    }

    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    return (
      <div>
        <PageHeaderWrapper title="课程管理">
          <Card>
          <div>
            <Form layout="inline" className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
              {/* 培训班级别选择器 */}
              <Form.Item label="培训班级别:">
                {getFieldDecorator('Rank', {
                  // rules: [{ required: true, message: '请选择培训班级别!' }],
                })(
                  <Cascader
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择培训班级别"
                    options={options}
                  />
                )}
              </Form.Item>

              {/* 培训班名称选择器 */}
              <Form.Item label="培训班名称:">
                {getFieldDecorator('ClassName', {
                  // rules: [{ required: true, message: '请选择培训班名称!' }],
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择培训班级别"
                    onChange={handleChange}
                  >
                    {children}
                  </Select>
                )}
              </Form.Item>

              {/* 课程选择器 */}
              <Form.Item label="课程名称:">
                {getFieldDecorator('CourseName', {
                  // rules: [{ required: true, message: '请选择课程名称!' }],
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择培训班级别"
                    onChange={handleChange}
                  >
                    {children1}
                  </Select>
                )}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
            </Button>
              </Form.Item>

              <Form.Item>
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
              </Form.Item>
            </Form>
            <Table columns={this.columns} dataSource={list} rowKey="CD_Id" />
          </div>
          </Card>
        </PageHeaderWrapper>
      </div>
    );
  }

}

@Form.create()
class CollectionCreateForm extends React.Component {
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
          },
        ],
      },
    ];
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
    }

    return (
      <Modal
        visible={visible}
        title="创建培训班课程"
        okText="创建"
        onCancel={onCancel}
        onOk={onCreate}
        width={800}
      >
        <Form layout="inline" className="ant-advanced-search-form">
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

          <Form.Item label="培训班名称:">
            {getFieldDecorator('ClassName', {
              rules: [{ required: true, message: '请选择培训班名称' }],
            })(
              <Select showSearch style={{ width: 200 }} placeholder="选择培训班名称">
                {children}
              </Select>
            )}
          </Form.Item>

          <Form.Item>
            <a>查询</a>
          </Form.Item>
        </Form>

        <Form layout="inline" className="ant-advanced-search-form">
          <Row style={{ padding: 8 }}>
            <Col span={8}>
              <Form.Item label="课程名称:">
                {getFieldDecorator('CourseName', {
                  rules: [{ required: true, message: '请输入课程名称!' }],
                })(<Input style={{ width: 200 }} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="讲师姓名:">
                {getFieldDecorator('TeacherName', {
                  rules: [{ required: true, message: '请输入讲师姓名!' }],
                })(<Input style={{ width: 200 }} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="讲师手机号:">
                {getFieldDecorator('TeacherPhone', {
                  rules: [{ required: true, message: '请输入讲师手机号!' }],
                })(<Input style={{ width: 200 }} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="课程开始时间:">
                {getFieldDecorator('StartTime', {
                  rules: [{ required: true, message: '请选择课程开始时间!' }],
                })(<DatePicker showTime placeholder="Select Time" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="课程时长:">
                {getFieldDecorator('CourseHours', {
                  rules: [{ required: true, message: '请输入课程时长!' }],
                })(<Input style={{ width: 200 }} />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default ClassMana;