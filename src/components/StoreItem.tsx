import {Card} from "react-bootstrap";
import {Book} from "../pages/Store";
import {IMAGE_NOT_FOUND} from "../constants";
import {formatCurreny} from "../utils/currencyUtils";

export function StoreItem(item: Book) {
  return (
    <Card>
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
        </Card.Body>
      </Card>
    </Card>
  );
}
