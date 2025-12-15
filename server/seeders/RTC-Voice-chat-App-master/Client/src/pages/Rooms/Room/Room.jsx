import { useNavigate, useParams } from 'react-router-dom'
import back from '../../../assets/back-arrow.svg'
import { useEffect, useState } from 'react'
import useWebRTC from '../../../hooks/useWebRTC'
import { useSelector } from 'react-redux'
import { getApi } from '../../../utils/Api'
import mic from '../../../assets/mic.png'
import micMute from '../../../assets/mic-mute.png'
const Room = () => {
  const navigate = useNavigate()
  const { id: roomId } = useParams()
  const user = useSelector(state => state.auth.user)
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user)
  const [numberOfClients, setNumberOfClients] = useState(clients);
  const [room, setRoom] = useState('')
  const [isMuted, setMuted] = useState(true);


  useEffect(() => {
    const uniqueClients = clients.reduce((unique, current) => {
      const existingClient = unique.find((client) => client._id === current._id);
      if (!existingClient) {
        return [...unique, current];
      }
      return unique;
    }, []);

    setNumberOfClients(uniqueClients);
  }, [clients]);

  useEffect(() => {
    const fetchRoomData = async () => {
      const { data } = await getApi(`/api/rooms/${roomId}`)
      setRoom(data)
    }
    fetchRoomData()
  }, [roomId])

  useEffect(() => {
    handleMute(isMuted, user._id);
  }, [isMuted]);

  const handleMuteClick = (clientId) => {
    if (clientId !== user._id) {
      return;
    }
    setMuted((prev) => !prev);
  };
  return (
    <div>
      <div className="flex gap-8 items-center mt-8">
        <img src={back} alt="back" className='w-[2rem] cursor-pointer' onClick={() => navigate(-1)} />
        <h2 className="font-semibold text-xl border-b-2 border-[#0077FF]">All Voice Rooms</h2>
      </div>
      <div className="flex justify-between mt-8">
        <div className="flex gap-8 items-center">
          <h2 className="font-semibold text-xl capitalize">{room.topic}</h2>
        </div>
        <div className='flex gap-4'>
          <button className='py-[.5rem] px-3 bg-[#262626] rounded-full'>🤚</button>
          <button className='py-[.5rem] px-3 bg-[#262626] md:flex hidden gap-1 items-center font-semibold rounded-3xl' onClick={() => navigate('/rooms')}>✌️ Leave quietly</button>
        </div>
      </div>
      <div className='flex gap-10 flex-wrap mt-10'>
        {numberOfClients.map((client) => <div key={client._id} className='text-center w-[5rem] h-[5rem] rounded-full border-4 border-[#5453e0] relative'>
          <audio
            className='hidden'
            ref={(instance) => provideRef(instance, client._id)}
            controls
            autoPlay
          >
          </audio>
          <img src={client.avatar} alt="client" className='object-cover w-full h-full rounded-full' />
          <h4 className='font-semibold text-lg mt-2'>{client.username}</h4>
          <button onClick={() => handleMuteClick(client._id)}
            className='absolute bottom-1 -right-2 bg-black rounded-full cursor-pointer'>
            {client.muted ? (
              <img
                className='w-6'
                src={micMute}
                alt="mic"
              />
            ) : (
              <img
                className='w-6'
                src={mic}
                alt="mic"
              />
            )}
          </button>
        </div>)}
      </div>
    </div>
  )
}

export default Room