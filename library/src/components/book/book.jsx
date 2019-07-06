import * as React from 'react';
//import { Redirect } from 'react-router';
import {Container, Col, Button, ButtonGroup, Row, Navbar, Nav, Form, FormControl, OverlayTrigger, ButtonToolbar} from 'react-bootstrap';
import { getBooks, updateBook, deleteBook, getCategories } from '../Service';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import { BookModel } from "../../../models/BookModel";
import CreateBook from './create/createBook';
import UpdateBook from './update/updateBook';

class BooksList extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        books: [],
        categories: [],
        showCreate: false,
        showUpdate: false
        
    }

    this.handleShowCreate = this.handleShowCreate.bind(this);
    this.handleShowUpdate = this.handleShowUpdate.bind(this);
    this.showModalCreate  = this.showModalCreate.bind(this);
    this.showModalUpdate  = this.showModalUpdate.bind(this);
    this.fillTable = this.fillTable.bind(this);

  }

  componentDidMount(){
    this.fillTable();

    getCategories().then(response=>{    
        this.setState({
          categories:response.data
        });
      }).catch(error=>{
        console.log(error);
      });
    
  }


  fillTable = () => {
    getBooks().then(response=>{    
      this.setState({
        books:response.data
      });
    }).catch(error=>{
      console.log(error);
    });
  }

  handleShowCreate = () => {
    this.setState({
      showUpdate: false,
      showCreate: true
    });
  }

  handleShowUpdate = (book) => {
    this.setState({
      showCreate: false,
      showUpdate: true,
      book: book
    });
  }

  handleDelete = (id_book) => {
    deleteBook(id_book).then(response=>{
        document.body.click();
    }).catch(error=>{
        console.log(error);
    });
  
      this.fillTable();
  }

  handleClose = () => {
    this.setState({
      showCreate: false,
      showUpdate: false,
    });
  }

  showModalCreate(){
    try{
        return (<CreateBook fillTable={this.fillTable} close={this.handleClose} showCreate={this.state.showCreate} categories={this.state.categories}/>);  
    }catch(error){
        console.log(error);
    }
    return <div>Not available</div>
  }

  showModalUpdate(){
    try{  
      return (<UpdateBook fillTable={this.fillTable} close={this.handleClose} showUpdate={this.state.showUpdate} book={this.state.book} categories={this.state.categories}/>);  
    }catch(error){
        console.log(error);
    }
    return <div>Not available</div>
  }


  setActionsToolbar(cell, row, formatExtraData, rowIndex) {
    let a = this;
    return (
        <ButtonToolbar>
                <Button variant="primary" onClick={() =>this.handleShowUpdate(this.state.books[rowIndex])}>Update</Button>
     
                <Button variant="danger" onClick={() =>this.handleDelete(row.id_book)}>Delete</Button>
         

        </ButtonToolbar>
    );
    } 
  
  render() {
      
    return (
      <Container className="wraper">

    <h1 style={{textAlign: 'center'}}>Books</h1>

        <Row style={{marginTop: '100', marginBottom: '100'}}>
            <Col>
                <Button variant="success" onClick={() => this.handleShowCreate()} className="mr-2" aria-label="First group" style={{float: 'right'}}>Create Book</Button>
            </Col>
        </Row>

        <br/>

        <div>{this.state.showCreate ? this.showModalCreate() : null}</div>
        <div>{this.state.showUpdate ? this.showModalUpdate() : null}</div>

        <Row className="tableWrapper">
          <Col>
            <BootstrapTable pagination={true} hover data={this.state.books} bordered condensed hover  tableStyle={{textAlign:'center'}} >
              <TableHeaderColumn width='200px' dataField="id_book" isKey>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn width='200px' dataField='name' dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn width='200px'  dataField='author' dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                Author
              </TableHeaderColumn>
              <TableHeaderColumn width='200px'  dataField='published_date' dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                Publisher Date
              </TableHeaderColumn>
              <TableHeaderColumn width='200px'  dataField='available' dataFormat={(cell, row) => {return cell ? 'Available': 'Unavailable'}} dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:"SelectFilter", options:{0:"Unavailable",1:"Available"}}}>
                Available
              </TableHeaderColumn>
              <TableHeaderColumn width='200px'  dataFormat={this.setActionsToolbar.bind(this)} tdStyle={{ textAlign: 'center', margin: 'auto' }} thStyle={{ textAlign: 'center' }}>
                  Actions
               </TableHeaderColumn>
              
            </BootstrapTable>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BooksList;