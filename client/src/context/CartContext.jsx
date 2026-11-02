import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'dhull-cart';

const initialState = {
  items: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    }
    case 'INCREASE_QTY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case 'DECREASE_QTY': {
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [state.items]);

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  }, []);

  const increaseQty = useCallback((id) => {
    dispatch({ type: 'INCREASE_QTY', payload: id });
  }, []);

  const decreaseQty = useCallback((id) => {
    dispatch({ type: 'DECREASE_QTY', payload: id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const cartItems = state.items;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}