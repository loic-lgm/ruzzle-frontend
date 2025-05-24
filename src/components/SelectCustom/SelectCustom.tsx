import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Brand } from '@/types/brand';
import { Category } from '@/types/category';
import { City } from '@/types/city';
import { PieceCount } from '@/types/puzzle';
import { useState } from 'react';

interface SelectCustomProps {
  data: Array<Category | Brand | City | PieceCount>;
  label: string;
  type: string;
}

const SelectCustom = ({ label, data }: SelectCustomProps) => {
  const [, setSelectedItem] = useState<string>('');

  const handleChange = (name: string) => {
    setSelectedItem(name);
  };

  return (
    <Select>
      <SelectTrigger className="w-full border-lightblue/30 focus:border-green-500">
        <SelectValue placeholder={`Choisir une ${label.toLocaleLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
        </SelectGroup>
        {data.map((item: Category | Brand | City | PieceCount) => (
          <SelectItem
            key={item.id}
            value={item.name}
            onClick={() => handleChange(item.name)}
          >
            <div className="flex items-center">
              <span>{item.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCustom;
