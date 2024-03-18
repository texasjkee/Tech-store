import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { addToBasket } from '../store/basketSlice'
import { fetchOneDevice } from '../http/deviceApi'
import { addToBasketApi } from '../http/basketApi'

const DevicePage = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [device, setDevice] = useState({ deviceInfo: [], img: [] })
  const [imgIndex, setImgIndex] = useState(0)
  const { id } = useParams()

  const prevImg = () => {
    setImgIndex((prevIndex) => (prevIndex === 0 ? device.img.length - 1 : prevIndex - 1))
  }

  const nextImg = () => {
    setImgIndex((prevIndex) => (prevIndex === device.img.length - 1 ? 0 : prevIndex + 1))
  }

  const handleAddToBasket = async () => {
    try {
      const deviceData = await fetchOneDevice(id)
      dispatch(addToBasket(deviceData))
      await addToBasketApi(id, 1)
    } catch (error) {
      console.error('Error handling addToBasket:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOneDevice(id)
        setDevice(data)
      } catch (error) {
        console.error('Error fetching device:', error)
      }
    }

    fetchData()
  }, [id])

  return (
<Container className="mt-3">
  <Row className="d-flex align-items-center justify-content-center">
    <Col md={1} className="d-flex justify-content-center">
      <Button variant="outline-secondary" onClick={prevImg}>
        <i className="bi bi-chevron-left"></i>
      </Button>
    </Col>
    <Col md={5} className="d-flex align-items-center justify-content-center">
      <div style={{ width: 400, height: 'auto' }}>
        <Image
          className="mx-3"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src={process.env.REACT_APP_API_URL + '/' + device.img[imgIndex]}
          alt="Device Image"
        />
      </div>
    </Col>
    <Col md={1} className="d-flex justify-content-center">
      <Button variant="outline-secondary" onClick={nextImg}>
        <i className="bi bi-chevron-right"></i>
      </Button>
    </Col>
    <Col md={5} className="mt-2 d-flex flex-column align-items-center justify-content-start">
      <h2>{device.name}</h2>
      <Card
        className="d-flex flex-column align-items-center justify-content-around"
        style={{ width: 300, height: 300, fontSize: 32, border: '3px solid lightgray' }}
      >
        <h3>{device.price}<span className="mx-3">грн.</span></h3>
        <Button variant="outline-secondary" onClick={handleAddToBasket}>Добавить в корзину</Button>
      </Card>
    </Col>
  </Row>
  <Row className="d-flex flex-column m-3">
    <h1>Характеристики</h1>
    {device.deviceInfo && device.deviceInfo.map((info, index) => (
      <Row key={info._id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
        <Col>{info.title}:</Col>
        <Col>{info.description}</Col>
      </Row>
    ))}
  </Row>
</Container>
  )
}

export default DevicePage