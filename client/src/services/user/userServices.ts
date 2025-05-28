import { userAxiosInstance } from "../../api/client.axios";
import { ChangePasswordData } from "../../hooks/user/userDashboard";
import { BookingType } from "../../types/Booking";
import { JoinedGameBooking } from "../../types/joinedGame";

export const logoutUser = async () => {
    const response = await userAxiosInstance.post("/_us/user/logout");
    return response.data;
};


export const changePassword = async (data: ChangePasswordData) => {
    const response = await userAxiosInstance.patch(
    "/_us/user/change-password",
    data
);
    console.log("changePassword response", response);
    return response.data;
};


export const getAllTurfsData = async({
    page=1,
    limit=10,
    search=""
}:{
    page:number,
    limit:number,
    search:string
})=>{
    const reponse = await userAxiosInstance.get("/_us/user/get-Turfs",{
        params:{
        page,
        limit,
        search
        }
    });
    return reponse.data
}

export const slots = async (turfId: string, date: string) => {
    const response = await userAxiosInstance.get(`/_us/user/slots?turfId=${turfId}&date=${date}`);
    return response.data;
};

export const paymentService = async (slotId:string,price:number)=>{
    console.log("payment service");
    
    const response = await userAxiosInstance.post("/_us/user/payments/create-payment-intent",{slotId,price})
    console.log("payment api response",response);
    return response
}

export const sharedSlotPaymentService = async (price:number) => {
    const response = await userAxiosInstance.post("/_us/user/payments/create-payment-intent",{price})
    console.log("shared payment api response",response);
    return response
}

export const slotUpdate = async (
    date: string, 
    slotId: string, 
    price: number, 
    duration: number, 
    paymentIntentId: string, 
    slotLockId: string,
    paymentType:string,
    playerCount?:number
) => {
    const response = await userAxiosInstance.post(`/_us/user/slots`, { 
        date,
        isBooked: true,
        slotId,
        price,
        duration,
        slotLockId,
        paymentIntentId,
        paymentType,
        playerCount
    })
    return response
}

export const sharedSlotJoin = async(date:string,slotId:string,price:number)=>{
    console.log(date,slotId)
    const response = await userAxiosInstance.post(`/_us/user/joinSlot`,{
        date,slotId,price
    })
    console.log("shared slot data",response);
    
    return response
}

export const getAllBookings = async ()=>{
    const response = await userAxiosInstance.get(`/_us/user/bookings`)
    console.log("booking data",response);
    
    return response.data.data
}

export const getSlotData = async (slotId:string)=>{
    const response = await userAxiosInstance.get(`/_us/user/getSlot?slotId=${slotId}`)
    console.log(response);
    
    return response.data.slotData
}

export const fetchHostedGames = async () => {
    const response = await userAxiosInstance.get("/_us/user/hosted-games")
    console.log(response);
    
    return response.data.games
}

export const getJoinedGameDetials = async (bookingId:string | undefined)=>{
    const response = await userAxiosInstance.get(`/_us/user/joinedGameDetials?bookingId=${bookingId}`)
    console.log("joinedGameDetials",response);

    return response.data.joinedGameDetials 
    
}

export const cancelBooking = async (bookingId:string | null ,bookingType:string,isHost?:boolean) => {
    if(bookingType== "joined"){
        const response = await userAxiosInstance.patch(`/_us/user/cancelJoinedGame`,{bookingId,bookingType,isHost})
        return response
    }else{
        const response = await userAxiosInstance.patch(`/_us/user/cancelSingleSlot`,{bookingId,bookingType})
        return response
    }
    
}

export const getWalletData = async () => {
    const response = await userAxiosInstance.get("/_us/user/wallet");
    console.log("wallet data", response);
    return response.data;
}