import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateUserAuthStatus } from './store/userSlice'
import { check } from './http/userApi'

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await check()
        dispatch(updateUserAuthStatus(true))
      } catch (error) {
        console.error('Error during check:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dispatch])

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <Spinner animation='border' role='status' />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
