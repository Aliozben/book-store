import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {API_ENDPOINT} from "../constants";
import {Col, Row} from "react-bootstrap";
import {StoreItem} from "../components/StoreItem";

export type Book = {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
    description: string;
  };
} & (
  | {
      saleInfo: {
        saleability: "FOR_SALE";
        listPrice: {
          amount: number;
          currencyCode: string;
        };
      };
    }
  | {
      saleInfo: {
        saleability: "NOT_FOR_SALE";
        listPrice: undefined;
      };
    }
);

export function Store() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get<unknown, AxiosResponse<{totalItems: number; items: Book[]}>>(
        API_ENDPOINT,
        {
          params: {
            q: "test",
            maxResults: 15,
          },
        }
      )
      .then(res => {
        if (res.data.totalItems === 0) {
          throw new Error("No books found with the given text");
        }
        if (!(res.data.items instanceof Array)) {
          return;
        }
        setBooks(res.data.items);
      })
      .catch(err => {
        console.error("coudln't search the given text", err);
      });
  }, []);

  return (
    <>
      <Row
        md={2}
        lg={3}
        xl={4}
        xxl={5}
        className="g-3 nav justify-content-center"
      >
        {books.map(book => (
          <Col key={book.id}>
            <StoreItem {...book} />
          </Col>
        ))}
      </Row>
    </>
  );
}
