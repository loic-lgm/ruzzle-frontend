import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full bg-gray-50">
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
};

export default Layout;
