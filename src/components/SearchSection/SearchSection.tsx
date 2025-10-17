import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Brand } from '@/types/brand';
import { Category } from '@/types/category';
import { User } from '@/types/user';
import { Package, Tag, User2 } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

type CommonProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type SearchSectionProps =
  | ({ type: 'category'; datas: Category[] } & CommonProps)
  | ({ type: 'brand'; datas: Brand[] } & CommonProps)
  | ({ type: 'user'; datas: User[] } & CommonProps);

const SearchSection = ({
  type,
  datas,
  setIsOpen,
  setSearchTerm,
}: SearchSectionProps) => {
  const navigate = useNavigate();
  const typeConfig = {
    user: {
      icon: User2,
      label: 'Utilisateurs',
      bg: 'bg-teal-500/10',
      text: 'text-teal-500',
      subtitle: 'Voir le profil',
      emptyLabel: 'Aucun utilisateur trouvé',
    },
    category: {
      icon: Tag,
      label: 'Mots-clés',
      bg: 'bg-lime-500/10',
      text: 'text-lime-500',
      subtitle: 'Voir les puzzles',
      emptyLabel: 'Aucune catégorie trouvée',
    },
    brand: {
      icon: Package,
      label: 'Marques',
      bg: 'bg-green-500/10',
      text: 'text-green-500',
      subtitle: 'Voir les puzzles',
      emptyLabel: 'Aucune marque trouvée',
    },
  }[type];

  const { icon: Icon, label, bg, text, subtitle, emptyLabel } = typeConfig;

  const handleClick = (value: string | number) => {
    setSearchTerm('');
    setIsOpen(false);
    if (type === 'user') {
      navigate(`/profil/${value}`);
    } else if (type === 'category') {
      navigate(`/puzzles?category=${value}`);
    } else if (type === 'brand') {
      navigate(`/puzzles?brand=${value}`);
    }
  };

  return (
    <div>
      <div className="px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <Icon className="h-3 w-3" />
        <span>{label}</span>
      </div>
      {datas.length === 0 && (
        <div className="px-4 py-3 text-sm text-muted-foreground bg-muted/30 rounded-lg border border-border/40 mx-3 mt-1">
          <p>{emptyLabel}</p>
        </div>
      )}

      {datas.length > 0 &&
        datas.map((data) => (
          <div
            key={data.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() =>
              handleClick(
                type === 'user'
                  ? (data as User).username
                  : (data as Category | Brand).id
              )
            }
          >
            {type === 'user' ? (
              <Avatar className="h-10 w-10 border border-border/20">
                <AvatarImage
                  src={(data as User).image}
                  alt={(data as User).username}
                />
                <AvatarFallback>
                  <User2 className="h-5 w-5 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
            ) : (
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${bg}`}
              >
                <Icon className={`h-5 w-5 ${text}`} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {type === 'user'
                  ? (data as User).username
                  : (data as Category | Brand).name}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {subtitle}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchSection;
