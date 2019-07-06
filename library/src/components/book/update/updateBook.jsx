import * as React from 'react';
//import './assets/styles/style.css';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { SelectRow, FormLabel, FormGroup, FormControl, Form, ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import { updateBook, getCategory } from '../../Service';

class UpdateBook extends React.Component{

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
      category_name: '',
      category: [],
      id_category: '',
      available: 1,
      showUpdate: this.props.showUpdate,
      book: this.props.book,
      categories: this.props.categories,
      options: '',
    };
    

  }

  componentDidMount(){
    this.fillCategory();
    this.fillModal();
  }

  fillCategory(){
    getCategory(this.props.book.id_category).then(response=>{  
        this.setState({
            category:response.data
        });
    }).catch(error=>{
      console.log(error);
    });
  }


  fillModal(){
    this.setState({
        name: this.props.book.name,
        author : this.props.book.author,
        published_date : this.props.book.published_date,
        category_name: this.state.category.category_name,
        available: this.props.book.available,
        id_category: this.props.book.id_category,
      });
  }


  handleClose(){
      this.props.close();
  }

  handleChangeName(e){
    console.log(this.state.category);
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
    //console.log(option);
    //console.log(e.target.value);
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

    const book = {
      id_book: this.props.book.id_book,
      name : this.state.name,
      author : this.state.author,
      published_date : this.state.published_date,
      id_category: this.state.id_category,
      available: this.state.available
    }

    updateBook(book.id_book, book).then((response) => {
        this.handleClose(); 
        this.props.fillTable();
      
    }).catch(
      (error)=>{
        this.handleClose();  
      }
    );

  }

  selectRow() {        
        if (this.state.categories instanceof Array) {
            return this.state.categories.map((object, i)=> {
                try {
                    if(object.id_category == this.state.id_category){
                        return <option selected data-id={object.id_category} value={object.name} key={i}>{object.name}</option>; 
                    }
                    else{
                        return <option data-id={object.id_category} value={object.name} key={i}>{object.name}</option>;   
                    }
                      
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
          <Modal show={this.state.showUpdate} onHide={this.handleClose}>

            <Form onSubmit={this.handleSubmit}>
              <Modal.Header>
                <Modal.Title className="App-header">Update Book</Modal.Title>
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
                    <FormControl as="select" defaultValue={this.state.category_name} onChange={this.handleChangeCategory}>
                        {this.selectRow()}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formAvailable">
                  <FormLabel>Available:</FormLabel>
                  <ButtonToolbar>
                      <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.book.available} required>
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

export default UpdateBook;