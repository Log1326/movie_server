import express from "express";
import {
    createCategories,
    deleteCategory,
    getCategories,
    updateCategory
} from "../Controllers/CategoriesController.js";
import {admin, protect} from "../Middlewares/Auth.js";

const router = express.Router();
//public route
router.get('/getCategories', getCategories)
//admin routes
router.post('/createCategories', protect, admin, createCategories)
router.put('/updateCategory/:id', protect, admin, updateCategory)
router.delete('/deleteCategory/:id', protect, admin, deleteCategory)
export default router;