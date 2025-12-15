
const AuthCard = ({ children, title, className }) => {
  return (
    <div className={`bg-[#1D1D1D] text-center rounded-xl ${className}`}>
      {title && <h2 className="font-semibold text-2xl capitalize my-2">{title}</h2>}
      {children}
    </div>
  )
}

export default AuthCard