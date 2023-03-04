import express from "express";
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import storage from '../config/firebaseStorage.js'
import {getSomeCatch} from "../utils/getSomeCatch.js";

const uploadRouter = express.Router()
const upload = multer({
    storage: multer.memoryStorage()
})
uploadRouter.post('/', upload.single('file'), async (req, res) => {
    try {
        //get file from req
        const file = req.file
        //create new filename
        if (file) {
            const fileName = `${uuidv4()}${path.extname(file.originalname)}`
            const blob = storage.file(fileName)
            const blobStream = blob.createWriteStream({
                resumable: false,
                metadata: {
                    contentType: file.mimetype
                }
            })
            //if error
            blobStream.on('error', (error) => {
                res.status(400).json({message: error.message +'<=:://this error'})
            })
            //if success
            blobStream.on('finish', () => {
                //get the public URL
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`
                // return the file name and its public URL
                res.status(200).json(publicUrl)
            })
            blobStream.end(file.buffer)
            //when there is no file
        } else getSomeCatch(res, 400, 'Please upload a file')
    } catch (e) {
        res.status(400).json(e.message)
    }
})

export default uploadRouter;