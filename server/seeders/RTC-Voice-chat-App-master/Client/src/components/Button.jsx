import { BsArrowRightShort } from 'react-icons/bs'

const Button = ({ children, onNext, className }) => {

    return (
            <button onClick={onNext} className={`py-[.5rem] px-3 bg-[#0077FF] flex gap-1 items-center font-semibold rounded-3xl ${className}`}>
                {children} <BsArrowRightShort className='font-semibold text-2xl' />
            </button>
    )
}

export default Button