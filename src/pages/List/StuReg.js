import React from 'react';
import { Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SearchClass from './StuReg/SearchClass'

class StuReg extends React.Component {
    render() {
        return (
            <PageHeaderWrapper title='班级管理'>
                <Card>
                    <SearchClass />
                </Card>
            </PageHeaderWrapper>
        );
    }
}
export default StuReg;
