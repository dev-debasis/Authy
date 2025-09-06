import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        select: false,
    },
    authProvider: {
        type: String,
        required: true,
        enum: ["local", "google", "apple", "facebook"],
        default: "local",
    },
    authProviderId: {
        type: String,
        default: null,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    avatarUrl: {
        type: String,
        default: "https://res.cloudinary.com/debasiskhamari/image/upload/v1757101137/0684456b-aa2b-4631-86f7-93ceaf33303c_hr137w.jpg",
    },
    lastLoginAt: {
        type: Date,
        default: null,
    }
},
{
    timestamps: true
})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);