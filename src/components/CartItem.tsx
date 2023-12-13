import {Stack} from "react-bootstrap";
import {useShoppingCart} from "../hooks/useShoppingCart";
import {formatCurreny} from "../utils/currencyUtils";

type CartItemProps = {
  id: string;
  quantity: number;
};
export function CartItem({id, quantity}: CartItemProps) {
  const {cartItems, removeFromCart} = useShoppingCart();
  const item = cartItems.find(i => i.id === id);

  if (!item || !item.saleInfo.listPrice) return null;

  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={item.volumeInfo.imageLinks?.smallThumbnail}
        style={{maxHeight: "8rem", objectFit: "fill"}}
      />
      <div className="me-auto">
        <div>
          {item.volumeInfo.title}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{fontSize: ".65rem"}}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{fontSize: ".75rem"}}>
          {formatCurreny(item.saleInfo.listPrice.amount)}
        </div>
      </div>
      <div>{formatCurreny(item.saleInfo.listPrice.amount * quantity)}</div>
      <button
        onClick={() => {
          removeFromCart(item.id);
        }}
        className="btn btn-danger btn-sm"
      >
        x
      </button>
    </Stack>
  );
}
