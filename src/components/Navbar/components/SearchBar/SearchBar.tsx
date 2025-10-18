import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { Card } from '@/components/ui/card';
import SearchSection from '@/components/SearchSection';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: searchResults } = useSearch(searchTerm);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleDelete = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center w-full md:w-full">
      <Search className="absolute left-[10px] z-[99] h-4 w-4 text-muted-foreground transition-colors" />
      <Input
        type="text"
        placeholder="Rechercher par mots-clés, marques, ..."
        className="pl-10 pr-4 rounded-full border-2 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:bg-background transition-all"
        value={searchTerm}
        onChange={handleValueChange}
      />
      {searchTerm && (
        <X
          className="absolute right-[10px] z-[99] h-4 w-4 text-muted-foreground transition-colors cursor-pointer"
          onClick={handleDelete}
        />
      )}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 py-2 bg-background/95 backdrop-blur-md border shadow-lg z-50 max-h-80 overflow-y-auto">
          {searchResults && (
            <>
              <SearchSection
                type="category"
                datas={searchResults.categories}
                setSearchTerm={setSearchTerm}
                setIsOpen={setIsOpen}
              />
              <SearchSection
                type="brand"
                datas={searchResults.brands}
                setSearchTerm={setSearchTerm}
                setIsOpen={setIsOpen}
              />
              <SearchSection
                type="user"
                datas={searchResults.users}
                setSearchTerm={setSearchTerm}
                setIsOpen={setIsOpen}
              />
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
