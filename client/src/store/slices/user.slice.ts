import { createAsyncThunk, createSlice,PayloadAction} from "@reduxjs/toolkit";
import { User } from "../../types/Type";
import { userAxiosInstance } from "../../api/client.axios";


interface UserState{
    user:User | null;
    loading:boolean;
    error:string|null;
}

export interface updateProfilePayload{
    name:string,
    phone:string,
    position?:string | undefined | object,
    profileImage?:string,
}

export const updateUserProfile = createAsyncThunk<User,updateProfilePayload,{rejectValue:string}>(
    "user/updateProfile",
    async(profileData,{rejectWithValue})=>{
        try {
            const response = await userAxiosInstance.patch('/_us/user/edit-profile',profileData);
            console.log("edit profile response in thunk",response)
            return response.data.data;
        } catch (error:any) {
            return rejectWithValue(error.response?.data || "Something went wrong")
        }
    }
)
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
        },
        userLogout:(state)=>{
            state.user=null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(updateUserProfile.pending,(state)=>{
            state.loading = true;
            state.error=null;
        })
        .addCase(updateUserProfile.fulfilled,(state,action:PayloadAction<User>)=>{
            state.loading=false;
            state.user=action.payload || null
        })
        .addCase(updateUserProfile.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload || "Failed to update profile"
        })
    }
})

export const {userLogin,userLogout}=userSlice.actions;
export  default userSlice.reducer