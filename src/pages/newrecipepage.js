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
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Item</Form.Label>
            <Form.Control type="text" name="item" placeholder="Item" onChange={handleChange} />
          </Form.Group>
    
          <Form.Group>
            <Form.Label>Protein</Form.Label>
            <Form.Control type="text" name="protein" placeholder="Protein" onChange={handleChange} />
          </Form.Group>
    
          <Form.Group>
            <Form.Label>Fat</Form.Label>
            <Form.Control type="text" name="fat" placeholder="Fat" onChange={handleChange} />
          </Form.Group>
    
          <Form.Group>
            <Form.Label>Carbs</Form.Label>
            <Form.Control type="text" name="carbs" placeholder="Carbs" onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" name="image" placeholder="Image URL" onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Note</Form.Label>
            <Form.Control type="text" name="note" placeholder="Note" onChange={handleChange} />
          </Form.Group>
    
          <Button variant="primary" type="submit">
            Add item
          </Button>
        </Form>
        </Container>
      )
}

    export default NewRecipePage