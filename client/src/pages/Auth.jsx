import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Container, Form, Card, Button, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userApi'
import { setIsAuth, setUser, updateUserAuthStatus } from '../store/userSlice'

const Auth = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }

      if (data) {
        dispatch(setUser(data))
        dispatch(setIsAuth(true))
        dispatch(updateUserAuthStatus(true))
        setIsAuthenticated(true)
        navigate('/shop')
        // console.log("isAuthenticated:", true)
      } else {
        console.log(data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Оновити статус авторизації користувача після завантаження або оновлення компоненту
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(updateUserAuthStatus(true))
    }
  }, [isAuthenticated, dispatch])

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className='p-5'>
        <h2 className='m-auto'>{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            className='mt-3'
            placeholder='Введіть ваш email...'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            placeholder='Введіть ваш пароль...'
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
          />
          <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
            {isLogin ? (
              <div>
                Немає акаунту? <NavLink to={REGISTRATION_ROUTE}>Зареєструватися</NavLink>
              </div>
            ) : (
              <div>
                Є акаунту? <NavLink to={LOGIN_ROUTE}>Ввійти</NavLink>
              </div>
            )}
            <Button className='mt-3 align-self-end' variant='outline-secondary' onClick={click}>
              {isLogin ? 'Ввійти' : 'Реєстрація'}
            </Button>
          </Row>
        </Form>
        <ToastContainer />
      </Card>
    </Container>
  )
}

export default Auth
