import { createAsyncThunk, createSlice,PayloadAction} from "@reduxjs/toolkit";
import { Turf } from "../../types/Type";
import { turfAxiosInstance } from "../../api/turf.axios";


interface UserState{
    turf:Turf | null;
    loading:boolean;
    error:string|null;
}

const initialState:UserState={
    turf:null,
    loading:false,
    error:null
}
export interface updateTurfProfilePayload{
    name:string,
    phone:string,
    email:string;
    turfPhotos:string[];
    aminities:string[];
    location:object
}
export const updateTurfDetails = createAsyncThunk<Turf,updateTurfProfilePayload,{rejectValue:string}>(
    "turf/updateProfile",
    async(profileData,{rejectWithValue})=>{
        try {
            const response = await turfAxiosInstance.patch('/_ts/turf/updateProfile',profileData);
            console.log("edit profile response in thunk",response)
            return response.data.data;
        } catch (error:any) {
            return rejectWithValue(error.response?.data || "Something went wrong")
        }
    }
)
const turfSlice = createSlice({
    name:"turf",
    initialState,
    reducers:{
        turfLogin:(state,action:PayloadAction<Turf>)=>{
            state.turf = action.payload
        },
        turfLogout:(state)=>{
            state.turf=null
        }
    },
    extraReducers:(builder)=>{
            builder
            .addCase(updateTurfDetails.pending,(state)=>{
                state.loading = true;
                state.error=null;
            })
            .addCase(updateTurfDetails.fulfilled,(state,action:PayloadAction<Turf>)=>{
                state.loading=false;
                state.turf=action.payload || null
            })
            .addCase(updateTurfDetails.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload || "Failed to update profile"
            })
        }
})

export const {turfLogin,turfLogout}=turfSlice.actions;
export  default turfSlice.reducer