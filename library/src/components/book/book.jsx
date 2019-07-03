import * as React from 'react';
import './assets/styles/styles.css';
import { Redirect } from 'react-router';
import {Grid, Col, Glyphicon, Button, PageHeader, Row, ButtonToolbar} from 'react-bootstrap';
import {State} from './interfaces/State';
import { getBooks } from '../Service';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { BookModel } from "../../../models/BookModel";

class BooksList extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        books: [],
        book: {
          name: '',
          email: ''
        }
    }

    this.fillTable = this.fillTable.bind(this);
  }

  componentDidMount(){
    this.fillTable();
  }


  fillTable = () => {
    getUsers().then(response=>{     
      this.setState({
        books:response.data
      });
    }).catch(error=>{
      console.log(error);
    });
  }

  /*handleShowCreate = () => {
    this.setState({
      showUpdate: false,
      showCreate: true
    });
  }*/

  
  render() {
      
    return (
      <Grid className="wraper">
        <Row>
          <Col sm={12} md={12} lg={12}>
            <Button onClick={() => this.handleShowCreate()} style={{background: '#0087ff', color:'white', float: 'right', marginRight: 120}}>Invite User <Glyphicon glyph="plus" className="buttonIcon"/></Button>
          </Col>
        </Row>
        <Row className="tableWrapper">
          <Col>
            <BootstrapTable pagination={true} data={this.state.books} bordered condensed hover keyField='id_book' tableStyle={{textAlign:'center'}}>
              <TableHeaderColumn dataField='name' dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                Name
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default BooksList;