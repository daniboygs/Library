import * as React from 'react';
//import './assets/styles/style.css';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormLabel, Alert, FormGroup, FormControl, ControlLabel, Form, ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import { setBorrow } from '../../Service';

class CreateBorrow extends React.Component{

  constructor(props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeBook = this.handleChangeBook.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      books: this.props.books,
      book: [],
      id_book: this.props.books[0].id_book,
      users: this.props.users,
      user: [],
      id_user: this.props.users[0].id_user,
      borrows: this.props.borrows,
      showCreate: this.props.showCreate
    };

  }


  handleClose(){
      this.props.close();
  }

  handleChangeName(e){

    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index]
    var option =  optionElement.getAttribute('data-id');
    this.setState({
        id_user: option
    })
  }

  handleChangeBook(e){

    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index]
    var option =  optionElement.getAttribute('data-id');
    this.setState({
        id_book: option
    })
  }

  handleSubmit(e){

    e.preventDefault();

    const newBorrow = {
      id_user : this.state.id_user,
      id_book : this.state.id_book
    }

    setBorrow(newBorrow).then((response) => {
        this.handleClose(); 
    }).catch(
      (error)=>{
        //this.props.notify('Oops something went wrong', 'error'); 
        this.handleClose();  
        this.props.fillTable();
      }
    );

  }

  selectRowBook() {        
        if (this.state.books instanceof Array) {
            return this.state.books.map((object, i)=> {
                try {
                    return <option data-id={object.id_book} value={object.name} key={i}>{object.name}</option>;
                } catch (error) {
                    return null;   
                }                
            })
        }
        else {
            return null;
        }
    }

    selectRowUser() {        
        if (this.state.users instanceof Array) {
            return this.state.users.map((object, i)=> {
                try {
                    return <option data-id={object.id_user} value={object.name} key={i}>{object.name}</option>;   
                } catch (error) {
                    return null;   
                }                
            })
        }
        else {
            return null;
        }
    }

  render() {

    return (
      <div>

        <div id="content">
          <Modal show={this.state.showCreate} onHide={this.handleClose}>

            <Form onSubmit={this.handleSubmit}>
              <Modal.Header>
                <Modal.Title className="App-header">Borrow</Modal.Title>
              </Modal.Header>

              <Modal.Body>

                <FormGroup controlId="formCategory">
                    <FormLabel>User:</FormLabel>
                    <FormControl as="select" onChange={this.handleChangeName}>
                        {this.selectRowUser()}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formCategory">
                    <FormLabel>Book:</FormLabel>
                    <FormControl as="select" onChange={this.handleChangeBook}>
                        {this.selectRowBook()}
                    </FormControl>
                </FormGroup>

              </Modal.Body>

              <Modal.Footer>
                <Button variant="danger" onClick={this.handleClose}>Cancel</Button>
                <Button type="submit" variant="primary" >Save</Button>
              </Modal.Footer>
            </Form>

          </Modal>

        </div>
        
      </div>
    );
  }
}

export default CreateBorrow;