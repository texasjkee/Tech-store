import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Row, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearBasket, removeFromBasket, selectBasketItems, selectTotalPrice, addToBasket } from '../store/basketSlice'
import { getBasketItemsApi, removeFromBasketApi } from '../http/basketApi'
import { fetchOneDevice } from '../http/deviceApi'
import { DEVICE_ROUTE } from '../utils/consts'

const Basket = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const basketItems = useSelector(selectBasketItems)
  const totalPrice = useSelector(selectTotalPrice)
  const [device, setDevice] = useState({ img: [] })
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          console.error('Device ID is undefined')
          return
        }
        const data = await fetchOneDevice(id)
        setDevice(data)
      } catch (error) {
        console.error('Error fetching device:', error)
      }
    }
    if (id !== undefined) {
      fetchData()
    }
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBasketItemsApi()
        dispatch(clearBasket())
        data.forEach(item => dispatch(addToBasket(item)))
      } catch (error) {
        console.error('Error fetching basket items:', error)
      }
    }

    
      fetchData()
    
  }, [dispatch])

  const handleRemoveFromBasket = async (device_id) => {
    try {
      dispatch(removeFromBasket(device_id));
      await removeFromBasketApi([device_id]);
    } catch (error) {
      console.error('Error removing from basket:', error)
    }
  }

  const handleClick = (device_id) => {
    navigate(DEVICE_ROUTE + '/' + device_id)
  }

  return (
    <Container className="mt-3">
      <h1>Корзина</h1>
      {basketItems.map((item, index) => (
        <Card key={item.device_id + index} className="mb-2">
          <Card.Body>
            <Row>
              <Col md={2}
                onClick={() => handleClick(item.device_id)}>
                <Image src={process.env.REACT_APP_API_URL + '/' + item.img} width={50} height={50} />
              </Col>
              <Col md={4}>{item.name}</Col>
              <Col md={3}>{item.price}<span className="mx-2">грн.</span></Col>
              <Col md={3}>
                <Button variant="danger" onClick={() => handleRemoveFromBasket(item.device_id)}>
                  Видалити
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      <Card className="mt-3">
        <Card.Body>
          <Row>
            <Col>
              <h4>Загальна вартість:</h4>
            </Col>
            <Col>
              <h4>{totalPrice}<span className="mx-2">грн.</span></h4>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Basket