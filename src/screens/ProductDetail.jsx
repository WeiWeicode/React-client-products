import React, { useEffect, useState } from 'react'
import { Card, Button, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {

  const { id } = useParams()
  const navigate = useNavigate();

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [productDescription, setProductDescription] = useState('')
  const [reviews, setReviews] = useState([])
  const [productImage, setProductImage] = useState('')

  // review rating description
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')


  useEffect(() => {

    const getSingleProductData = async () => {
      const { data } = await axios.get(`/api/products/getProductReviews/${id}`)
      console.log(data)

      setTitle(data.title)
      setPrice(data.price)
      setProductDescription(data.description)
      setProductImage(data.image)

      // for reviews
      setReviews(data.review)
    }
    getSingleProductData()

  }, [id])

  // handling Delete

  const handleDelete = async (id) => {
    await axios.delete(`/api/products/${id}`)
    navigate('/products')

  }

  // to add review

  const addPReviewHandler = async (e) => {

    e.preventDefault()

    let review = {
      product_id: id,
      rating: rating,
      description: description
    }
    await axios.post(`/api/products/addReview/${id}`, review)

    navigate(`/products`)
  }

  return (
    <>

      <Container className='mt-5 p-4'>
        <h1>Detail Product</h1>

        <Card className='shadow-lg m-2 p-3 rounded' style={{ width: '18rem' }}>
          <Card.Img src={`http://localhost:3000/${productImage}`} fluid />
          <Card.Body>
            <Card.Title>Title:{title}</Card.Title>
            <Card.Title>Price: ${price}</Card.Title>
            <Card.Text>
              Description: {productDescription}
            </Card.Text>

            <h4>Reviews: </h4><hr />

            {/* 邏輯: 長度大於0 顯示資料 否則顯示NO reviews  */}
            {reviews.length > 0 ? (
              reviews.map(review => {
                return <p key={review.id}>Rating: {review.rating} <br /> {review.description}</p>
              })
            ) : (<p>No reviews for this product</p>)}

            <Link to={`/product/edit/${id}`}>
              <Button>Edit</Button>
            </Link>

            <Link to={`/product/${id}`}>
              <Button className="btn btn-danger m-2" onClick={() => handleDelete(id)}>Delete</Button>
            </Link>

          </Card.Body>
        </Card>

      </Container>

      <Container>
        <h2>
          Add Review
        </h2>
        <hr />

        <Form onSubmit={addPReviewHandler}>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              type="number" />
          </Form.Group>



          <Form.Group className="mb-3" controlId="description">
            <Form.Label>description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea" />
          </Form.Group>



          <Button variant="primary" type="submit">
            Add Review
          </Button>
        </Form>
      </Container>


    </>
  )
}

export default ProductDetail