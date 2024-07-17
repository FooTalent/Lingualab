import multer from 'multer'
import path from 'node:path'
import __dirname from '../libraries/utils/dirname.js'

export const uploader = (folder) => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, `public/assets/${folder}`))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname)
        }
    })
})