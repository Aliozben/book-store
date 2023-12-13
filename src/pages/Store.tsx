import {Col, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {StoreItem} from "../components/StoreItem";
import {Book, useSearch} from "../hooks/useSearch";
import {useCallback, useEffect, useRef, useState} from "react";
import {FEATURED_BOOK_IDS, PAGINATION_SIZE} from "../constants";
import {FeaturedBooks} from "../components/FeaturedBooks";
import {getBookByID} from "../services/bookServices";

export function Store() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [paginationNumber, setPaginationNumber] = useState<number>(0);

  const {books, error, loading} = useSearch(searchText, paginationNumber);

  useEffect(() => {
    fetchFeaturedBooks(FEATURED_BOOK_IDS)
      .then(books => {
        setFeaturedBooks(books);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  async function fetchFeaturedBooks(ids: string[]) {
    return await Promise.all(ids.map(id => getBookByID(id)));
  }

  const observer = useRef<IntersectionObserver>();
  const lastBookElementRef = useCallback(
    (node: HTMLBodyElement | null) => {
      if (loading) return;
      observer.current;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPaginationNumber(prev => prev + PAGINATION_SIZE);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  function handleSearch(text: string) {
    setSearchText(text);
    setPaginationNumber(0);
  }
  return (
    <>
      <InputGroup className="mt-3">
        <InputGroup.Text>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
        </InputGroup.Text>
        <Form.Control
          onChange={input => {
            handleSearch(input.target.value);
          }}
          value={searchText}
          placeholder="Start Typing for book search.."
        />
      </InputGroup>
      <p className="mb-3 text-muted text-right">
        {searchText && " For more result scroll down."}
      </p>
      {!searchText ? (
        <FeaturedBooks featuredBooks={featuredBooks} />
      ) : (
        <>
          <Row
            md={2}
            lg={3}
            xl={4}
            xxl={5}
            className="g-3 nav justify-content-center"
          >
            {books.length > 0
              ? books.map((book, index) => {
                  if (books.length === index + 1) {
                    return (
                      <Col ref={lastBookElementRef} key={book.id}>
                        <StoreItem {...book} />
                      </Col>
                    );
                  } else {
                    return (
                      <Col key={book.id}>
                        <StoreItem {...book} />
                      </Col>
                    );
                  }
                })
              : !loading && <p className="text-center">No books found.</p>}
            {loading && !error && (
              <Spinner
                className="mt-3"
                animation="border"
                variant="secondary"
              />
            )}
          </Row>
        </>
      )}
    </>
  );
}
