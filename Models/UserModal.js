import mongoose from "mongoose";
import {objString, objStringAndTrue} from "../utils/schemaObj.js";

const UserSchema = new mongoose.Schema({
    fullName: objStringAndTrue,
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true
    },
    password: objStringAndTrue,
    images: objString,
    isAdmin: {
        type: Boolean,
        default: false
    },
    likedMovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies'
    }]
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema)