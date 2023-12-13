import {Button, Offcanvas, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useShoppingCart} from "../hooks/useShoppingCart";
import {formatCurreny} from "../utils/currencyUtils";
import {CartItem} from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({isOpen}: ShoppingCartProps) {
  const {closeCart, cartItems} = useShoppingCart();
  const navigate = useNavigate();

  function handleCheckout() {
    closeCart();
    navigate("/checkout");
  }
  return (
    <Offcanvas show={isOpen} onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total:
            {formatCurreny(
              cartItems.reduce((total, cartItem) => {
                return (
                  total +
                  (cartItem.saleInfo.listPrice?.amount ?? 0) * cartItem.quantity
                );
              }, 0)
            )}
          </div>
        </Stack>
        <Stack gap={3} className="mt-3" onClick={handleCheckout}>
          <Button>Checkout</Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
