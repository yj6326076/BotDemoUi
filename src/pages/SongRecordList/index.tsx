import SongList from './components/SongList';
import { Col, Row, Progress } from 'antd';

export default function () {
  return (
    <div className="SongList-page">
      <Progress percent={50} size="small" status="active" type="circle" />
      <br />
      <a>
        剩余时间:50
      </a>
      <Row>
        <Col span={12}>
          {/* dialog table */}
          <SongList />
        </Col>
        <Col span={12}>
          {/* dialog table */}
          <SongList />
        </Col>
      </Row>
    </div>
  );
}
