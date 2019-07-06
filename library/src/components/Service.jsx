import axios from 'axios';

//import { BookModel } from '../../models/BookModel';

const base_api_url = 'http://127.0.0.1:8000/api/';

export function getBooks(){
    return axios.get(base_api_url + 'books');
}

export function setBook(book){ 
    return axios.post(base_api_url + "books", book);
}

export function getBook(id_book){ 
    return axios.put(base_api_url + "books", id_book);
}

export function updateBook(id_book, book){ 
    return axios.put(base_api_url + "books/"+id_book, book);
}

export function deleteBook(id_book){ 
    return axios.delete(base_api_url + "books/"+id_book);
}

export function getCategory(id_category){ 
    return axios.get(base_api_url + "categories/"+id_category);
}

export function getCategories(){
    return axios.get(base_api_url + 'categories');
}

export function getBorrows(){
    return axios.get(base_api_url + 'borrows');
}

export function setBorrow(borrow){ 
    console.log(borrow);
    return axios.post(base_api_url + "borrows", borrow);
}

export function getUsers(){
    return axios.get(base_api_url + 'users');
}
