export type Brand = {
  id: number;
  name: string;
};

export type Brands = Brand[];

export type BrandInput = number | { name: string; isNew: true };