import {Book} from "../hooks/useSearch";
import {useShoppingCart} from "../hooks/useShoppingCart";

export type ShoppingButtonsProps = {
  item: Book;
};
export function ShoppingButtons({item}: ShoppingButtonsProps) {
  const {
    getItemQuantity,
    addToCart,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(item.id);
  return (
    item.saleInfo.saleability === "FOR_SALE" && (
      <div className="mt-auto">
        {quantity === 0 ? (
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => {
              addToCart(item);
            }}
          >
            + Add To Cart
          </button>
        ) : (
          <div
            className="d-flex align-items-center flex-column"
            style={{gap: ".5rem"}}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{gap: ".5rem"}}
            >
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  decreaseCartQuantity(item.id);
                }}
              >
                -
              </button>
              <div>
                <span className="fs-3">{quantity}</span> in cart
              </div>
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  increaseCartQuantity(item.id);
                }}
              >
                +
              </button>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                removeFromCart(item.id);
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    )
  );
}
