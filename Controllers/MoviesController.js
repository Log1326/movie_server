import asyncHandler from "express-async-handler";
import Movies from "../Models/MoviesModal.js";
import {MoviesData} from "../data/MoviesData.js";
import {getSomeCatch} from "../utils/getSomeCatch.js";

export const importMovies = asyncHandler(async (req, res) => {
    await Movies.deleteMany({});
    const movies = await Movies.insertMany(MoviesData)
    res.status(201).json(movies)
})
export const getMovies = asyncHandler(async (req, res) => {
    const {category, time, language, rate, year, search} = req.query
    try {
        let query = {
            ...(category && {category: {$regex: category, $options: 'i'}}),
            ...(time && {time}),
            ...(language && {language}),
            ...(rate && {rate}),
            ...(year && {year}),
            ...(search && {name: {$regex: search, $options: 'i'}}),
        }
        const page = Number(req.query.pageNumber) || 1
        const limit = 2
        const skip = (page - 1) * limit
        console.log(skip)
        const movies = await Movies
            .find(query)
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
        const count = await Movies.countDocuments(query)
        res.status(200).json({
            movies,
            page,
            pages: Math.ceil(count / limit),
            totalMovies: count
        })
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const getMovieById = asyncHandler(async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id)
        movie ?
            res.status(200).json(movie)
            :
            getSomeCatch(res, 404, 'Movie is not found')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        const movies = await Movies.find({}).sort({rate: -1}).limit(10)
        res.status(200).json(movies)
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const getRandomMovies = asyncHandler(async (req, res) => {
    try {
        const movies = await Movies.aggregate([{$sample: {size: 3}}])
        res.status(200).json(movies)
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
//private
export const createMovieReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body
    try {
        const movie = await Movies.findById(req.params.id)
        if (movie) {
            const alreadyReviewed = movie.reviews.find((film) => film.userId.toString() === req.user._id.toString())
            alreadyReviewed && getSomeCatch(res, 400, 'you already reviewed this movie')
            const review = {
                userName: req.user.fullName,
                userImage: req.user.image || '',
                rating: +rating,
                comment,
                userId: req.user._id,
            }
            movie.reviews.push(review)
            movie.numberOfReviews = movie.reviews.length
            movie.rate = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length
            await movie.save()
            res.status(201).json({message: 'review added'})
        } else getSomeCatch(res, 404, 'Movie not found')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
//admin
export const updateMovie = asyncHandler(async (req, res) => {
    const getReq = req.body
    try {
        const movie = await Movies.findById(req.params.id)
        if (movie) {
            movie.name = getReq.name || movie.name
            movie.desc = getReq.desc || movie.desc
            movie.image = getReq.image || movie.image
            movie.titleImage = getReq.titleImage || movie.titleImage
            movie.rate = getReq.rate || movie.rate
            movie.numberOfReviews = getReq.numberOfReviews || movie.numberOfReviews
            movie.category = getReq.category || movie.category
            movie.time = getReq.time || movie.time
            movie.language = getReq.language || movie.language
            movie.video = getReq.video || movie.video
            movie.year = getReq.year || movie.year
            movie.casts = getReq.casts || movie.casts
            const updateMovie = await movie.save()
            res.status(201).json(updateMovie)
        } else getSomeCatch(res, 404, 'Movie not found')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const removeMovie = asyncHandler(async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id)
        if (movie) {
            await movie.remove()
            res.status(200).json({message: 'remove this movie wa successfully'})
        } else getSomeCatch(res, 404, 'Not found movie')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const removeAllMovies = asyncHandler(async (req, res) => {
    try {
        await Movies.deleteMany({})
        res.status(200).json({message: 'All movies was remove!'})
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})
export const createMovie = asyncHandler(async (req, res) => {
    const {
        name,
        desc,
        image,
        titleImage,
        rate,
        numberOfReviews,
        category,
        time,
        language,
        video,
        year,
        casts,
    } = req.body
    try {
        const movie = new Movies({
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            video,
            year,
            casts,
            userId: req.user._id
        })
        if (movie) {
            const createdMovie = await movie.save()
            res.status(201).json(createdMovie)
        } else getSomeCatch(res, 400, 'Invalid movie data')
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})