import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <AuthModal />
    </>
  );
};

export default Layout;
