import { Link, useNavigate } from "react-router-dom"
import Button from "./Button"
import api from "../utils/Api"
import { useDispatch, useSelector } from "react-redux"
import { setAuth } from "../store/authSlice"

const Header = () => {
  const dispatch = useDispatch()
  const { isAuth, user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const handleNext = async () => {
    const { data } = await api('/api/logout')
    dispatch(setAuth(data))
    navigate('/')
  }
  return (
    <header className="h-[3rem] flex justify-between items-center">
      <Link to='/'>
        <h1 className="text-[1.5rem] font-semibold">👽 Apna Adda</h1>
      </Link>
      {isAuth &&
        <div className="flex gap-4">
          {user.activated &&
            <div className="flex gap-4 items-center">
              <span className="capitalize font-semibold md:block hidden">{user.username}</span>
              <div className="w-10 h-10 rounded-full border-2 border-[#0077FF] overflow-hidden">
                <img className='object-cover w-full h-full' src={user.avatar} alt="profile" />
              </div>
            </div>
          }
          <Button className='' onNext={handleNext}> </Button>
        </div>}
    </header>
  )
}

export default Header