import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useCallback, useState } from 'react';
import { Outlet } from 'react-router';

const Layout = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const handleToggleModal = useCallback(() => {
      setAuthModalOpen((prev) => !prev);
    }, []);
  return (
    <>
      <Navbar handleToggleModal={handleToggleModal}/>
      <Outlet />
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} toggleModal={handleToggleModal} />
    </>
  );
};

export default Layout;
