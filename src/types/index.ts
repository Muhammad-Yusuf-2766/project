export interface Product {
  id: string;
  name: string;
  category: 'beef' | 'mutton' | 'chicken' | 'bread' | 'other';
  price: number;
  unit: string;
  description: string;
  image: string;
  stock: number;
  sellerId: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'seller';
  avatar?: string;
}

export type CategoryType = 'beef' | 'mutton' | 'chicken' | 'bread' | 'other' | 'all';
