import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler";
import User from "../Models/UserModal.js";
import {getSomeCatch} from "../utils/getSomeCatch.js";

export const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}
//protection middleware
export const protect = asyncHandler(async (req, res, next) => {
    let token
    //check if token exists in header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // set token from Bearer token in header
            token = req.headers.authorization.split(' ')[1]
            //verify token and get user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get user id from decoded token
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (e) {
            getSomeCatch(res, 401, 'Not Authorization, token fallen')
        }
    }
    if (!token) {
        getSomeCatch(res, 401, 'Not Authorization, there is not token')
    }
})
//admin checked
export const admin = asyncHandler(async (req, res, next) => {
        req.user.isAdmin && req.user ? next() : getSomeCatch(res, 401, 'Not authorized as an Admin')
})