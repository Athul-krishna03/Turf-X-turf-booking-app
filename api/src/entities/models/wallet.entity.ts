

export interface IWalletEntity{
    id: string;
    userId: string;
    userType: string; 
    transaction:any[];// 'user' | 'turf'
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}