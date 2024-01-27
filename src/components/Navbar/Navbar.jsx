import './Navbar.css';
import { Tabs } from 'antd';

export default function Navbar({ onChangeNav }) {
  const items = [
    {
      key: '1',
      label: 'Active',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ];
  return (
    <Tabs destroyInactiveTabPane defaultActiveKey="1" items={items} onChange={(key) => onChangeNav(key)} centered />
  );
}
