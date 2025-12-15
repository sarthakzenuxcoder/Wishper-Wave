import { Link, useNavigate } from "react-router-dom"
import AuthCard from "../../components/AuthCard"
import Button from "../../components/Button"

const Home = () => {

    const navigate = useNavigate()

    return (
        <div className="h-[calc(100vh-(3rem+2rem))] flex justify-center items-center">
            <AuthCard className={'w-[25rem] h-[20rem] md:p-6 p-4'} title='👋 welcome to Apna Adda'>
                <p className="mt-4 text-[#C4C5C5]">
                    We're working hard to get Apna Adda ready for everyone! While we wrap up the finishing youches, we're adding people gradually to make sure nothing breaks :)
                </p>
                <Button onNext={() => navigate('/authenticate')} className='mt-10 mx-auto'>Let's Go</Button>
                <p className="mt-4 text-[#C4C5C5]">Have an invite Text ? <Link to='/authenticate' className="text-blue-500 font-semibold">Sign In</Link></p>
            </AuthCard>
        </div>
    )
}

export default Home