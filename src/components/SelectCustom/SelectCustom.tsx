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
import { Condition, FilterTypes, PieceCount } from '@/types/puzzle';

interface SelectCustomProps {
  data: Array<Category | Brand | City | PieceCount | Condition>;
  label: string;
  type: keyof FilterTypes;
  onChange: (type: keyof FilterTypes, value: string) => void;
  className?: string;
  onlyLabel?: boolean;
}

const SelectCustom = ({
  label,
  onlyLabel = false,
  data,
  onChange,
  type,
  className,
}: SelectCustomProps) => {
  return (
    <Select onValueChange={(value) => onChange(type, value)}>
      <SelectTrigger
        className={`w-full border-lightblue/30 focus:border-green-500 ${className}`}
      >
        <SelectValue
          placeholder={
            onlyLabel ? label : `Choisir une ${label.toLocaleLowerCase()}`
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
        </SelectGroup>
        {data.map((item: Category | Brand | City | PieceCount | Condition) => (
          <SelectItem key={item.id} value={item.id.toString()}>
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
