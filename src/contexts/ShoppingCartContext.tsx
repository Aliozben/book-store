import {ReactNode, createContext, useContext, useState} from "react";
import {Book} from "../pages/Store";

type ShoopingCartProviderProps = {
  children: ReactNode;
};

type ShoopingCartContext = {
  cartQuantity: number;
  cartItems: CartItem[];
  getItemQuantity: (id: string) => number;
  addToCart: (book: Book) => void;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
};

export type CartItem = Book & {
  quantity: number;
};

export const ShoopingCartContext = createContext({} as ShoopingCartContext);

export function useShoppingCart() {
  return useContext(ShoopingCartContext);
}
export function ShoopingCartProvider({children}: ShoopingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: string) {
    return cartItems.find(item => item.id === id)?.quantity ?? 0;
  }

  function addToCart(book: Book) {
    const newCartItem: CartItem = {...book, quantity: 1};
    setCartItems([...cartItems, newCartItem]);
  }

  function increaseCartQuantity(id: string) {
    setCartItems(currItems => {
      return currItems.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + 1};
        } else {
          return item;
        }
      });
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1};
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id);
    });
  }

  return (
    <ShoopingCartContext.Provider
      value={{
        getItemQuantity,
        addToCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoopingCartContext.Provider>
  );
}
