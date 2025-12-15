import { useNavigate } from 'react-router-dom'
import AuthCard from '../../../components/AuthCard'
import Button from '../../../components/Button'
import Avatar from '../../../components/avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setDisplayname } from '../../../store/activateSlice'
import api from '../../../utils/Api'
import { setAuth } from '../../../store/authSlice'

const Username = () => {

    const activate = useSelector(state => state.activate)
    const [nickName, setnickName] = useState(activate.username)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fullname = activate.fullname
    const name = fullname.split(' ')[1] ? (fullname.split(' ')[0] + ' ' + fullname.split(' ')[1].slice(0, 1)) : fullname

    const handleChange = (e) => {
        setnickName(e.target.value)
        dispatch(setDisplayname(e.target.value))
    }

    const handleActivation = async () => {
        if (!nickName) return
        try {
            const { data } = await api('/api/activate', activate)
            dispatch(setAuth(data))
            navigate('/rooms')

        } catch (error) {
            console.log(error.response.data)
        }
    }


    return (
        <AuthCard className={'md:w-[25rem] w-full md:p-6 p-2'} title={`😌 Hey, ${name}. !`}>
            <p className='text-sm text-[#C4C5C5]'>How's this photo ?</p>
            <div className='flex justify-between items-center md:gap-4'>
                <Avatar />
                <div className='mt-8' >
                    <label htmlFor='username' className='text-lg w-full truncate'>🤔 Choose an Username</label>
                    <input type="text" placeholder='@FlameFox' id='username' className='py-[.5rem] px-[1rem] outline-none rounded-3xl bg-[#262626] my-4 w-full' onChange={handleChange} value={nickName} />
                </div>
            </div>
            <Button className='my-3 mx-auto' onNext={handleActivation}>Next</Button >
            <p className='text-sm text-[#C4C5C5]'>People use real names at Apna Adda :)</p>
        </AuthCard >
    )
}

export default Username