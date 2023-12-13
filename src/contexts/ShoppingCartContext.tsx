import {ReactNode, createContext, useState} from "react";
import {Book} from "../pages/Store";
import {ShoppingCart} from "../components/ShoppingCart";
import {useLocalStorage} from "../hooks/useLocalStorage";

type ShoopingCartProviderProps = {
  children: ReactNode;
};

type ShoopingCartContext = {
  cartQuantity: number;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
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

export function ShoopingCartProvider({children}: ShoopingCartProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

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

  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <ShoopingCartContext.Provider
      value={{
        getItemQuantity,
        addToCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoopingCartContext.Provider>
  );
}
