export interface Product {
  id: number;
  name: string;
  stats: Stat[];
  price: number;
}
export interface Stat {
  value: string;
  stat: string;
}
