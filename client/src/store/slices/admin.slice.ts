import { createSlice,PayloadAction} from "@reduxjs/toolkit";
import {User as Admin} from '../../types/Type'


interface AdminState {
    admin:Admin | null
}

const initialState:AdminState ={
    admin:null
}


const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        AdminLogin:(state,action:PayloadAction<Admin>)=>{
            state.admin = action.payload
        },
        AdminLogout:(state)=>{
            state.admin = null
        }
    }
})

export const {AdminLogin,AdminLogout} = adminSlice.actions
export default adminSlice.reducer;