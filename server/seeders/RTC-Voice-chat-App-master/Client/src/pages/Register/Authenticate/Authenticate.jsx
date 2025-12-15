import { useState } from "react"
import Login from "../cards/Login"
import CodeVerification from "../cards/CodeVerification"

const Authenticate = () => {

    const LoginSteps = {
        1 : Login,
        2 : CodeVerification,
    }

        const [step, setStep] =  useState(1)
        const LoginComponent = LoginSteps[step]
    return (
        <div className="h-[calc(100vh-(3rem+2rem))] flex justify-center items-center">
            <LoginComponent onNext={()=>setStep(step+1)}/>
        </div>
    )
}

export default Authenticate