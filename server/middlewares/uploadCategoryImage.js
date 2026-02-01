// middlewares/uploadCategoryImage.js
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const PRODUCTS_DIR = path.join(process.cwd(), 'static', 'products')

if (!fs.existsSync(PRODUCTS_DIR)) {
	fs.mkdirSync(PRODUCTS_DIR, { recursive: true })
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, PRODUCTS_DIR),
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase()
		const safeExt = ext || '.jpg'
		const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
		cb(null, `product-${unique}${safeExt}`)
	},
})

const fileFilter = (req, file, cb) => {
	if (!file.mimetype?.startsWith('image/')) {
		return cb(new Error('Faqat rasm fayllarini yuklash mumkin'), false)
	}
	cb(null, true)
}

const uploadProductImages = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // 3MB
})

module.exports = uploadProductImages
