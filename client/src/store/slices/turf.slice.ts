import { createSlice,PayloadAction} from "@reduxjs/toolkit";
import { User } from "../../types/Type";


interface UserState{
    turf:User | null;
    loading:boolean;
    error:string|null;
}

const initialState:UserState={
    turf:null,
    loading:false,
    error:null
}
const turfSlice = createSlice({
    name:"turf",
    initialState,
    reducers:{
        turfLogin:(state,action:PayloadAction<User>)=>{
            state.turf = action.payload
        },
        turfLogout:(state)=>{
            state.turf=null
        }
    }
})

export const {turfLogin,turfLogout}=turfSlice.actions;
export  default turfSlice.reducer