import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Col, Container, Image, Row} from "react-bootstrap";
import {Book} from "../hooks/useSearch";
import {getBookByID} from "../services/bookServices";
import {IMAGE_NOT_FOUND} from "../constants";
import {formatCurreny} from "../utils/currencyUtils";

export function Item() {
  const {itemId} = useParams();
  const [item, setItem] = useState<Book | null>(null);

  useEffect(() => {
    if (!itemId) {
      console.error("Item ID not found.");
      return;
    }

    getBookByID(itemId)
      .then(book => {
        setItem(book);
      })
      .catch(err => {
        console.error(err);
      });
  }, [itemId]);

  return (
    item && (
      <>
        <Container className="container-fluid mt-3">
          <Row>
            <Col className="md-8">
              <Row className="mb-3">
                <Col className="text-center">
                  <Image
                    className="mb-4"
                    src={
                      item.volumeInfo.imageLinks
                        ? item.volumeInfo.imageLinks.thumbnail
                        : IMAGE_NOT_FOUND
                    }
                    fluid
                    thumbnail
                  />
                </Col>
                <Col className="md-7">
                  <Row>
                    <Col>
                      <h1 className="h5 d-inline me-2">
                        {item.volumeInfo.title}
                      </h1>
                      <Row className=" small mb-3">
                        <Col className="sm-3">Availability</Col>
                        <Col className="sm-9">{item.saleInfo.saleability}</Col>
                      </Row>

                      {item.saleInfo.listPrice && (
                        <Row className="mb-3">
                          <span className="fw-bold h5 me-2">
                            {formatCurreny(item.saleInfo.listPrice.amount)}
                          </span>
                        </Row>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <p className="fw-bold mb-2 small">Description</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.volumeInfo.description,
                      }}
                    />
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  );
}
