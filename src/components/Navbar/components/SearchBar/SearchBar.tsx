import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  return (
    <div className='flex'>
      <Input
        className='w-100 border-r-transparent rounded-r-none'
        placeholder='Rechercher des puzzles'
      />
      <Button className='rounded-l-none bg-linear-to-r from-green-400 to-teal-500'>
        <Search />
        Rechercher
      </Button>
    </div>
  );
};

export default SearchBar;
