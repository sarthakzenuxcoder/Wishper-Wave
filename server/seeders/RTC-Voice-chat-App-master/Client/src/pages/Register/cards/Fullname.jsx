import { useDispatch, useSelector } from "react-redux"
import AuthCard from "../../../components/AuthCard"
import Button from "../../../components/Button"
import { setName } from "../../../store/activateSlice"
import { useState } from "react"

const Fullname = ({ onNext }) => {
    const name = useSelector(state => state.activate.fullname)
    const [yourname, setyourname] = useState(name)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setyourname(e.target.value)
        dispatch(setName(e.target.value));
    }

    const handleNext = () => {
        if (!yourname) return
        onNext()
    }

    return (
        <AuthCard className={'w-[25rem] md:p-6 p-4'} title="👀 What's your Fullname ?">
            <input type="text" placeholder='Enter your Name' className='py-[.5rem] px-[1rem] outline-none con rounded-3xl bg-[#262626] my-6' onChange={handleChange} value={yourname} />
            <p className='text-sm text-[#C4C5C5]'>People use real names at Apna Adda :)</p>
            <Button className='my-10 mx-auto' onNext={handleNext}>Next</Button >
        </AuthCard >
    )
}

export default Fullname