import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Turf } from "../../types/Type";


type TurfState ={
    turfs:Turf[]
}
const initialState:TurfState={
    turfs:[]
}


const turfsSlice = createSlice({
    name:"turfs",
    initialState,
    reducers:{
        setTurfs(state,action:PayloadAction<Turf[]>){
            state.turfs = action.payload;
        },
        clearTurfs(state){
            state.turfs=[]
        }
    }
});

export const {setTurfs ,clearTurfs} = turfsSlice.actions;
export default turfsSlice.reducer;