import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom';

// useNavigate替換useHistory 版本不一樣

const EditProduct = () => {

  const {id} = useParams()

  const navigate = useNavigate();

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  

  useEffect(() => {
    
    const getDataById = async () => {
      const { data } = await axios.get(`/api/products/${id}`)
      setTitle(data.title)
      setPrice(data.price)
      setDescription(data.description)
    }

    getDataById()
  }, [id])

  const updateHandler = async (e) => {
    //  update by put request
    e.preventDefault()
    const data = {
      title: title,
      price: price,
      description: description,
      published: true

    }

    await axios.put(`/api/products/${id}`, data)

    navigate('/products')
    
  }

  return (
    <>


      <Container className='mt-5 p-2'>
        <h1>Edit Product</h1>
        <hr />
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
            Edit Product
          </Button>
        </Form>


      </Container>

    </>
  )
}

export default EditProduct