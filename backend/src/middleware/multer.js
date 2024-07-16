import multer from 'multer'

export const uploader = (folder) => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `public/assets/${folder}`)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname)
        }
    })
})