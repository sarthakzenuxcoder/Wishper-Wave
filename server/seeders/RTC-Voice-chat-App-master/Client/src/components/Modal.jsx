
const Modal = ({ children, showModal, SetshowModal, }) => {

  return (
    <div
      className="fixed inset-0 z-10 shadow-white backdrop-blur-sm flex items-center justify-center"
      onClick={() => SetshowModal(!showModal)}>

      <div
        className={`relative bg-light-violet rounded-2xl py-6 z-30`}
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="absolute right-4 -top-2 font-bold text-lg cursor-pointer" onClick={() => SetshowModal(!showModal)} >Close
        </span>

        {children}
      </div>
    </div>
  )
}

export default Modal