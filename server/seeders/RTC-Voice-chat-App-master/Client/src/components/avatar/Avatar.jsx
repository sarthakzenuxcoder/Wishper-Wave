import { useState } from 'react'
import './style.css'
import { useDispatch } from 'react-redux'
import { setAvatar } from '../../store/activateSlice'
import avatar from '../../assets/avatar.png'


const Avatar = () => {
    // const avatar = useSelector(state => state.activate.Avatar)
    const [file, setFile] = useState(avatar)
    const dispatch = useDispatch()
    
    const handleChange = (e) => {
        // setFile(URL.createObjectURL(e.target.files[0]));
        const img = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = function () {
            setFile(reader.result);
            dispatch(setAvatar(reader.result));
        };
    }

    return (
        <div className="personal-image">
            <label className="label" htmlFor='avatar'>                
                <figure className="personal-figure">
                    <img src={file} alt="avatar" className="personal-avatar"/>
                        <figcaption className="personal-figcaption">
                            <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"/>
                        </figcaption>
                </figure>
            </label>
            <input type="file" onChange={handleChange} id='avatar' accept="image/*"/>
        </div>
    )
}

export default Avatar