import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BooksList from './components/book/book';
import BorrowList from './components/borrow/borrow';

export const Main = () => (
    <BrowserRouter>
        <Switch>           
            <Route exact path="/borrows" component={BorrowList} />      
            <Route exact path="/books" component={BooksList} /> 
        </Switch>
    </BrowserRouter>
);