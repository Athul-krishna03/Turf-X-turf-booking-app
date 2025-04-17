import { createSlice,PayloadAction} from "@reduxjs/toolkit";
import { User } from "../../types/Type";


interface UserState{
    user:User | null;
    loading:boolean;
    error:string|null;
}

const initialState:UserState={
    user:null,
    loading:false,
    error:null
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        userLogin:(state,action:PayloadAction<User>)=>{
            state.user = action.payload
        }
    }
})

export const {userLogin}=userSlice.actions;
export  default userSlice.reducer