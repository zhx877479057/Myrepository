import React from 'react';
import {
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  Cascader,
  Table,
  Popconfirm,
  Icon,
  message
} from 'antd';
import moment from 'moment';
import CreateClass from './createClass';
import Editcolumns from './Editcolumns'

/**
 * @author 翟浩翔
 * @fileoverview 培训班管理_班级管理_搜索选项域
 * @Time 2019-7-11
 * @copyright 中移铁通陕西分公司
 */

  /* 
  const { Column } = Table;  
  const { Option } = Select;
  */

const urlQuery = 'http://122.77.240.123:9201/asmx/trainManage.asmx/trainClassQueryWithParam'; // 查询接口
const urlDel = 'http://122.77.240.123:9201/asmx/trainManage.asmx/trainClass_delete'; // 删除接口

class SearchClass extends React.Component {
  constructor(props) {
    super(props);
    this.query = this.query.bind(this);
    this.state = {
      datasearch: [],
      rank: '',
      city: '',      
      StartDate: '',
      EndDate: '',
      ClassName: '',
      TeacherName: '',
      flag: true,
    };
    this.columns = [
      { title: '序号', dataIndex: 'CD_Id' },
      { title: '培训班名称', dataIndex: 'CD_ClassName' },
      { title: '年度计划', dataIndex: 'CD_YearPlan' },
      { title: '负责人姓名', dataIndex: 'CD_Name' },
      { title: '负责人手机', dataIndex: 'CD_Phone' },
      { title: '培训等级', dataIndex: 'CD_Rank' },
      { title: '地市', dataIndex: 'CD_City' },
      { title: '开始日期', dataIndex: 'CD_StartDate' },
      { title: '结束日期', dataIndex: 'CD_EndDate' },
      { title: '课时数', dataIndex: 'CD_Hour' },
      { title: '状态', dataIndex: 'CD_State' },
      {
        title: '操作',
        dataIndex: '#',
        width: '32%',
        render: (text, record) => (
          <span>
            <Popconfirm
              title="删除不可恢复，你确定要删除吗?"
              onConfirm={() =>
                record.CD_State === '待开始'
                  ? this.onDelete(record.CD_Id) : message.info('只能删除待开始的记录！')
              }
            >
              <a title="删除" className="mgl10">
                {' '}
                <Icon type="delete" />
                删除
              </a>
            </Popconfirm>
            &emsp; 
            <span>
              <Editcolumns 
                record={record}
                rank={record.rank}
                StartData={record.StartDate}
                EndData={record.EndDate}
                ClassName={record.ClassName}
                TeacherName={record.TeacherName}
              />
            </span>
          </span>
        ),
      },
    ];
  }

  onDelete(index) {
    const s1 = index;
    const { datasearch } = this.state;  
    const newData = datasearch.filter(item => item.CD_Id !== index);
    this.setState({ datasearch: newData });
    this.fetchDelete(urlDel, s1);
  }

  // fetch请求写法,使用body: "q=参数q"方式
  fetchDelete = (url, s1) => {
    // const postData = 's1=' + s1;
    const postData = `s1= ${s1}`;

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
    const { rank, city,StartDate, EndDate, ClassName, TeacherName } = this.state;
    console.log(rank);
    console.log(city);  

    let ccity='';
    if (rank==='省分'){
        ccity='省分'
    }
    else if (rank==='地市'){
      ccity=city
    }
    this.fetchQuery(urlQuery, ccity, StartDate, EndDate, ClassName, TeacherName);
    this.state.flag = false;
  }

  // fetch请求写法,使用body: "a=1&b=2&c=3"方式
  fetchQuery(url, s1, s2, s3, s4, s5) {
     // const postData = 's1=' + s1 + '&s2=' + s2 + '&s3=' + s3 + '&s4=' + s4 + '&s5=' + s5;
    const postData = `s1=${s1}&s2=${s2}&s3=${s3}&s4=${s4}&s5=${s5}`; // 最好使用模板字符串格式
    console.log(postData);

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
        console.log(data);
        this.setState({
          datasearch: data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
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

    const { datasearch } = this.state;
    return (
      <div ClassName="Select">
        <Row style={{ padding: 8 }}>
          <Col span={8}>
            培训班级别:
            <Cascader
              showSearch
              style={{ width: 200 }}
              placeholder="选择培训班级别"
              onChange={value => {
                this.setState({
                  rank: value[0],
                  city: value[1]
                });
                console.log(value);
              }}
              options={options}
            />
          </Col>

          <Col span={8}>
            起始日期:
            <DatePicker
              onChange={value => {
                const valueF = moment(value).format('YYYY-MM-DD');
                this.setState({
                  StartDate: valueF,
                });
              }}
            />
          </Col>

          <Col span={8}>
            结束日期:
            <DatePicker
              onChange={value => {
                const valueF = moment(value).format('YYYY-MM-DD');
                this.setState({
                  EndDate: valueF,
                });
              }}
            />
          </Col>
        </Row>

        <Row style={{ padding: 8 }}>
          <Col span={8}>
            培训班名称:
            <Input
              style={{ width: 200 }}
              onChange={e => {
                this.setState({
                  ClassName: e.target.value,
                });
              }}
            />
          </Col>

          <Col span={8}>
            负责人员:
            <Input
              style={{ width: 186 }}
              onChange={e => {
                this.setState({
                  TeacherName: e.target.value,
                });
              }}
            />
          </Col>
          <Col span={3}>
            <Button type="primary" icon="search" onClick={this.query}>
              查询
            </Button>
          </Col>
          <Col span={3}>
            <CreateClass style={{ width: 200 }} />
          </Col>
        </Row>

        {/* <Button type="primary" className="selectedDelete" onClick={this.handleSelectedDelete}>删除所选</Button> */}

        <Table columns={this.columns} dataSource={datasearch} rowKey="CD_Id" />
      </div>
    );
  }
}

export default SearchClass;
