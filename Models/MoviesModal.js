import mongoose from "mongoose";
import {
    objCasts,
    objNumAndTrue,
    objNumAndTrueDefault,
    objString,
    objStringAndTrue,
    objUserId,
    objUserIdAndTrue
} from "../utils/schemaObj.js";

const reviewSchema = new mongoose.Schema({
        userName: objStringAndTrue,
        userImage: objString,
        rating: objNumAndTrue,
        comment: objStringAndTrue,
        userId: objUserIdAndTrue,
    },
    {
        timestamps: true
    }
)

const MoviesSchema = new mongoose.Schema({
        userId: objUserId,
        name: objStringAndTrue,
        desc: objStringAndTrue,
        titleImage: objStringAndTrue,
        image: objStringAndTrue,
        category: objStringAndTrue,
        language: objStringAndTrue,
        year: objNumAndTrue,
        time: objNumAndTrue,
        video: objString,
        rate: objNumAndTrueDefault,
        numberOfReviews: objNumAndTrueDefault,
        reviews: [reviewSchema],
        casts: [objCasts]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Movies', MoviesSchema)