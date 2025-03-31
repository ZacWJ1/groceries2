import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container,Card } from 'react-bootstrap'



const RecipePage = () => {
    const [food, setItem] = useState({
        item: '',
        protein: '',
        fat: '',
        carbs: '',
        image: '',
        note: ''
      });
    
      const{id}=useParams()
      
      useEffect(() => {
        const fetchItem = async () => {
          const res = await axios.get(`https://groceries2backend.onrender.com/items/${id}`, { withCredentials: true });
          setItem(res.data);
        };
        fetchItem();
      }, [id]);
  return (
    
    <Container className="mt-4">
      
      <Card>
      <div style={{ maxHeight: '500px', overflow: 'hidden' }}>
          <Card.Img className="img-fluid " style="object-fit: cover" variant="top" src={food.image} alt={food.title} />
        </div>
        <Card.Body>
          <Card.Title>{food.item}</Card.Title>
          <Card.Text>Protein: {food.protein}g</Card.Text>
          <Card.Text>Fat: {food.fat}g</Card.Text>
          <Card.Text>Carbs:{food.carbs}g</Card.Text>
          <Card.Text>Note:{food.note}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default RecipePage






    



