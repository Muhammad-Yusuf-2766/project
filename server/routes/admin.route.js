const adminController = require('../controllers/admin.controller')
const adminMiddleware = require('../middlewares/admin.middleware')
const uploadProductImages = require('../middlewares/uploadCategoryImage')

const router = require('express').Router()

router.get('/products', adminController.getProducts)
router.get('/customers', adminController.getCustomers)
router.get('/orders', adminController.getOrders)

router.post(
	'/create-product',
	uploadProductImages.array('images', 4),
	adminController.createProduct,
)
router.post('/create-category', adminController.createCategory)
// router.post('/create-order', adminController.createOrder)

router.put(
	'/update-product/:id',
	uploadProductImages.array('images', 4),
	adminController.updateProduct,
)
router.put('/update-order/:id', adminController.updateOrder)

router.delete('/delete-product/:id', adminController.deleteProduct)

module.exports = router
