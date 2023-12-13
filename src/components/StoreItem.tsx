import {Card} from "react-bootstrap";
import {Book} from "../pages/Store";
import {IMAGE_NOT_FOUND} from "../constants";
import {formatCurreny} from "../utils/currencyUtils";
import {useShoppingCart} from "../hooks/useShoppingCart";

export function StoreItem(item: Book) {
  const {
    getItemQuantity,
    addToCart,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(item.id);

  return (
    <Card className="h-100" style={{width: "15rem"}}>
      <Card.Img
        variant="top"
        src={
          item.volumeInfo.imageLinks
            ? item.volumeInfo.imageLinks.smallThumbnail
            : IMAGE_NOT_FOUND
        }
        height="200px"
        style={{objectFit: "contain"}}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex flex-column">
          <span className="text-end p-1 fs-6 text-primary">
            {item.saleInfo.listPrice
              ? formatCurreny(
                  item.saleInfo.listPrice.amount,
                  item.saleInfo.listPrice.currencyCode
                )
              : "Not for sale"}
          </span>
          <span className="p-1">{item.volumeInfo.title}</span>
        </Card.Title>
        {item.saleInfo.saleability === "FOR_SALE" && (
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
        )}
      </Card.Body>
    </Card>
  );
}
