import { createSlice, PayloadAction } from '@reduxjs/toolkit'



const initialState : {token: string | null, showModal: boolean} = {
	token: localStorage.getItem("token") ?? null,
	showModal: false
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
	changeToken: (state: {token: string | null}, action: PayloadAction<string | null>) =>
	{
		state.token = action.payload
	},
	toggleShwoModal: (state: {showModal: boolean}) =>
	{
		state.showModal = !state.showModal
	}
  },
})

export const {changeToken, toggleShwoModal} = tokenSlice.actions
export default tokenSlice.reducer