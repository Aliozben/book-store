import {Card, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Book} from "../hooks/useSearch";
import {IMAGE_NOT_FOUND} from "../constants";
import {formatCurreny} from "../utils/currencyUtils";

type FeaturedBooksProps = {
  featuredBooks: Book[];
};
export function FeaturedBooks({featuredBooks}: FeaturedBooksProps) {
  return (
    <Card className="shadow ">
      <Card.Header as="h5" className="text-center text-primary">
        Featured Books
      </Card.Header>
      <Row
        md={2}
        lg={3}
        xl={4}
        xxl={5}
        className="g-3 d-flex justify-content-center"
      >
        {featuredBooks.length > 0 ? (
          featuredBooks.map(item => {
            return (
              <Card
                className="h-200 m-5 shadow-sm"
                key={item.id}
                style={{width: "15rem"}}
              >
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
            );
          })
        ) : (
          <Spinner
            className="mt-4 mb-2"
            animation="border"
            variant="secondary"
          />
        )}
      </Row>
    </Card>
  );
}
