import * as React from 'react';
//import { Redirect } from 'react-router';
import {Container, Col, Button, ButtonGroup, Row, Navbar, Nav, Form, FormControl, OverlayTrigger, ButtonToolbar} from 'react-bootstrap';
import { getBooks, getUsers, updateBook, deleteBook, getCategories, getBorrows } from '../Service';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import { BookModel } from "../../../models/BookModel";
import CreateBorrow from './create/createBorrow';

class BorrowList extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        books: [],
        users: [],
        borrows: [],
        categories: [],
        showCreate: false
        
    }

    this.handleShowCreate = this.handleShowCreate.bind(this);
    this.showModalCreate  = this.showModalCreate.bind(this);
    this.fillTable = this.fillTable.bind(this);

  }

  componentDidMount(){
    this.fillTable();
    getBooks().then(response=>{    
      this.setState({
        books:response.data
      });
    }).catch(error=>{
      console.log(error);
    });
    
    this.fillTable();
    getUsers().then(response=>{    
      this.setState({
        users:response.data
      });
    }).catch(error=>{
      console.log(error);
    });
    
  }


  fillTable = () => {
    getBorrows().then(response=>{    
      this.setState({
        borrows:response.data
      });
    }).catch(error=>{
      console.log(error);
    });
  }

  handleShowCreate = () => {
    this.setState({
      showCreate: true
    });
  }

  handleDelete = (id_book) => {
      console.log(id_book);
    deleteBook(id_book).then(response=>{
        document.body.click();
    }).catch(error=>{
        console.log(error);
    });
  
      this.fillTable();
  }

  handleClose = () => {
    this.setState({
      showCreate: false
    });
  }

  showModalCreate(){
    try{
        return (<CreateBorrow fillTable={this.fillTable} close={this.handleClose} showCreate={this.state.showCreate} borrows={this.state.borrows} books={this.state.books} users={this.state.users}/>);  
    }catch(error){
        console.log(error);
    }
    return <div>Not available</div>
  }
  
  render() {
      
    return (
      <Container className="wraper">

    <h1 style={{textAlign: 'center'}}>Borrows</h1>

        <Row style={{marginTop: '100', marginBottom: '100'}}>
            <Col>
                <Button variant="success" onClick={() => this.handleShowCreate()} className="mr-2" aria-label="First group" style={{float: 'right'}}>Borrow Book</Button>
            </Col>
        </Row>

        <br/>

        <div>{this.state.showCreate ? this.showModalCreate() : null}</div>

        <Row className="tableWrapper">
          <Col>
            <BootstrapTable pagination={true} hover data={this.state.borrows} bordered condensed hover  tableStyle={{textAlign:'center'}} >
              <TableHeaderColumn width='200px' dataField="id_borrow" isKey>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn width='600px' dataField='u_name' dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn width='600px' dataField='b_name' dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                Book
              </TableHeaderColumn>
              
            </BootstrapTable>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BorrowList;