import { useState, useMemo } from 'react';
import { Plus, X } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brands } from '@/types/brand';

interface SingleSelectWithSuggestionsProps {
  data: Brands;
  value: number | { name: string; isNew: true } | null;
  onChange: (value: number | { name: string; isNew: true } | null) => void;
  className?: string;
}

const SingleSelectWithSuggestions = ({
  data,
  value,
  onChange,
  className,
}: SingleSelectWithSuggestionsProps) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const availableItems = useMemo(() => {
    return data.filter((item) => item.id !== value);
  }, [data, value]);

  const handleSelect = (val: number) => {
    onChange(val);
    setInput('');
    setOpen(false);
  };

  const handleRemove = () => {
    onChange(null);
  };

  const handleAddCustomValue = () => {
    const newBrand = input.trim();
    if (!newBrand) return;
    onChange({ name: newBrand, isNew: true });
    setInput('');
    setOpen(false);
  };

  const getLabel = (val: number | { name: string; isNew: true }) => {
    if (typeof val === 'number') {
      const brand = data.find((b) => b.id === val);
      return brand && brand.name;
    }
    return val.name;
  };

  return (
    <div className={`w-full space-y-2 ${className}`}>
      <div
        className={`
          flex justify-between items-center p-2 border rounded-md min-h-[3rem]
          transition focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2
          ${className}
        `}
      >
        <div className="flex flex-wrap gap-2 items-center">
          {value ? (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 cursor-pointer group bg-lime-500/20"
              onClick={handleRemove}
            >
              {getLabel(value)}
              <X className="h-3 w-3 cursor-pointer group-hover:text-blue-900" />
            </Badge>
          ) : (
            <span className="text-sm pl-1">Marque</span>
          )}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="px-2">
              + Ajouter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[250px] z-[1000]" align="start">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Rechercher ou ajouter..."
                value={input}
                onValueChange={setInput}
              />
              <CommandList>
                <CommandEmpty className="pt-2 px-2">
                  {input.trim().length > 0 && (
                    <Button
                      variant="ghost"
                      className="w-full text-left"
                      onClick={handleAddCustomValue}
                    >
                      <Plus />
                      Ajouter « {input} »
                    </Button>
                  )}
                </CommandEmpty>

                <CommandGroup heading="Suggestions">
                  <div className="max-h-38 overflow-y-auto">
                    {availableItems
                      .filter((item) =>
                        item.name.toLowerCase().startsWith(input.toLowerCase())
                      )
                      .map((item) => (
                        <CommandItem
                          key={item.id}
                          onSelect={() => handleSelect(item.id)}
                        >
                          {item.name}
                        </CommandItem>
                      ))}
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SingleSelectWithSuggestions;
