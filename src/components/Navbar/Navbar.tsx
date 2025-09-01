import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import SearchBar from '@/components/Navbar/components/SearchBar';
import UserInfo from '@/components/Navbar/components/UserInfo';
import useUserStore from '@/stores/useUserStore';
import { CirclePlus, Puzzle, User as UserIcon } from 'lucide-react';
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
        <div className="hidden md:grid md:grid-cols-3 md:items-center md:gap-4">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-green-500 transition-colors"
            >
              Ruzzle
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <SearchBar />
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-green-500 hover:text-green-500"
            >
              <Link to="/ajouter-un-puzzle">
                <CirclePlus />
              </Link>
            </Button>
            <Button variant="ghost">
              <Link to="/puzzles">
                <Puzzle />
              </Link>
            </Button>
            {user ? (
              <UserInfo user={user} />
            ) : (
              <Button
                className="gradient-border-button-cta bg-transparent text-gray-900 hover:bg-transparent"
                onClick={() => open('login')}
              >
                <UserIcon />
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 md:hidden">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-green-500 transition-colors"
            >
              Ruzzle
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-green-500 hover:text-green-500"
              >
                <Link to="/ajouter-un-puzzle">
                  <CirclePlus />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Link to="/puzzles">
                  <Puzzle />
                </Link>
              </Button>
              {user ? (
                <UserInfo user={user} />
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => open('login')}
                  className="text-gray-900"
                >
                  <UserIcon />
                </Button>
              )}
            </div>
          </div>
          <div className="w-full">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
