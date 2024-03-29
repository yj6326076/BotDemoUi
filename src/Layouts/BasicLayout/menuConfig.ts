import { SmileOutlined, HeartOutlined, RadarChartOutlined, SettingOutlined, AudioOutlined } from '@ant-design/icons';

const asideMenuConfig = [
  {
    name: '角色',
    path: '/',
    icon: SettingOutlined,
  },
  {
    name: '别名',
    path: '/dashboard',
    icon: HeartOutlined,
  },
  {
    name: '弹幕',
    path: '/admin',
    icon: RadarChartOutlined,
  },
  {
    name: '点歌平台',
    path: '/songList',
    icon: AudioOutlined,
  },
  {
    name: '404',
    path: '/notFound',
    icon: SmileOutlined,
  },
];

export { asideMenuConfig };
