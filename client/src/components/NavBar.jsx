import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { updateUserAuthStatus, setUser } from '../store/userSlice'
import { getBasketItemsApi } from '../http/basketApi'
import { selectItemCount, updateBasketItemCount } from '../store/basketSlice'

const NavBar = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const itemCount = useSelector(selectItemCount)

  useEffect(() => {
    console.log("User authenticated:", user.isAuth)
    if (user.isAuth) {
      fetchBasketItems() // Викликаємо функцію для оновлення даних корзини після аутентифікації
    }
  }, [user.isAuth, dispatch])

  const fetchBasketItems = async () => {
    try {
      const basketItems = await getBasketItemsApi()
      console.log("Basket items:", basketItems)
      dispatch(updateBasketItemCount(basketItems.length))
    } catch (error) {
      console.error("Error fetching basket items:", error)
    }
  }

  const logOut = () => {
    dispatch(setUser({}))
    dispatch(updateUserAuthStatus(false))
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>
          КупиДевайс
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto">
            {user.user.role === 'ADMIN' && (
              <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>
                Адмін панель
              </Button>
            )}
            <Button variant={'outline-light'} onClick={() => navigate(BASKET_ROUTE)}>
              Корзина {itemCount > 0 && <span className="badge bg-danger ms-1">{itemCount}</span>}
            </Button>
            <Button variant={'outline-light'} onClick={() => logOut()}>
              Вийти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>
              Авторизація
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
}

export default NavBar