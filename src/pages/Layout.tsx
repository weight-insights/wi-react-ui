import { Outlet } from 'react-router-dom';
import WiMenu from '../components/WiMenu';

export default function Layout() {
  return (
    <>
      <Outlet />
      <WiMenu />
    </>
  );
}
