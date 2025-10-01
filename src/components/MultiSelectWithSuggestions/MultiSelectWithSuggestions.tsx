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
import { Categories, CategoryInput } from '@/types/category';
import { MAX_CATEGORIES } from '@/utils/constants';

interface MultiSelectWithSuggestionsProps {
  data: Categories;
  values: CategoryInput[];
  onChange: (value: CategoryInput[]) => void;
  className?: string;
}

const MultiSelectWithSuggestions = ({
  data,
  values,
  onChange,
  className,
}: MultiSelectWithSuggestionsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const availableItems = useMemo(() => {
    const selectedIds = values.filter(
      (v): v is number => typeof v === 'number'
    );
    return data.filter((item) => !selectedIds.includes(item.id));
  }, [data, values]);

  const handleSelect = (val: number) => {
    if (values.length >= MAX_CATEGORIES) return;
    const alreadySelected = values.some(
      (v) => typeof v === 'number' && v === val
    );
    if (!alreadySelected) {
      onChange([...values, val]);
    }

    setInput('');
    setOpen(false);
  };

  const handleRemove = (val: number | { name: string; isNew: true }) => {
    onChange(
      values.filter((v) => {
        if (typeof v === 'number' && typeof val === 'number') return v !== val;
        if (typeof v !== 'number' && typeof val !== 'number')
          return v.name !== val.name;
        return true;
      })
    );
  };

  const handleAddCustomValue = () => {
    if (values.length >= MAX_CATEGORIES) return;
    const newCategory = input.trim();
    if (!newCategory) return;
    onChange([...values, { name: newCategory, isNew: true }]);

    setInput('');
    setOpen(false);
  };

  const getLabel = (value: CategoryInput) => {
    if (typeof value === 'number') {
      const cat = data.find((c) => c.id === value);
      return cat ? cat.name : value;
    } else {
      return value.name;
    }
  };

  return (
    <div className={`w-full space-y-2 ${className}`}>
      <div
        className={`
            flex justify-between flex-wrap gap-2 p-2 border rounded-md min-h-[3rem]
            transition focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2
            mb-0
            ${className}
        `}
      >
        <div className="flex flex-wrap gap-2 items-center">
          {values.length > 0 ? (
            values.map((val) => (
              <Badge
                key={typeof val === 'number' ? val : val.name}
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer group bg-green-500/20"
                onClick={() => handleRemove(val)}
              >
                {getLabel(val)}
                <X
                  className="h-3 w-3 cursor-pointer group-hover:text-green-900"
                  onClick={() => handleRemove(val)}
                />
              </Badge>
            ))
          ) : (
            <span className="text-sm pl-1">Catégories</span>
          )}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="px-2"
              disabled={values.length >= MAX_CATEGORIES}
            >
              + Ajouter
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 w-[250px] popover-center-mobile z-[1000]"
            align="start"
          >
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
                          key={String(item.id)}
                          onSelect={() => handleSelect(item.id)}
                        >
                          {String(item.name)}
                        </CommandItem>
                      ))}
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <span className="text-sm text-muted-foreground">
        Vous pouvez choisir jusqu&apos;à 3 catégories
      </span>
    </div>
  );
};

export default MultiSelectWithSuggestions;
