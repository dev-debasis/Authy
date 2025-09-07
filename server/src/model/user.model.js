import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    isPasswordEnabled: {
        type: Boolean,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    hasImage: {
        type: Boolean,
    },
    avatarUrl: {
        type: String,
        default: "https://res.cloudinary.com/debasiskhamari/image/upload/v1757101137/0684456b-aa2b-4631-86f7-93ceaf33303c_hr137w.jpg",
    },
    lastLoginAt: {
        type: Date,
        default: null,
    },
    lastActiveAt: {
        type: Date,
        default: null,
    }
},
{
    timestamps: true
})

export const User = mongoose.model("User", userSchema);