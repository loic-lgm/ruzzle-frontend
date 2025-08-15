import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: searchResults = [], isFetching } = useSearch(searchTerm);
  const navigate = useNavigate();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleClick = (username: string) => {
    navigate(`profil/${username}`);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center w-1/2">
      <Search className="absolute left-[10px] z-[99] h-4 w-4 text-muted-foreground transition-colors peer-focus:text-green-500" />
      <Input
        id="searchbar"
        type="text"
        placeholder="Rechercher un membre"
        className="peer pl-10 pr-4 rounded-full border-2 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:bg-background transition-all"
        value={searchTerm}
        onChange={handleValueChange}
      />
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 py-2 bg-background/95 backdrop-blur-md border shadow-lg z-50 max-h-80 overflow-y-auto">
          {searchResults.length > 0
            ? searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleClick(user.username)}
                >
                  <Avatar className="h-10 w-10 border border-border/20">
                    <AvatarImage src={user.image} alt={user.username} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">
                        @{user.username}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.city?.name}
                    </p>
                  </div>
                </div>
              ))
            : !isFetching && (
                <div className="px-2 py-3 text-center text-muted-foreground">
                  <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Aucun utilisateur trouvé</p>
                </div>
              )}
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
