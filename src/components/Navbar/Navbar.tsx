import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import SearchBar from '@/components/Navbar/components/SearchBar';
import UserInfo from '@/components/Navbar/components/UserInfo';
import AuthModal from '@/components/AuthModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled((prev) => {
        if (prev !== isScrolled) {
          return isScrolled;
        }
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleModal = useCallback(() => {
    setAuthModalOpen((prev) => !prev);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-green-500 transition-colors"
          >
            Ruzzle
          </Link>
          <SearchBar />
          {isLoggedIn ? (
            <UserInfo />
          ) : (
            <Button
              className="border-2 border-green-400 bg-tranparent text-gray-900 hover:border-green-500 hover:bg-transparent"
              onClick={handleToggleModal}
            >
              Commencer
            </Button>
          )}
          <AuthModal isOpen={isAuthModalOpen} toggleModal={handleToggleModal} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
