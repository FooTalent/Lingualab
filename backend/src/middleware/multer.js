import multer from 'multer'
import path from 'node:path'
import __dirname from '../libraries/utils/dirname.js'
import AppError from '../config/AppError.js'

export const uploader = (folder, maxSize, type) => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(`public/assets/${folder}`))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname)
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * maxSize
    },
    fileFilter: (req, file, cb) => {
        if (!type) return cb(null, true)
        if (type.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(new AppError(`File type not accepted. Expected: ${type}`, 415))
        }
    }
})