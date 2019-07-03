import axios from 'axios';

import { BookModel } from '../../models/BookModel';

const base_api_url = 'http://127.0.0.1:8000/api/';

export function getBooks(){
    return axios.get(base_api_url + 'books');
}

export function setBook(book){    
    return axios.post(base_api_url + "books", book);
}
