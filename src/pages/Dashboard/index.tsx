import repo from '../Home/services/repo';
import { Table, Button, Card, Form, Row, Col, Input, Pagination } from 'antd';
import { useAntdTable, useSetState } from 'ahooks';
import styles from '../Dashboard/components/index.module.css';

export default function Dashboard() {
  const FormItem = Form.Item;
  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const [form] = Form.useForm();
  const getTableData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: {},
  ): Promise<any> => {
    const params = {
      size: pageSize,
      page: current,
      data: formData,
    };
    return repo.queryNickName(params);
  };

  const { pagination, tableProps, search } = useAntdTable(getTableData, {
    form,
  });

  const { submit, reset } = search;
  return (
    <div>
      <h2>Dashboard page</h2>
      <Card>
        <Form className="filter-form" labelAlign="right" form={form} layout="vertical">
          <Row>
            <Col span={6}>
              <FormItem label="别名" {...formLayout} name="nickname">
                <Input />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="房间类型:" {...formLayout} name="romeType">
                <Input />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="房间号:" {...formLayout} name="romeId">
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
        <Table {...tableProps} rowKey="id">
          <Table.Column title="别名" dataIndex="nickname" />
          <Table.Column title="房间号" dataIndex="romeId" />
          <Table.Column title="房间类型" dataIndex="romeType" />
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
