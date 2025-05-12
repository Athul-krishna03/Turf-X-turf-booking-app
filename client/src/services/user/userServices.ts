import { userAxiosInstance } from "../../api/client.axios";
import { ChangePasswordData } from "../../hooks/user/userDashboard";

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

export const slotUpdate = async (
    date: string, 
    slotId: string, 
    price: number, 
    duration: number, 
    paymentIntentId: string, 
    slotLockId: string,
    paymentType:string
) => {
    const response = await userAxiosInstance.post(`/_us/user/slots`, { 
        date,
        isBooked: true,
        slotId,
        price,
        duration,
        slotLockId,
        paymentIntentId,
        paymentType
    })
    return response
}

// export const bookingRegister = async (slotId:string,price:number,duration:number,paymentIntentId:string)=>{
//     const response = await userAxiosInstance.post(`/_us/user/registerSlot`,{
//         slotId,
//         price,
//         duration,
//         paymentIntentId
//     })

//     return response
// }

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