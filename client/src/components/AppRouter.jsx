import { Route, Routes, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/consts'
import { useSelector } from 'react-redux'

const AppRouter = () => {
  const user = useSelector(state => state.user)

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} exact />
      ))}
      <Route path='/*' element={<Navigate to={SHOP_ROUTE} replace />} />
    </Routes>
  )
}

export default AppRouter
