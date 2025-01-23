import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Form, Col, Row, Button } from 'react-bootstrap';

const Datatableadd = ({ refreshGrocers }) => {
  const [groceries, setGroceries] = useState({
    grocery: "",
    cost: "",
    type: "",
    expiration: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroceries({
      ...groceries,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://groceries2backend.onrender.com/groceries', groceries);
      setGroceries({
        grocery: '',
        cost: '',
        type: '',
        expiration: ''
      });
      await refreshGrocers(); // Refresh grocers
      navigate('/home');
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Container>
      <Form className="info-container" onSubmit={handleSubmit}>
        <Row>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Grocery</Form.Label>
              <Form.Control
                type="text"
                id='grocery'
                name="grocery"
                placeholder="Grocery"
                value={groceries.grocery}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="text"
                id='cost'
                name="cost"
                placeholder="Cost"
                value={groceries.cost}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                id='type'
                name="type"
                placeholder="Type"
                value={groceries.type}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Expiration</Form.Label>
              <Form.Control
                type="text"
                id='expiration'
                name="expiration"
                placeholder="Expiration"
                value={groceries.expiration}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button md={2} className='add btn-sm w-25 mt-3' type='submit'>ADD</Button>
      </Form>
    </Container>
  );
};

export default Datatableadd;
