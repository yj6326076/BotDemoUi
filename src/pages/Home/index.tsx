import { useEffect } from 'react';
import { useRequest } from 'ice';
import { Table, Button, Card, Form, Row, Col, Input, Pagination } from 'antd';
import { useAntdTable, useSetState } from 'ahooks';
import styles from './index.module.css';
import repo from './services/repo';

export default function Home() {
  const getTableData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: {
      roleType: any;
      userId: any;
      type: any;
    },
  ): Promise<any> => {
    const data = {
      roleType: null,
      type: null,
      userId: null,
    };
    const { roleType } = formData;
    if (roleType) {
      data.roleType = roleType;
    }
    const { type } = formData;
    if (type) {
      data.type = type;
    }
    const { userId } = formData;
    if (userId) {
      data.userId = userId;
    }
    const params = {
      size: pageSize,
      page: current,
      data,
    };
    return repo.queryUser(params);
  };
  const FormItem = Form.Item;
  const [form] = Form.useForm();
  const { pagination, tableProps, search } = useAntdTable(getTableData, {
    form,
  });
  const { submit, reset } = search;
  const reboot = (event) => {
    repo.reboot();
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
              <FormItem label="用户id" {...formLayout} name="userId">
                <Input />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="类型:" {...formLayout} name="type">
                <Input />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="角色:" {...formLayout} name="roleType">
                <Input />
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem className={styles['form-actions']} label=" ">
                <Button type="primary" onClick={submit} style={{ marginRight: 10 }} htmlType="submit">
                  提交
                </Button>
                <Button onClick={reset} style={{ marginRight: 10 }}>
                  重置
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={reboot}>
            重启
          </Button>
        </div>
        <Table {...tableProps} pagination={false} rowKey="id">
          <Table.Column title="用户id" dataIndex="userId" />
          <Table.Column title="类型" dataIndex="type" />
          <Table.Column title="角色" dataIndex="roleType" />
          <Table.Column title="创建时间" dataIndex="creatDate" />
          <Table.Column title="更新时间" dataIndex="lastUpdateDate" />
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
}
