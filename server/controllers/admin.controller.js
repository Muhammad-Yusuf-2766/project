const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const orderModel = require('../models/order.model')
const categoryModel = require('../models/category.model')
const { deleteFilesFromProductsDir } = require('../lib/image')

class AdminController {
	constructor() {}

	getMonthRange = monthStr => {
		const [y, m] = String(monthStr).split('-').map(Number)
		if (!y || !m || m < 1 || m > 12) return null

		const start = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0))
		const end = new Date(Date.UTC(y, m, 1, 0, 0, 0))
		return { start, end }
	}

	getLastNDaysRange = days => {
		const end = new Date()
		const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000)
		return { start, end }
	}

	calcGrowthPercent = (current, previous) => {
		const cur = Number(current) || 0
		const prev = Number(previous) || 0
		if (prev === 0) return cur > 0 ? 100 : 0
		return Number((((cur - prev) / prev) * 100).toFixed(2))
	}

	// [GET] /admin/sales?month=2026-02
	getAdminSales = async (req, res, next) => {
		try {
			const { month } = req.query

			// const matchBase = { status: '' }

			// growth uchun current/prev range
			let currentRange, prevRange

			if (month) {
				currentRange = this.getMonthRange(month)
				if (!currentRange) {
					return res.status(400).json({
						success: false,
						message: 'month formati YYYY-MM bo‘lishi kerak. Masalan: 2026-02',
					})
				}

				const prevEnd = currentRange.start
				const prevStart = new Date(
					Date.UTC(
						prevEnd.getUTCFullYear(),
						prevEnd.getUTCMonth() - 1,
						1,
						0,
						0,
						0,
					),
				)
				prevRange = { start: prevStart, end: prevEnd }
			} else {
				// default growth: last 30 days vs previous 30 days
				currentRange = this.getLastNDaysRange(30)
				prevRange = {
					start: new Date(
						currentRange.start.getTime() - 30 * 24 * 60 * 60 * 1000,
					),
					end: currentRange.start,
				}
			}

			const sumPipeline = range => [
				{
					$match: {
						// ...matchBase,
						createdAt: { $gte: range.start, $lt: range.end },
					},
				},
				{ $group: { _id: null, total: { $sum: '$totalPrice' } } },
			]

			const allTimePipeline = [
				// { $match: matchBase },
				{ $group: { _id: null, total: { $sum: '$totalPrice' } } },
			]

			const [currentAgg, prevAgg, allTimeAgg] = await Promise.all([
				orderModel.aggregate(sumPipeline(currentRange)),
				orderModel.aggregate(sumPipeline(prevRange)),
				orderModel.aggregate(allTimePipeline),
			])

			const currentSales = currentAgg?.[0]?.total ?? 0
			const prevSales = prevAgg?.[0]?.total ?? 0
			const allTimeSales = allTimeAgg?.[0]?.total ?? 0

			const salesToShow = month ? currentSales : allTimeSales
			const growthPercent = this.calcGrowthPercent(currentSales, prevSales)

			return res.status(200).json({
				success: true,
				sales: {
					totalSales: salesToShow,
					growthPercent,
					// frontendga qulay bo‘lsin:
					mode: month ? 'month' : 'all',
					month: month ? String(month) : null,
				},
			})
		} catch (error) {
			next(error)
		}
	}

	// [GET] /admin/overview
	async getAdminOverview(req, res, next) {
		try {
			const [
				totalProducts,
				totalOrders,
				newProducts,
				updatedProductsRaw,
				recentOrders,
			] = await Promise.all([
				productModel.countDocuments({}),
				orderModel.countDocuments({}),

				productModel
					.find({})
					.sort({ createdAt: -1 })
					.limit(3)
					.select('title createdAt'),
				productModel
					.find({})
					.sort({ updatedAt: -1 })
					.limit(10)
					.select('title createdAt updatedAt'),

				orderModel
					.find({})
					.sort({ updatedAt: -1 })
					.limit(3)
					.select('status updatedAt totalPrice'),
			])

			// faqat real update bo‘lgan productlar
			const updatedProducts = (updatedProductsRaw || [])
				.filter(
					p =>
						p.updatedAt &&
						p.createdAt &&
						new Date(p.updatedAt) - new Date(p.createdAt) > 2000,
				)
				.slice(0, 3)

			const activities = [
				...newProducts.map(p => ({
					type: 'product_created',
					message: "Yangi mahsulot qo'shildi",
					detail: p.title,
					at: p.createdAt,
				})),
				...recentOrders.map(o => ({
					type: 'order_updated',
					message:
						o.status === 'completed'
							? 'Buyurtma yakunlandi'
							: 'Buyurtma yangilandi',
					detail: o.status === 'completed' ? o.totalPrice : o.status,
					at: o.updatedAt,
				})),
				...updatedProducts.map(p => ({
					type: 'product_updated',
					message: "Mahsulot ma'lumotlari yangilandi",
					detail: p.title,
					at: p.updatedAt,
				})),
			]
				.sort((a, b) => new Date(b.at) - new Date(a.at))
				.slice(0, 5)

			return res.status(200).json({
				success: true,
				overview: {
					totalProducts,
					totalOrders,
				},
				recentActivity: activities,
			})
		} catch (error) {
			next(error)
		}
	}

	// [GET] /admin/products
	async getProducts(req, res, next) {
		try {
			const { searchQuery, sort, category, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize
			const query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&',
				)
				query.$or = [{ title: { $regex: new RegExp(escapedSearchQuery, 'i') } }]
			}

			if (category === 'all') query.category = { $exists: true }
			else if (category !== 'all') {
				if (category) query.category = category
			}

			let sortOptions = { createdAt: -1 }
			if (sort === 'newest') sortOptions = { createdAt: -1 }
			else if (sort === 'oldest') sortOptions = { createdAt: 1 }
			else if (sort === 'best-selling')
				sortOptions = { soldCount: -1, createdAt: -1 }
			else if (sort === 'on-sale') {
				query.originalPrice = { $ne: null }
				query.$expr = { $gt: ['$originalPrice', '$price'] }
			}

			// 3) products aggregation
			const products = await productModel.aggregate([
				{ $match: query },

				// soldCount hisoblash uchun orders bilan lookup
				{
					$lookup: {
						from: 'orders', // Mongoose collection nomi odatda plural bo'ladi
						// Mahsulot ID sini order items ichida productId bilan solishtirish uchun pipeline ishlatamiz
						let: { pid: '$_id' },
						pipeline: [
							// items array'ini unwind qilib, har bir item uchun productId ni tekshiramiz
							{ $unwind: '$items' },
							{
								$match: {
									$expr: { $eq: ['$items.productId', '$$pid'] },
								},
							},
							{
								$group: {
									_id: null,
									soldCount: { $sum: '$items.quantity' },
								},
							},
						],
						as: 'soldMeta',
					},
				},

				// soldCount ni productga field qilib qo'shish
				{
					$addFields: {
						soldCount: {
							$ifNull: [{ $arrayElemAt: ['$soldMeta.soldCount', 0] }, 0],
						},
					},
				},
				{ $project: { soldMeta: 0 } },

				{ $sort: sortOptions },
				{ $skip: skipAmount },
				{ $limit: +pageSize },
			])

			// total count (pagination uchun)
			const totalProducts = await productModel.countDocuments(query)
			const isNext = totalProducts > skipAmount + products.length

			return res.status(200).json({
				success: true,
				meta: {
					page,
					limit: pageSize,
					total: totalProducts,
					isNext,
				},
				products,
			})
		} catch (error) {
			next(error)
		}
	}
	// [GET] /admin/customers
	async getCustomers(req, res, next) {
		try {
			// get incoming queries
			const { searchQuery, sort, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize
			const query = { role: 'customer' }

			// Query implementations
			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&',
				)
				query.$or = [
					{ fullName: { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ phone: { $regex: new RegExp(escapedSearchQuery, 'i') } },
				]
			}

			// Sort options
			let sortOptions = { createdAt: -1 }
			if (sort === 'newest') sortOptions = { createdAt: -1 }
			else if (sort === 'oldest') sortOptions = { createdAt: 1 }

			const [total, customers] = await Promise.all([
				userModel.countDocuments(query),
				userModel
					.find(query)
					.select('-password')
					.sort(sortOptions)
					.skip(skipAmount)
					.limit(pageSize)
					.lean(),
			])

			// 5) isNext
			const isNext = total > skipAmount + +customers.length

			return res.status(200).json({
				success: true,
				meta: {
					page,
					limit: +pageSize,
					total,
					isNext,
				},
				customers,
			})
		} catch (error) {
			next(error)
		}
	}
	// [GET] /admin/orders
	async getOrders(req, res, next) {
		try {
			// 1) Query params
			const { searchQuery, sort, status, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize

			// 2) Build Mongo query
			const query = {}

			// status filter
			const statusRaw = String(req.query.status ?? 'all').trim()
			const allowedStatuses = new Set([
				'all',
				'pending',
				'sending',
				'completed',
			])
			if (!allowedStatuses.has(statusRaw)) {
				return res
					.status(400)
					.json({ success: false, message: `Invalid status: ${statusRaw}` })
			}
			if (statusRaw !== 'all') query.status = statusRaw

			// search (fullName, items.productTitle bo'yicha)
			if (searchQuery && String(searchQuery).trim()) {
				const search = String(searchQuery).trim()
				query.$or = [
					{ fullName: { $regex: search, $options: 'i' } },
					{ customerPhone: { $regex: search, $options: 'i' } },
					{ 'items.title': { $regex: search, $options: 'i' } },
				]
			}

			// sort mapping
			const sortRaw = String(req.query.sort ?? 'newest')
			const sortMap = {
				newest: '-createdAt',
				oldest: 'createdAt',
				highest: '-totalPrice',
				lowest: 'totalPrice',
			}
			const sortValue = sortMap[sortRaw] ?? '-createdAt'

			// 4) fetch
			const [totalOrders, orders] = await Promise.all([
				orderModel.countDocuments(query),
				orderModel
					.find(query)
					.sort(sortValue)
					.skip(skipAmount)
					.limit(pageSize)
					.lean(),
			])

			// 5) isNext
			const isNext = totalOrders > skipAmount + orders.length

			return res.status(200).json({
				success: true,
				meta: {
					page,
					limit: +pageSize,
					total: totalOrders,
					isNext,
				},
				orders,
			})
		} catch (error) {
			next(error)
		}
	}

	// [POST] /admin/create-product
	async createProduct(req, res, next) {
		try {
			const {
				title,
				category,
				description,
				unit,
				price,
				originalPrice,
				stock,
			} = req.body

			// Basic validation
			if (!title?.trim()) {
				return res
					.status(400)
					.json({ success: false, message: 'Title majburiy' })
			}
			if (!category?.trim()) {
				return res
					.status(400)
					.json({ success: false, message: 'Category majburiy' })
			}

			// multer files => req.files (array)
			const files = Array.isArray(req.files) ? req.files : []

			// max 4 (multer limit bo'lsa ham, safety)
			if (files.length > 4) {
				return res.status(400).json({
					success: false,
					message: "Ko'pi bilan 4 ta rasm yuklash mumkin",
				})
			}

			// Images URL/path array (static serve qilingan bo'lishi kerak)
			// app.use("/static", express.static("static"))
			const images = files.map(f => f.filename)

			// Number parsing (form-data hammasi string bo'ladi)
			const parsedPrice = Number(price)
			const parsedStock = Number(stock)

			if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
				return res
					.status(400)
					.json({ success: false, message: "Price noto'g'ri" })
			}
			if (Number.isNaN(parsedStock) || parsedStock < 0) {
				return res
					.status(400)
					.json({ success: false, message: "Stock noto'g'ri" })
			}

			const parsedOriginalPrice =
				originalPrice !== undefined &&
				originalPrice !== null &&
				String(originalPrice).trim() !== ''
					? Number(originalPrice)
					: undefined

			if (
				parsedOriginalPrice !== undefined &&
				(Number.isNaN(parsedOriginalPrice) || parsedOriginalPrice < 0)
			) {
				return res
					.status(400)
					.json({ success: false, message: "Original price noto'g'ri" })
			}

			const product = await productModel.create({
				title: title.trim(),
				category: category.trim(),
				description: description?.trim() || '',
				unit: unit?.trim() || 'kg',

				price: parsedPrice,
				originalPrice: parsedOriginalPrice,
				stock: parsedStock,

				images, // ✅ string[]
				// soldCount default 0 bo'lsa schema'da turadi
			})

			return res.status(201).json({
				success: true,
				product,
			})
		} catch (error) {
			next(error)
		}
	}

	// [POST] /admin/create-category
	async createCategory(req, res, next) {
		try {
			const data = req.body
			const isExist = await categoryModel.findOne({ slug: data.slug })
			if (isExist) {
				return res.status(409).json({ message: 'Bunday kategoriya mavjud' })
			}
			const newCategory = await categoryModel.create(data)
			if (!newCategory) {
				return res
					.status(500)
					.json({ message: 'Kategoriya yaratishda xatolik' })
			}
			return res.status(201).json({
				message: 'Kategoriya yaratildi',
				data: newCategory, // optional, lekin admin panelga juda kerak bo‘ladi
			})
		} catch (error) {
			next(error)
		}
	}

	// async createOrder(req, res, next) {
	// 	try {
	// 		const data = req.body
	// 		const newProduct = await orderModel.create(data)
	// 		if (!newProduct)
	// 			return res.json({ failure: 'Failed while creating order' })
	// 		return res.json({ status: 201 })
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }

	// [PUT] /admin/update-product/:id
	async updateProduct(req, res, next) {
		try {
			let {
				title,
				category,
				description,
				unit,
				price,
				originalPrice,
				stock,
				images,
				deletingImages,
			} = req.body

			const id = req.params.id

			// Agar frontend JSON string yuborsa:
			if (typeof images === 'string') images = JSON.parse(images)
			if (typeof deletingImages === 'string')
				deletingImages = JSON.parse(deletingImages)

			images = Array.isArray(images) ? images : []
			deletingImages = Array.isArray(deletingImages) ? deletingImages : []

			// YANGI upload qilinganlar
			const newUploads = (req.files || []).map(f => f.filename)

			// DB ga yoziladigan images: (qoladigan eski images) + (yangi upload)
			// (agar images frontenddan "qoladiganlar" sifatida kelayotgan bo'lsa shu yetadi)
			const updatedImages = [...images, ...newUploads]

			const updatedProduct = await productModel.findByIdAndUpdate(
				id,
				{
					title,
					category,
					description,
					unit,
					price: Number(price),
					originalPrice: originalPrice ? Number(originalPrice) : undefined,
					stock: Number(stock),
					images: updatedImages,
				},
				{ new: true },
			)

			if (!updatedProduct) {
				return res
					.status(400)
					.json({ failure: 'Mahsulotni tahrirlashda hatolik' })
			}

			// DB update muvaffaqiyatli bo'lgandan keyin fayllarni o'chiramiz
			await deleteFilesFromProductsDir(deletingImages)

			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}

	// [PUT] /admin/update-order/:id
	async updateOrder(req, res, next) {
		try {
			const { status } = req.body
			const { id } = req.params
			const updatedOrder = await orderModel.findByIdAndUpdate(id, { status })

			if (!updatedOrder)
				return res.status(400).json({ failure: 'Failed while updating order' })
			return res.status(200).json({ success: 'Order updated successfully' })
		} catch (error) {
			next(error)
		}
	}

	// [DELETE] /admin/delete-product/:id
	async deleteProduct(req, res, next) {
		try {
			const { id } = req.params
			const product = await productModel.findByIdAndDelete(id)
			if (!product)
				return res
					.status(401)
					.json({ failure: true, message: 'Mahsulotni o`chirishda hatolik' })
			return res
				.status(200)
				.json({ success: true, message: 'Mahsulot o`chirildi' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AdminController()
