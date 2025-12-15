import { useEffect, useMemo, useState } from "react"
import Button from "../../components/Button"
import RoomCard from "../../components/RoomCard"
import { getApi } from "../../utils/Api"
import { useNavigate } from "react-router-dom"
import RoomOptionModal from "../../components/RoomOptionModal"

const Rooms = () => {
  const [showModal, SetshowModal] = useState(false)
  const [roomType, setRoomType] = useState('open')
  const [rooms, setRooms] = useState([])

  const [searchText, setSearchText] = useState('')

  const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const displayedOptions = useMemo(() => rooms.filter((room) =>
    containsText(room.topic, searchText)),
    [rooms, searchText]
  );

  const navigate = useNavigate()

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getApi('/api/getRoom')
      setRooms(data)
    }
    fetchRooms()
  }, [])

  return (
    <>
      <div className="justify-between mt-8 md:flex hidden">
        <div className="flex gap-8 items-center">
          <h2 className="font-semibold text-xl border-b-2 border-[#0077FF]">All Voice Rooms</h2>
          <div className="flex items-center">
            <span className="bg-[#262626] h-9 w-9 grid place-items-center rounded-s-3xl">🔍</span>
            <input className="outline-none rounded-e-3xl py-1 bg-[#262626] h-9" type="text" placeholder="Search Rooms..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          </div>
        </div>
        <div>
          <Button className='bg-[#20BD5F]' onNext={() => SetshowModal(!showModal)}>Start a Room</Button>
        </div>
      </div>

      <div className="justify-between items-center gap-4 mt-8 md:hidden flex flex-col">
        <div className="flex gap-8 items-center">
          <h2 className="font-semibold text-xl border-b-2 border-[#0077FF]">All Voice Rooms</h2>
          <div>
            <Button className='bg-[#20BD5F]' onNext={() => SetshowModal(!showModal)}>Start a Room</Button>
          </div>
        </div>

        <div className="flex items-center w-full">
          <span className="bg-[#262626] h-9 w-9 grid place-items-center rounded-s-3xl">🔍</span>
          <input className="outline-none rounded-e-3xl py-1 bg-[#262626] h-9 w-full" type="text" placeholder="Search Rooms..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
      </div>

      <div className={`flex mt-10 gap-4 flex-wrap ${showModal && 'blur-md relative z-[-1]'} ease-in-out`}>
        {/* {Array.apply(null, Array(15)).map((val, idx) => <RoomCard key={idx}/>)} */}
        {displayedOptions.map((room) => <RoomCard key={room._id} room={room} onClick={() => navigate(`/room/${room._id}`)} />)}
      </div>
      {showModal &&
        <RoomOptionModal
          showModal={showModal}
          SetshowModal={SetshowModal}
          roomType={roomType}
          setRoomType={setRoomType}
        />}
    </>
  )
}

export default Rooms