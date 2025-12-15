import { useState } from "react"
import Fullname from "../cards/Fullname"
import Username from "../cards/Username"

const Activate = () => {

    const LoginSteps = {
        1 : Fullname,
        2 : Username,
    }

        const [step, setStep] =  useState(1)
        const LoginComponent = LoginSteps[step]
    return (
        <div className="h-[calc(100vh-(3rem+2rem))] flex justify-center items-center">
            <LoginComponent onNext={()=>setStep(step+1)}/>
        </div>
    )
}

export default Activate