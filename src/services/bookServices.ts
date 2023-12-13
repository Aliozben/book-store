import axios, {AxiosResponse} from "axios";
import {Book} from "../hooks/useSearch";
import {API_ENDPOINT} from "../constants";

export async function getBookByID(id: string) {
  const response = await axios.get<unknown, AxiosResponse<Book>>(
    `${API_ENDPOINT}/${id}`
  );
  return response.data;
}
