import Button from './Button'
import AuthCard from './AuthCard'
import api from '../utils/Api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'

const RoomOptionModal = ({ showModal, SetshowModal, roomType, setRoomType }) => {
    const [topic, setTopic] = useState('')
    const navigate = useNavigate()

    const createRoom = async () => {
        if (!topic) return;
        try {
            const { data } = await api('/api/addRoom', { topic, roomType })
            navigate(`/room/${data.room._id}`)
            SetshowModal(!showModal)
            setRoomType('open')
        } catch (error) {
            console.log(error)
            SetshowModal(!showModal)
            setRoomType('open')
        }
    }
    return (
        <Modal showModal={showModal} SetshowModal={SetshowModal}>
            <AuthCard className='md:w-[26rem] md:h-auto p-6'>
                <h3 className="text-lg font-semibold leading-6">Enter the topics to be discussed</h3>
                <input className="w-full outline-none rounded-3xl py-1 px-4 my-3 bg-[#262626] h-9" type="text" placeholder="E.g. : Use of AI/ML" onChange={(e) => setTopic(e.target.value)} value={topic} maxLength={25} />
                <p className="text-lg font-semibold capitalize">Room type - {roomType}</p>
                <div className="flex justify-around my-4">
                    <div className={`w-20 h-20 grid place-items-center p-1 rounded-lg hover:bg-[#262626] ease-in-out cursor-pointer ${roomType === 'open' ? 'bg-[#262626]' : null}`} onClick={() => setRoomType('open')}>
                        <img src="" alt="" />
                        🌍
                        <p>Open</p>
                    </div>
                    <div className={`w-20 h-20 grid place-items-center p-1 rounded-lg hover:bg-[#262626] ease-in-out cursor-pointer  ${roomType === 'social' ? 'bg-[#262626]' : null}`} onClick={() => setRoomType('social')}>
                        <img src="" alt="" />
                        👯‍♀️
                        <p>Social</p>
                    </div>
                    <div className={`w-20 h-20 grid place-items-center p-1 rounded-lg hover:bg-[#262626] ease-in-out cursor-pointer  ${roomType === 'closed' ? 'bg-[#262626]' : null}`} onClick={() => setRoomType('closed')}>
                        <img src="" alt="" />
                        🔒
                        <p>Closed</p>
                    </div>
                </div>
                <p className="text-lg font-semibold">Start a room, open to everyone</p>
                <Button className='bg-[#20BD5F] mx-auto my-4' onNext={createRoom}>Start a Room</Button>
            </AuthCard>
        </Modal>
    )
}

export default RoomOptionModal