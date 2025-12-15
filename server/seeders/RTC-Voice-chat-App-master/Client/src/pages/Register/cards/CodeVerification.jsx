import { useNavigate } from "react-router-dom"
import AuthCard from "../../../components/AuthCard"
import Button from "../../../components/Button"
import OtpInput from 'react-otp-input';
import { useState } from "react";
import api from "../../../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setOtp } from "../../../store/authSlice";

const CodeVerification = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [otp, setOTP] = useState('');
    const { phone, hash } = useSelector(state => state.auth.otp)

    const resendOTP = async () => {
        const { data } = await api('/api/send-otp', { phone })
        console.log('OTP', data.OTP)
        setOTP('')
        dispatch(setOtp({ phone: data.phone, hash: data.hashforToken }))
    }
    const handleVerification = async () => {
        if (!otp) return;

        try {
            const { data } = await api('/api/verify-otp', { otp, phone, hash },)
            dispatch(setAuth(data))
            navigate('/activate');

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthCard className={'w-[25rem] md:p-6 p-4'} title='🔒 Enter the code'>
            <OtpInput
                containerStyle="flex gap-4 justify-center my-8"
                inputStyle="w-[3rem!important] h-[3rem] outline-none text-center p-[.5rem] rounded-2xl"
                value={otp}
                onChange={setOTP}
                numInputs={4}
                renderInput={(props) => <input {...props} />}
                shouldAutoFocus
            />
            <p className="text-sm text-[#C4C5C5]">Didn’t recieve ? <a className='text-blue-500' onClick={resendOTP}>Tap to Resend </a></p>
            <Button className='mt-8 mx-auto' onNext={handleVerification}>Next</Button>
        </AuthCard >
    )
}

export default CodeVerification