import React from 'react';
import { Main } from './Main';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BooksList from './components/book/book';
import BorrowList from './components/borrow/borrow';
import {Navbar, Nav} from 'react-bootstrap';

export class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      redirect:false
    }
  }
  
  render() {
    return (
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/books'} className="nav-link">Books</Link></li>
            <li><Link to={'/borrows'} className="nav-link">Borrows</Link></li>
          </ul>
          </Navbar>
          <Switch>
              <Route exact path="/borrows" component={BorrowList} />      
              <Route exact path="/books" component={BooksList} /> 
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
