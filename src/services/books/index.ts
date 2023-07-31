import { api } from "../api";

export const getBooks = () => {
  try {
    return api.get("/books");
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getBook = (id: any) => {
  try {
    return api.get("/books/" + id);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const postBook = (body: any) => {
  try {
    return api.post("books", { ...body });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getHistory = () => {
  try {
    return api.get("/history");
  } catch (err) {
    return Promise.reject(err);
  }
};

export const putBook = (id: any, body: any) => {
  try {
    return api.put("/books/" + id, { ...body });
  } catch (err) {
    return Promise.reject(err);
  }
};
