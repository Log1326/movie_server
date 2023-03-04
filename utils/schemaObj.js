import mongoose from "mongoose";

const objStringAndTrue = {
    type: String,
    required: true
}
const objString = {type: String}
const objNumAndTrue = {
    type: Number,
    required: true
}
const objNumAndTrueDefault = {
    type: Number,
    required: true,
    default: 0
}
const objUserId = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}
const objUserIdAndTrue = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}
const objCasts = {
    name: objStringAndTrue,
    image: objStringAndTrue
}
export {
    objNumAndTrueDefault,
    objNumAndTrue,
    objString,
    objUserId,
    objStringAndTrue,
    objUserIdAndTrue,
    objCasts
}