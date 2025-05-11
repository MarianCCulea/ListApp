// types.ts
export type Product = {
    id: number;
    title: string;
    price:number;
    image: string;
    category: string;
  };


export type ProductListScreenProps = {
    id: number;
    title: string;
    price:number;
    image: string;
    category: string;
  };

export type Category = {
  value: string;
  label: string;
};

export type DropdownProps = {
  data: Category[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string;
};