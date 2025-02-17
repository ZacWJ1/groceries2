import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import * as ReactBootStrap from "react-bootstrap";
import Datatableadd from '../functions/datatableadd';
import Piechart from '../functions/piechart';
import Barchart from '../functions/barchart';
import './homepage.css';

const HomePage = () => {
  const [items, setItems] = useState([]);
   const [grocers, setGroceries] = useState([]);
    const location = useLocation();
     const navigate = useNavigate();
      const [user, setUser] = useState(location.state?.user);
       const [loading, setLoading] = useState(true);
        const fetchGrocers = async () => { const res = await axios.get('https://groceries2backend.onrender.com/groceries',
          { withCredentials: true });
           setGroceries(res.data); };
            useEffect(() => { const fetchUser = async () => {
               try { const response = await axios.get('https://groceries2backend.onrender.com/user', { withCredentials: true });
                if (response.data.user) { setUser(response.data.user); } 
                else { navigate('/login'); }
               } catch (error)
                { navigate('/login'); } };
        const fetchItems = async () => {
        const res = await axios.get('https://groceries2backend.onrender.com/items', { withCredentials: true }); setItems(res.data); };
         const fetchData = async () => { if (!user) {
           await fetchUser(); } await fetchItems(); await fetchGrocers(); setLoading(false); }; fetchData(); }, [user, navigate]);
            if (loading) { return <center><h1>Loading...</h1></center>; } 
            const handleDelete = async (id) => {
               try { await axios.delete(`https://groceries2backend.onrender.com/items/${id}`, { withCredentials: true });
                setItems(items.filter((food) => food._id !== id)); }
                 catch (error) { console.error('Error deleting item', error); } };
                  const handleGroceryDelete = async (id) => {
                     try { await axios.delete(`https://groceries2backend.onrender.com/groceries/${id}`, { withCredentials: true });
                      setGroceries(grocers.filter((grocery) => grocery._id !== id)); // Refresh grocers
   } catch (error) { console.error('Error deleting item', error); } };


  /*const [items, setItems] = useState([]);
  const [grocers, setGroceries] = useState([]);
//above is non home.js stuff
const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(location.state?.user);
    const [loading, setLoading] = useState(!user);

    useEffect(() => { const fetchUser = async () => { try { const response = await axios.get('http://localhost:4444/user', { withCredentials: true }); if (response.data.user) { setUser(response.data.user); } else { navigate('/login'); } } catch (error) { navigate('/login'); } };


//below is non home.js stuff
  const fetchItems = async () => {
    const res = await axios.get('http://localhost:4444/items');
    setItems(res.data);
  };

  const fetchGrocers = async () => {
    const res = await axios.get('http://localhost:4444/groceries');
    setGroceries(res.data);
  };
  const fetchData = async () => { if (!user) { await fetchUser(); } await fetchItems(); await fetchGrocers(); setLoading(false); }; fetchData(); }, [user, navigate]); if (loading) { return <center><h1>Loading...</h1></center>; }
  /*useEffect(() => {
    fetchItems();
    fetchGrocers();
  }, []);*/

  /*const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4444/items/${id}`);
      setItems(items.filter((food) => food._id !== id));
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const handleGroceryDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4444/groceries/${id}`);
      await fetchGrocers(); // Refresh grocers
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };*/

  return (
    <div className='bg bg-cover'>
      <h1 className='text-3xl font-bold underline mt-2'>Welcome to Groceries {user && user.name}</h1>
      <Container>
        <Row>
          <Col md={6}>
            <Piechart grocers={grocers} />
          </Col>
          <Col md={6}>
            <Barchart grocers={grocers} />
          </Col>
        </Row>
      </Container>
      <div>
        <Container>
          <Datatableadd refreshGrocers={fetchGrocers} />
        </Container>
        <Container>
          <ReactBootStrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Grocery</th>
                <th>Cost</th>
                <th>Meal</th>
                <th>Expiration</th>
              </tr>
            </thead>
            <tbody>
              {grocers.map((groceryData) => (
                <tr key={groceryData.id}>
                  <td>{groceryData.grocery}</td>
                  <td>{groceryData.cost}</td>
                  <td>{groceryData.type}</td>
                  <td>{groceryData.expiration}</td>
                  <Button variant="outline-danger" onClick={() => handleGroceryDelete(groceryData._id)}>Delete</Button>
                </tr>
              ))}
            </tbody>
          </ReactBootStrap.Table>
        </Container>
      </div>
      <div className='container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col'>
        <h2 className="font-semibold mb-6">
          {`Keep track of what's in your fridge with ease using your item dashboard.`}
        </h2>
        <Container>
          <Row>
            {items.map((food) => (
              <Col md={4} className="mb-4" key={food._id}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={food.image} alt={food.item} />
                  <Card.Body>
                    <Card.Title>{food.item}</Card.Title>
                    <Card.Text>Protein:{food.protein}g</Card.Text>
                    <Card.Text>Fat: {food.fat}g</Card.Text>
                    <Card.Text>Carbs: {food.carbs}g</Card.Text>
                    <Link to={`/items/${food._id}`}>
                      <Button variant="primary" className="mr-2">Read More</Button>
                    </Link>
                    <Button variant="danger" onClick={() => handleDelete(food._id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div className='dashboards'></div>
    </div>
  );
};

export default HomePage;
