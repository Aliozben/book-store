import Axios, {AxiosResponse, Canceler} from "axios";
import {useEffect, useState} from "react";
import {API_ENDPOINT, PAGINATION_SIZE} from "../constants";

// Only if saleability set to FOR_SALE, listPrice is defined by API.
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

export function useSearch(query: string, paginationNumber: number) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    try {
      setLoading(true);
      setError(false);
      let cancel: Canceler;
      Axios.get<unknown, AxiosResponse<{totalItems: number; items: Book[]}>>(
        API_ENDPOINT,
        {
          params: {
            q: query,
            startIndex: paginationNumber,
            maxResults: PAGINATION_SIZE,
          },
          cancelToken: new Axios.CancelToken(c => (cancel = c)),
        }
      )
        .then(res => {
          if (res.data.totalItems === 0) {
            throw new Error("No books found with the given text");
          }
          if (!(res.data.items instanceof Array)) {
            setError(true);
            return;
          }
          setBooks(prevBooks => [...prevBooks, ...res.data.items]);
          setLoading(false);
          setError(false);
        })
        .catch(err => {
          if (Axios.isCancel(err)) return;
          console.error("coudln't search the given text", err);
          setError(true);
        });
      return () => {
        cancel();
      };
    } catch (error) {
      setError(true);
      console.error("couldn't search the given text...", error);
    }
  }, [query, paginationNumber]);

  return {loading, error, books};
}
