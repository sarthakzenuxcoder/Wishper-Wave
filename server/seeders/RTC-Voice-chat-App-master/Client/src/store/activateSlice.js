import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullname : '',
  username : '',
  Avatar : '',
}

export const activateSlice = createSlice({
  name: 'activate',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.fullname = action.payload
    },
    setAvatar : (state, action) => {
        state.Avatar = action.payload
    },
    setDisplayname : (state, action) => {
        state.username = action.payload
    }
    
  },
})

export const { setName, setAvatar, setDisplayname } = activateSlice.actions

export default activateSlice.reducer