import {Col, Row} from "react-bootstrap";
import {StoreItem} from "../components/StoreItem";
import {useSearch} from "../hooks/useSearch";

export function Store() {
  const {books} = useSearch("randomSearch", 15);

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
