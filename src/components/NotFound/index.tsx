import { Link } from 'ice';

export interface Props {
  name: string;
}

const Greeting = ({ name }: Props) => {
  return (
    <div>
      <h2>404</h2>
      <div><Link to="/">管理</Link></div>
      <div><Link to="/dashboard">状态</Link></div>
      <div><Link to="/admin">弹幕</Link></div>
      <div><Link to="/notFound'">未找到</Link></div>
    </div>
  );
};

export default Greeting;
