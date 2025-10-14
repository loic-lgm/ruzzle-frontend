import { Package, Tag, User2 } from 'lucide-react';

interface SearchSectionProps {
  type: 'category' | 'user' | 'brand';
  datas: { name: string }[];
}

const SearchSection = ({ type, datas }: SearchSectionProps) => {
  const typeConfig = {
    user: {
      icon: User2,
      label: 'Utilisateurs',
      bg: 'bg-teal-500/10',
      text: 'text-teal-500',
      subtitle: 'Voir le profil',
    },
    category: {
      icon: Tag,
      label: 'Mot-clés',
      bg: 'bg-lime-500/10',
      text: 'text-lime-500',
      subtitle: 'Voir les puzzles',
    },
    brand: {
      icon: Package,
      label: 'Marques',
      bg: 'bg-green-500/10',
      text: 'text-green-500',
      subtitle: 'Voir les puzzles',
    },
  }[type];

  const { icon: Icon, label, bg, text, subtitle } = typeConfig;

  return (
    <div>
      <div className="px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <Icon className="h-3 w-3" />
        <span>{label}</span>
      </div>
      {datas.length > 0 &&
        datas.map((data) => (
          <div
            key={data.name}
            className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors"
            // onClick={() => handleClick(data)}
          >
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${bg}`}
            >
              <Icon className={`h-5 w-5 ${text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{data.name}</p>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchSection;
