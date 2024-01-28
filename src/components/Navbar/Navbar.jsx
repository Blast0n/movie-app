import './Navbar.css';
import { Tabs } from 'antd';

export default function Navbar({ onChangeNav }) {
  const items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ];
  return (
    <Tabs
      destroyInactiveTabPane
      // eslint-disable-next-line
      size={'large'}
      defaultActiveKey="1"
      items={items}
      onChange={(key) => onChangeNav(key)}
      centered
    />
  );
}
