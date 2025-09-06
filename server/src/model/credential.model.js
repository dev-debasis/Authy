import mongoose, { Schema } from "mongoose";

const credentialSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    }
},
{
    timestamps: true
})

export const Credential = mongoose.model("Credential", credentialSchema);