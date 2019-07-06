import * as React from 'react';
//import './assets/styles/style.css';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormLabel, Alert, FormGroup, FormControl, ControlLabel, Form, ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
//import { State } from './interfaces/State';
//import { Props } from './interfaces/Props';
import { setBook } from '../../Service';

class CreateBook extends React.Component{

  constructor(props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangePublishedDate = this.handleChangePublishedDate.bind(this);
    this.handleChangeAvailable = this.handleChangeAvailable.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      name: '',
      author: '',
      published_date: '',
      id_category: '',
      available: 1,
      showCreate: this.props.showCreate,
      categories: this.props.categories
    };

    console.log(this.state.showCreate)
  }


  handleClose(){
      this.props.close();
  }

  handleChangeName(e){
    this.setState({
      name: e.target.value
    })
  }

  handleChangeAuthor(e){
    this.setState({
      author: e.target.value
    })
  }

  handleChangeCategory(e){
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index]
    var option =  optionElement.getAttribute('data-id');
    this.setState({
        id_category: option
    })
  }

  handleChangePublishedDate(e){
    this.setState({
      published_date: e.target.value
    })
  }

  handleChangeAvailable(e){
    if(e.target.value == 1){
        this.setState({
          available: true
        })
      }
      else{
        this.setState({
          available: false
        })
      }
  }


  handleSubmit(e){

    e.preventDefault();

    const uuidv4 = require('uuid/v4');


    const newBook = {
      id_book: uuidv4(),
      name : this.state.name,
      author : this.state.author,
      published_date : this.state.published_date,
      id_category: this.state.id_category,
      available: this.state.available
    }

    setBook(newBook).then((response) => {
        this.handleClose(); 
        this.props.fillTable();
      
    }).catch(
      (error)=>{
        //this.props.notify('Oops something went wrong', 'error'); 
        this.handleClose();  
      }
    );

  }

  selectRow() {        
        if (this.state.categories instanceof Array) {
            return this.state.categories.map((object, i)=> {
                try {
                    return <option data-id={object.id_category} value={object.id_category} key={i}>{object.name}</option>;   
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
                <Modal.Title className="App-header">Create Book</Modal.Title>
              </Modal.Header>

              <Modal.Body>

                <FormGroup controlId="formName">
                    <FormLabel>Name:</FormLabel>
                    <FormControl type="text" placeholder="Name" value={this.state.name} onChange={this.handleChangeName} maxLength={50} required />                                    
                </FormGroup>

                <FormGroup controlId="formAutor">
                    <FormLabel>Author:</FormLabel>
                    <FormControl type="text" placeholder="Author" value={this.state.author} onChange={this.handleChangeAuthor} maxLength={50} required />                                    
                </FormGroup>

                <FormGroup controlId="formPublished">
                    <FormLabel>Published Date:</FormLabel>
                    <FormControl type="date" placeholder="Published Date" value={this.state.published_date} onChange={this.handleChangePublishedDate} maxLength={50} required />                                    
                </FormGroup>

                <FormGroup controlId="formCategory">
                    <FormLabel>Category:</FormLabel>
                    <FormControl as="select" onChange={this.handleChangeCategory} required>
                        <option value="" disabled selected>Choose Category</option>
                        {this.selectRow()}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formAvailable">
                  <FormLabel>Available:</FormLabel>
                  <ButtonToolbar>
                      <ToggleButtonGroup type="radio" name="options" defaultValue={1} required>
                          <ToggleButton value={1} onChange={this.handleChangeAvailable}>Yes</ToggleButton>
                          <ToggleButton value={0} onChange={this.handleChangeAvailable}>No</ToggleButton>
                      </ToggleButtonGroup>
                  </ButtonToolbar>
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

export default CreateBook;