'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, User, Order, Address } from '../types';

interface AppState {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  addresses: Address[];
  theme: 'light' | 'dark';
  searchQuery: string;
  selectedCategory: string;
  showLoginModal: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; variant?: any } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; variantId?: string } }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; variantId?: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'TOGGLE_THEME' }
  | { type: 'ADD_ADDRESS'; payload: Address }
  | { type: 'UPDATE_ADDRESS'; payload: Address }
  | { type: 'SHOW_LOGIN_MODAL' }
  | { type: 'HIDE_LOGIN_MODAL' };

const initialState: AppState = {
  user: null,
  cart: [],
  orders: [],
  addresses: [],
  theme: 'light',
  searchQuery: '',
  selectedCategory: 'all',
  showLoginModal: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(
        item => item.product.id === action.payload.product.id && 
                item.variant?.id === action.payload.variant?.id
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.product.id && 
            item.variant?.id === action.payload.variant?.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      
      return {
        ...state,
        cart: [...state.cart, { 
          product: action.payload.product, 
          quantity: action.payload.quantity,
          variant: action.payload.variant 
        }],
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => 
          !(item.product.id === action.payload.productId && 
            item.variant?.id === action.payload.variantId)
        ),
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId && 
          item.variant?.id === action.payload.variantId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    
    case 'ADD_ADDRESS':
      return { ...state, addresses: [...state.addresses, action.payload] };
    
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.map(addr =>
          addr.id === action.payload.id ? action.payload : addr
        ),
      };
    
    case 'SHOW_LOGIN_MODAL':
      return { ...state, showLoginModal: true };
    
    case 'HIDE_LOGIN_MODAL':
      return { ...state, showLoginModal: false };
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}