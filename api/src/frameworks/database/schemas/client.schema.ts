import { Schema } from 'mongoose';
import { ROLES } from '../../../shared/constants';
import { IClientModel } from "../models/client.model";

export const ClientSchema = new Schema<IClientModel>(
  {
    clientId: { 
      type: String,
      required: true 
    }, 
    name: { 
      type: String, 
      required: false 
    }, 
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: false 
    },
    profileImage: { 
      type: String, 
      required: false 
    },
    googleId: { 
      type: String,
      default: null 
    },
    walletBalance: { 
      type: Number, 
      default: 0 
    },
    joinedAt: { 
      type: Date, 
      default: Date.now 
    },
    role: { 
      type: String, 
      enum: Object.values(ROLES), 
      default: ROLES.USER, 
      required: true 
    },
    bio: { 
      type: String, 
      default: "" 
    },
    isBlocked: { 
      type: Boolean, 
      default: false 
    },
    position: { 
      type: String, 
      required: false 
    },
  },
  { timestamps: true }
);
