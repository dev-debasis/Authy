import mongoose, { Schema } from "mongoose";
import { encrypt, decrypt } from "../utils/crypto";

const credentialSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
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
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    tags: {
        type: [String],
        default: [],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true
})

credentialSchema.pre("save", async function(next) {
    if(!this.isModified(this.password)) next();
    this.password = encrypt(this.password);
    next();
});

credentialSchema.methods.getDecryptedPassword = () => {
    return decrypt(this.password);
}

export const Credential = mongoose.model("Credential", credentialSchema);