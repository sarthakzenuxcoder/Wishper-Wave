import AuthCard from './AuthCard'

const RoomCard = ({ room, onClick }) => {

  return (
    <div className="cursor-pointer w-full md:w-auto" onClick={onClick}>
      <AuthCard className='md:w-[18rem] h-[10rem] md:h-[10rem] p-4 text-left hover:bg-opacity-70 transition '>
        <h3 className="text-lg font-semibold leading-6 capitalize text-left">{room.topic}</h3>
        <div className="flex gap-16 my-4">
          <div className="">
            {/* {room.speakers.map((speaker, i) => {
              room.speakers.length === 1 ? <img className="w-10 h-10 object-cover rounded-full border-2" src={speaker.avatar} alt="user" /> :
                <>
                  <img className="w-10 h-10 object-cover rounded-full border-2" src={speaker.avatar} alt="avatar" />
                  <img className="w-10 h-10 object-cover rounded-full border-2 absolute left-6 top-4" src={speaker.avatar} alt="avatar" />
                </>
            })} */}
            {room.speakers.map((speaker, i) =>
              <img key={i} className="w-10 h-10 object-cover rounded-full border-2" src={speaker.avatar} alt="avatar" />
            )}
          </div>
          <div>
            {room.speakers.map((speaker, i) => <p key={i} className="capitalize"> {speaker.username} 💬</p>)}
          </div>
        </div>
        <p className="text-right">{room.speakers.length - 1}🤵</p>
      </AuthCard>
    </div>
  )
}

export default RoomCard