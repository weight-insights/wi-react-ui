import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Layout() {
  const routes = [
    {
      label: 'Home',
      path: '/'
    },
    {
      label: 'Accordion',
      path: '/accordion'
    },
    {
      label: 'Button',
      path: '/button'
    }
  ];
  return (
    <>
      <NavBar links={routes} />
      <Outlet />
    </>
  );
}
