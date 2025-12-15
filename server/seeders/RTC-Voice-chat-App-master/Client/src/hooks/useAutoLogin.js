import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const useAutoLogin = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(BASE_URL + '/api/refresh', {
          withCredentials: true,
        })
        dispatch(setAuth(data))
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    })()
  }, [])
  
  return (
    {loading}
  )
}

export default useAutoLogin