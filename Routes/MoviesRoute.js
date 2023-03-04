import express from "express";
import {
    createMovie,
    createMovieReview,
    getMovieById,
    getMovies,
    getRandomMovies,
    getTopRatedMovies,
    importMovies, removeAllMovies, removeMovie, updateMovie
} from "../Controllers/MoviesController.js";
import {admin, protect} from "../Middlewares/Auth.js";

const router = express.Router();
//public
router.post('/importMovies', importMovies)
router.get('/getAllMovies', getMovies)
router.get('/getMovieById/:id', getMovieById)
router.get('/getTopRatedMovies', getTopRatedMovies)
router.get('/getRandomMovies', getRandomMovies)
//private
router.post('/createMovieReview/:id', protect, createMovieReview)
router.put('/updateMovie/:id', protect, admin, updateMovie)
router.delete('/removeMovie/:id', protect, admin, removeMovie)
router.delete('/removeAllMovies', protect, admin, removeAllMovies)
router.post('/createMovie', protect, createMovie)


//admin
export default router;