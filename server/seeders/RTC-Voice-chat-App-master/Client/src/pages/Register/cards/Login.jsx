import { useState } from 'react'
import AuthCard from '../../../components/AuthCard'
import Button from '../../../components/Button'
import api from '../../../utils/Api'
import { useDispatch } from 'react-redux'
import { setOtp } from '../../../store/authSlice'

const Login = ({ onNext }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const dispatch = useDispatch()
    const handleEnter = (e) => {
        if (e.target === 'Enter' && !phoneNumber)
            handleOTP()
    }

    const handleOTP = async () => {
        if (!phoneNumber) return;

        try {
            const { data } = await api('/api/send-otp', { 'phone': '+91' + phoneNumber })
            dispatch(setOtp({ phone: data.phone, hash: data.hashforToken }))
            onNext()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthCard className={'w-[25rem] h-[20rem] md:p-6 p-4'} title='☎️ Enter your phone number'>
            <div className='my-8 flex justify-center'>
                <span className='text-2xl py-[.3rem] px-[.5rem] bg-[#262626] rounded-s-3xl h-[rem]'>🏳️‍🌈</span>
                <input type='number' placeholder='+91 34577 349534' className='p-[.5rem] outline-none con rounded-e-3xl bg-[#262626]' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} onKeyUp={handleEnter} />
            </div>
            <Button className='my-8 mx-auto' onNext={handleOTP}>Next</Button>
            <p className='text-sm text-[#C4C5C5]'>By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
        </AuthCard>
    )
}

export default Login