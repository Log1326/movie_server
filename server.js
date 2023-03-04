import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import dotenv from 'dotenv';
import {connectDB} from './config/db.js'
import CategoryRoutes from './Routes/CategoriesRoute.js'
import UserRoutes from './Routes/UserRoute.js'
import MoviesRoutes from './Routes/MoviesRoute.js'
import UploadFileRoutes from './Controllers/fileUpload.js'
import {errorHandler} from "./Middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//ROUTES
app.use('/api/users', UserRoutes)
app.use('/api/movies', MoviesRoutes)
app.use('/api/categories', CategoryRoutes)
app.use('/api/uploadFile', UploadFileRoutes)

//ERROR HANDLER
app.use(errorHandler);
app.listen(PORT, async () => {
    console.log(`server running in http://localhost:${PORT}`)
    await connectDB(process.env.MONGO_URL);
})
