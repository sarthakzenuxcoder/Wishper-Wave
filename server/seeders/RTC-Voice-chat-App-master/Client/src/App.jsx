import './App.css'
import Header from './components/Header'
import Home from './pages/Home/Home'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Activate from './pages/Register/Activate/Activate'
import Authenticate from './pages/Register/Authenticate/Authenticate'
import { useEffect } from 'react'
import Rooms from './pages/Rooms/Rooms'
import { useSelector } from 'react-redux'
import useAutoLogin from './hooks/useAutoLogin'
import Room from './pages/Rooms/Room/Room'

let isAuth
let user 


function App() {
  isAuth = useSelector(state => state.auth.isAuth)
  user = useSelector(state => state.auth.user)

  const {loading} = useAutoLogin()
  // const loading = false;
  return ( loading ? 'loading...' : 
    (<>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/authenticate' element={<GuestRoute component={<Authenticate/>}/>} />
          <Route path='/activate' element={<SemiProtectedRoute component={<Activate/>}/>} />
          <Route path='/rooms' element={<FullyProtectedRoute component={<Rooms/>}/>} />
          <Route path='/room/:id' element={<FullyProtectedRoute component={<Room/>}/>} />
        </Routes>
      </BrowserRouter>
    </>)
  )
}

export default App

const GuestRoute = ({component})=>{
  const navigate = useNavigate()

  useEffect(() => {
    isAuth ? navigate('/rooms') : component
  }, [])
  
  return component
}

const SemiProtectedRoute = ({component})=>{
  const navigate = useNavigate()
  useEffect(() => {
    // isAuth ? navigate('/') : isAuth && !user.activated ? component : navigate('/rooms')
    isAuth ? (isAuth && user.activated ? navigate('/rooms') : component) : navigate('/authenticate')
  }, [])
  
  return component
}

const FullyProtectedRoute = ({component})=>{
  
  const navigate = useNavigate()
  useEffect(() => {
    // isAuth ? navigate('/') : isAuth && !user.activated ? component : navigate('/rooms')
    isAuth ? (isAuth && user.activated ? component : navigate('/activate')) : navigate('/')
  }, [])
  
  return component
}