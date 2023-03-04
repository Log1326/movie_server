import asyncHandler from "express-async-handler";
import Categories from "../Models/CategoriesModal.js";
import {getSomeCatch} from "../utils/getSomeCatch.js";

export const getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Categories.find({})
        res.status(200).json(categories)
    } catch (e) {
        res.status(400).json({message: error.message})
    }
})
//admin
export const createCategories = asyncHandler(async (req, res) => {
    try {
        const {title} = req.body
        const category = new Categories({title})
        const createdCategories = await category.save()
        res.status(201).json(createdCategories)
    } catch (e) {
        res.status(400).json({message: error.message})
    }
})
export const updateCategory = asyncHandler(async (req, res) => {
    console.log(req.params)
    try {
        const category = await Categories.findById(req.params.id)
        if (category) {
            category.title = req.body.title || category.title
            const updateCategory = await category.save();
            res.status(200).json(updateCategory)
        } else getSomeCatch(res, 404, 'Not found category')
    } catch (e) {
        res.status(400).json({message: error.message})
    }
})
export const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id)
        if (category) {
            category.remove()
            res.status(200).json({message: 'Category remove successfully'})
        } else getSomeCatch(res, 404, 'Category not found')
    } catch (e) {
        res.status(400).json({message: error.message})
    }
})