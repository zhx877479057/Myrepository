import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Button, Icon } from 'antd';

/**
 * @author 翟浩翔 
 * @fileoverview 培训班管理_班级管理__新建培训班_上传文件
 * @Time 2019-7
 * @copyright 中移铁通陕西分公司
 */

class MyUpload extends React.Component {
  state = {
    fileList: [],
  };

  handleChange = info => {
    let fileList = [...info.fileList];
    console.log(fileList);
    
    // 1. 限制文件上传的数量
    fileList = fileList.slice(-2);

    // 2. 读取文件并相应链接
    fileList = fileList.map(file => {
      if (file.response) {
        // 将文件(file.url)显示为链接
        file.url = file.response.url;
        console.log(file.url);
      }
      return file;
    });

    this.setState({ fileList });
  };

  render() {
    const props = {
      action: '',//上传地址
      onChange: this.handleChange,
      multiple: true,
    };
    return (
      <Upload {...props} fileList={this.state.fileList}>
        <Button>
          <Icon type="upload" /> 上传文件
        </Button>
      </Upload>
    );
  }
}
export default MyUpload;
