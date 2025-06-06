import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import SearchBar from '@/components/Navbar/components/SearchBar';
import UserInfo from '@/components/Navbar/components/UserInfo';
import useUserStore from '@/stores/useUserStore';
import { LogIn } from 'lucide-react';
import { useAuthModalStore } from '@/stores/useAuthModalStore';


const Navbar = () => {
  const { open } = useAuthModalStore();
  const [scrolled, setScrolled] = useState(false);
  const user = useUserStore((state) => state.user);

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
          {user ? (
            <UserInfo user={user} />
          ) : (
            <Button
              className="border-2 border-green-400 bg-tranparent text-gray-900 hover:border-green-500 hover:bg-transparent"
              onClick={() => open('login')}
            >
              <LogIn />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
