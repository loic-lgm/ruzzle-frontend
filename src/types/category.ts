export type Category = {
  id: number;
  name: string;
};

export type Categories = Category[];

export type CategoryInput = number | { name: string; isNew: true };
