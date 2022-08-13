import React, { useCallback } from 'react';
import { Button, Select, Input, Form, Table, Card, DatePicker, Pagination, Row, Col } from 'antd';
import { useAntdTable, useSetState } from 'ahooks';
import { config } from 'ice';
import queryString from 'query-string';
import { DownloadOutlined } from '@ant-design/icons';
import repo from '@/pages/Home/services/repo';
import moment from 'moment';

import styles from './index.module.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const getTableData = (
  { current, pageSize }: { current: number; pageSize: number },
  formData: {
    time: any;
    senderId: any;
    name: any;
    status: 'normal' | 'empty' | 'exception';
  },
): Promise<any> => {
  const { time } = formData;
  const data = {
    beginDate: null,
    endDate: null,
    name: null,
    senderId: null,
  };
  if (time && time.length === 2) {
    data.beginDate = time[0];
    data.endDate = time[1];
  }
  const { name } = formData;
  if (name) {
    data.name = name;
  }
  const { senderId } = formData;
  if (senderId) {
    data.senderId = senderId;
  }
  const params = {
    size: pageSize,
    page: current,
    data,
  };
  return repo.queryDanmu(params);
};

interface ColumnWidth {
  name: number;
  senderId: number;
  title: number;
  message: number;
  creatDate: number;
}

interface MultiColState {
  columnWidth: ColumnWidth;
  expandStatus: boolean;
  actionListSpan: number;
}

const defaultColumnWidth: ColumnWidth = {
  name: 140,
  senderId: 140,
  title: 140,
  message: 500,
  creatDate: 140,
};

// Filter区域 默认为收起状态
const defaultExpandStatus = false;
// 展开状态下一共有多少个项
const expandFieldLenth = 5;
// 收起状态下一共有多少项目
const collapseFieldLenth = 3;

const getNextActionListSpan = (expandStatus: boolean): number => {
  const totalFieldLength = expandStatus ? expandFieldLenth : collapseFieldLenth;
  if (totalFieldLength < 3) {
    return 3;
  }
  return (4 - (totalFieldLength % 4)) * 3;
};

const MultiColFilterTable: React.FC = () => {
  const [state, setState] = useSetState<MultiColState>({
    columnWidth: defaultColumnWidth,
    expandStatus: defaultExpandStatus,
    actionListSpan: getNextActionListSpan(defaultExpandStatus),
  });
  const [form] = Form.useForm();
  const { pagination, tableProps, search } = useAntdTable(getTableData, {
    form,
  });
  const { submit, reset } = search;
  const { columnWidth } = state;

  const exportDamu = () => {
    const formData = form.getFieldsValue();
    const data = {
      beginDate: null,
      endDate: null,
      name: null,
      senderId: null,
    };
    const { time } = formData;
    if (time && time.length === 2) {
      data.beginDate = time[0];
      data.endDate = time[1];
    }
    const { name } = formData;
    if (name) {
      data.name = name;
    }
    const { senderId } = formData;
    if (senderId) {
      data.senderId = senderId;
    }
    console.log(form.getFieldsValue());
    const w = window.open('about:blank');
    w.location.href = `//${config.domain}/exportDanm?${queryString.stringify(data)}`;
  };
  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
    <div className={styles.container}>
      <Card>
        <Form className="filter-form" labelAlign="right" form={form} layout="vertical">
          <Row>
            <Col span={6}>
              <FormItem label="斗鱼昵称:" {...formLayout} name="name">
                <Input />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="用户id:" {...formLayout} name="id">
                <Input />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="时间:" {...formLayout} name="time">
                <RangePicker showTime />
              </FormItem>
            </Col>
            <Col span={state.actionListSpan === 9 ? 16 : 4}>
              <FormItem className={styles['form-actions']} label=" ">
                <Button type="primary" onClick={submit} style={{ marginRight: 10 }} htmlType="submit">
                  提交
                </Button>
                <Button onClick={reset} style={{ marginRight: 10 }}>
                  重置
                </Button>
                <Button onClick={exportDamu} type="primary" shape="round" icon={<DownloadOutlined />} style={{ marginRight: 10 }} target="_blank" >
                  导出
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Table {...tableProps} pagination={false} rowKey="id">
          <Table.Column title="姓名" dataIndex="name" width={columnWidth.name} />
          <Table.Column title="发送id" dataIndex="senderId" width={columnWidth.senderId} />
          <Table.Column title="头衔" dataIndex="title" width={columnWidth.title} />
          <Table.Column title="弹幕内容" dataIndex="message" width={columnWidth.message} />
          <Table.Column title="发送时间" dataIndex="creatDate" width={columnWidth.message} />
        </Table>
        <Pagination
          style={{ marginTop: 16, textAlign: 'right' }}
          showTotal={(total) => (
            <>
              共 <a>{total}</a> 个记录
            </>
          )}
          {...pagination}
        />
      </Card>
    </div>
  );
};

export default MultiColFilterTable;
