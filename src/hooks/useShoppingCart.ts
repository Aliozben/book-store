import {useContext} from "react";
import {ShoopingCartContext} from "../contexts/ShoppingCartContext";

export function useShoppingCart() {
  return useContext(ShoopingCartContext);
}
