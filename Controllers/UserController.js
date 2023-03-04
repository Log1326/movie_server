import asyncHandler from 'express-async-handler';
import bcrypt from "bcryptjs";
import User from "../Models/UserModal.js";
import {getSomeCatch} from "../utils/getSomeCatch.js";
import {getSomeData} from "../utils/getSomeData.js";

export const registerUser = asyncHandler(async (req, res) => {
    const {fullName, email, password, image} = req.body
    try {
        const userExists = await User.findOne({email});
        if (userExists) getSomeCatch(res, 400, 'User already exists')
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({fullName, email, password: hashedPassword, image})
        const data = getSomeData(newUser)
        if (newUser) res.status(201).json(data)
        else getSomeCatch(res, 400, 'Invalid user data')
    } catch (e) {
        res.status(400).json({message: e.message})
        console.log(e.message)
    }
})
export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    try {
        const oldUser = await User.findOne({email});
        if (!oldUser) getSomeCatch(res, 400, 'user not found')
        const pass = await bcrypt.compare(password, oldUser.password)
        if (!pass) getSomeCatch(res, 400, 'password wrong')
        const data = getSomeData(oldUser)
        return res.status(200).json({data})
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const updateProfile = asyncHandler(async (req, res) => {
    const {fullName, email, image} = req.body;
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            user.fullName = fullName || user.fullName
            user.email = email || user.email
            user.image = image || user.image
            const updateUser = await user.save()
            const data = getSomeData(updateUser)
            res.status(201).json(data)
        } else getSomeCatch(res, 404, 'User not found')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            if (user.isAdmin) getSomeCatch(res, 400, 'Can\'t delete admin user')
            await user.remove();
            res.status(200).json({message: 'user deleted successfully'})
        } else getSomeCatch(res, 404, 'User not found')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const changeUserPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body
    try {
        const user = await User.findById(req.user._id);
        const changePassword = await bcrypt.compare(oldPassword, user.password)
        if (user && changePassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedPassword
            await user.save();
            res.status(201).json({message: 'Password changed successfully'})
        } else getSomeCatch(res, 400, 'old password invalid')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const getLikedMovies = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('likedMovies')
        if (user) {
            res.status(200).json(user.likedMovies)
        } else getSomeCatch(404, 'User not found')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const addLikeMovie = asyncHandler(async (req, res) => {
    const {movieId} = req.body
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            console.log(user.likedMovies.includes(movieId))
            !user.likedMovies.includes(movieId) ?
                user.likedMovies.push(movieId) : getSomeCatch(res, 400, 'Movie already liked')
            await user.save();
            res.status(200).json(user.likedMovies)
        } else getSomeCatch(res, 404, 'Movie not found')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const deleteAllLikedMovies = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            user.likedMovies = []
            await user.save();
            res.status(200).json({message: 'All liked movies deleted successfully'})
        } else getSomeCatch(res, 404, 'User not found')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const deleteUser = asyncHandler(async (req, res) => {
    try {
        const userID = req.params.id
        const user = await User.findById(userID)
        if (user) {
            if (user.isAdmin) getSomeCatch(res, 400, "Can't delete admin user")
            await user.remove()
            res.status(200).json({message: 'User deleted successfully'})
        } else getSomeCatch(res, 404, 'user not found')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})