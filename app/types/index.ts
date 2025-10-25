export interface Product {
  id: string;
  name: string;
  category: 'fish' | 'chicken' | 'meat' | 'seafood' | 'eggs' | 'combo';
  price: number;
  originalPrice?: number;
  weight: string;
  image: string;
  description: string;
  inStock: boolean;
  discount?: number;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  weight: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  address: Address;
  createdAt: Date;
}

export interface WalletTransaction {
  createdAt: string;
  updatedAt: string;
  id: number;
  tittle: string;
  amount: number;
  type: 'debit' | 'credit';
  user_wallet_id: number;
  order_wallet_id: number;
  orderDetails: {
    id: number;
    price: number;
    quantity: number;
  };
}

export interface WalletData {
  transactions: WalletTransaction[];
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface WalletResponse {
  error: boolean;
  isLogout: boolean;
  message: string;
  data: WalletData;
  instance: string;
}