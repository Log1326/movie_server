import express from "express";
import {
    registerUser,
    loginUser,
    updateProfile,
    deleteUserProfile,
    changeUserPassword, getLikedMovies, addLikeMovie, deleteAllLikedMovies, getUsers, deleteUser
} from "../Controllers/UserController.js";
import {admin, protect} from "../Middlewares/Auth.js";

const router = express.Router();
// public routers
router.post('/register', registerUser)
router.post('/login', loginUser)
// private routers
router.put('/updateProfile', protect, updateProfile)
router.delete('/delete', protect, deleteUserProfile)
router.put('/changePassword', protect, changeUserPassword)
router.get('/favorites', protect, getLikedMovies)
router.post('/likedMovie', protect, addLikeMovie)
router.delete('/removeAllLikedMovies', protect, deleteAllLikedMovies)
//admin routers
router.get('/allUsers', protect,admin, getUsers)
router.delete('/deleteUser/:id', protect, admin, deleteUser)
export default router;