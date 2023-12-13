import {Card} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {Book} from "../hooks/useSearch";
import {IMAGE_NOT_FOUND} from "../constants";
import {formatCurreny} from "../utils/currencyUtils";
import {ShoppingButtons} from "./ShoppingButtons";

export function StoreItem(item: Book) {
  const navigate = useNavigate();

  return (
    <Card className="h-100" style={{width: "15rem"}}>
      <Link to={`/item/${item.id}`}>
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
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title
          onClick={() => {
            navigate(`../item/${item.id}`);
          }}
          className="d-flex flex-column"
        >
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
        <ShoppingButtons item={item} />
      </Card.Body>
    </Card>
  );
}
