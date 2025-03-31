import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

const NewRecipePage = () => {
    const [food, setItem] = useState({
        item: '',
        protein: '',
        fat: '',
        carbs: '',
        image:'',
        note:''
      });
      const navigate = useNavigate();
    
      const handleChange = e => {
        setItem({ ...food, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async e => {
        e.preventDefault();
        await axios.post('https://groceries2backend.onrender.com/items', food, { withCredentials: true });
        navigate('/home');
      };
      
      return (
        <Container className="mt-4"> 
        <h3 className='ms-2 mt-2 fs-5'>Add your favorite recipes below and they'll display on your home page.</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Item</Form.Label>
            <Form.Control type="text" name="item" placeholder="Item" onChange={handleChange} />
          </Form.Group>
    
          <Form.Group>
            <Form.Label>Protein</Form.Label>
            <Form.Control type="text" name="protein" placeholder="Protein(grams)" onChange={handleChange} />
          </Form.Group>
    
          <Form.Group>
            <Form.Label>Fat</Form.Label>
            <Form.Control type="text" name="fat" placeholder="Fat(grams)" onChange={handleChange} />
          </Form.Group>
    
          <Form.Group>
            <Form.Label>Carbs</Form.Label>
            <Form.Control type="text" name="carbs" placeholder="Carbs(grams)" onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" name="image" placeholder="Add your food Image URL" onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Note</Form.Label>
            <Form.Control type="text" name="note" placeholder="Add your recipe directions here" onChange={handleChange} />
          </Form.Group>
    
          <Button variant="primary" type="submit">
            Add item
          </Button>
        </Form>
        </Container>
      )
}

    export default NewRecipePage