const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
// const { getCustomer } = require('../lib/customer')
const categoryModel = require('../models/category.model')
const OrderModel = require('../models/order.model')
const sendOrderToAdmin = require('../services/telegram.service')

class UserController {
	// [GET] /user/products
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
			if (sort === 'all') sortOptions = { createdAt: 1 }
			else if (sort === 'newest') sortOptions = { createdAt: -1 }
			else if (sort === 'best-selling') sortOptions = { soldCount: -1 }
			else if (sort === 'on-sale') {
				query.originalPrice = { $ne: null }
				query.$expr = { $gt: ['$originalPrice', '$price'] }
			}

			const products = await productModel
				.find(query)
				.sort(sortOptions)
				.skip(skipAmount)
				.limit(+pageSize)

			const totalProducts = await productModel.countDocuments(query)
			const isNext = totalProducts > skipAmount + +products.length

			return res.status(200).json({
				success: true,
				meta: {
					page: +page,
					limit: +pageSize,
					total: totalProducts,
					isNext,
				},
				products,
			})
		} catch (error) {
			next(error)
		}
	}

	async getHomeData(req, res, next) {
		try {
			const BASE_MATCH = { category: { $exists: true, $ne: null } }

			// 1) TOP (soldCount > 0 bo'lsa: top pool ichidan random; bo'lmasa: umumiy random)
			const hasSoldCount = await productModel.exists({
				...BASE_MATCH,
				likeCount: { $gt: 0 },
			})

			const topPipeline = hasSoldCount
				? [
						{ $match: { ...BASE_MATCH, likeCount: { $gt: 0 } } },
						{ $sort: { soldCount: -1 } },
						{ $limit: 100 }, // pool (xohlasang 100/300 qil)
						{ $sample: { size: 10 } }, // random 10
					]
				: [
						{ $match: BASE_MATCH },
						{ $sample: { size: 10 } }, // hammasi 0 bo'lsa ham random 10
					]

			const topProducts = await productModel.aggregate(topPipeline)
			// const topIds = topProducts.map(p => p._id)

			// 2) NEW (eng yangilardan pool olib, random 10)
			// top bilan overlap bo'lmasin deb _id: {$nin: topIds} qo'yamiz.
			let newProducts = await productModel.aggregate([
				{ $match: { ...BASE_MATCH } },
				{ $sort: { createdAt: -1 } },
				{ $limit: 100 }, // yangi pool
				{ $sample: { size: 10 } },
			])

			// agar topIds sababli 10 to'lmasa fallback
			if (newProducts.length < 10) {
				newProducts = await productModel.aggregate([
					{ $match: BASE_MATCH },
					{ $sort: { createdAt: -1 } },
					{ $limit: 100 },
					{ $sample: { size: 10 } },
				])
			}

			// 3) categories (hammasi)
			const categories = await categoryModel.find()

			return res.status(200).json({
				success: true,
				topProducts,
				newProducts,
				categories,
			})
		} catch (error) {
			next(error)
		}
	}

	// ======== Old Fields ========= //

	// [GET] /user/product/:id
	async getProduct(req, res, next) {
		try {
			const product = await productModel.findById(req.params.id)
			return res.json({ product })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/profile/:id
	async getUserOrders(req, res, next) {
		try {
			const id = req.user._id
			const orders = await OrderModel.find({ userId: id }).sort({
				createdAt: -1,
			})
			return res.json({ orders })
		} catch (error) {
			next(error)
		}
	}

	// [GET] /user/order/:id
	async getUserOrderById(req, res, next) {
		try {
			const { id } = req.params
			const order = await OrderModel.findById(id)
			return res.json({ order })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/orders
	// async getOrders(req, res, next) {
	// 	try {
	// 		const currentUser = req.user
	// 		// 1: Req queries
	// 		const { searchQuery, filter, page, pageSize } = req.query
	// 		const skipAmount = (+page - 1) * +pageSize
	// 		const matchQuery = { user: currentUser._id }

	// 		// 2: Query implementations
	// 		if (searchQuery) {
	// 			const escapedSearchQuery = searchQuery.replace(
	// 				/[.*+?^${}()|[\]\\]/g,
	// 				'\\$&',
	// 			)
	// 			matchQuery.$or = [
	// 				{ 'product.title': { $regex: new RegExp(escapedSearchQuery, 'i') } },
	// 			]
	// 		}

	// 		// 3: Sort options
	// 		let sortOptions = { createdAt: -1 }
	// 		if (filter === 'newest') sortOptions = { createdAt: -1 }
	// 		else if (filter === 'oldest') sortOptions = { createdAt: 1 }
	// 		const orders = await orderModel.aggregate([
	// 			{
	// 				$lookup: {
	// 					from: 'products',
	// 					localField: 'product',
	// 					foreignField: '_id',
	// 					as: 'product',
	// 				},
	// 			},
	// 			{ $unwind: '$product' },
	// 			{ $match: matchQuery },

	// 			{ $sort: sortOptions },
	// 			{ $skip: skipAmount },
	// 			{ $limit: +pageSize },
	// 			{
	// 				$project: {
	// 					'product.title': 1,
	// 					createdAt: 1,
	// 					updatedAt: 1,
	// 					price: 1,
	// 					status: 1,
	// 				},
	// 			},
	// 		])

	// 		const totalOrders = await orderModel.countDocuments(matchQuery)
	// 		const isNext = totalOrders > skipAmount + orders.length

	// 		return res.json({ orders, isNext })
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }
	// [GET] /user/transactions
	async getTransactions(req, res, next) {
		try {
			const currentUser = req.user
			// 1: Req queries
			const { searchQuery, filter, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize
			const matchQuery = { user: currentUser._id }

			// 2: Query implementations
			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&',
				)
				matchQuery.$or = [
					{ 'product.title': { $regex: new RegExp(escapedSearchQuery, 'i') } },
				]
			}

			// 3: Sort options
			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const transactions = await transactionModel.aggregate([
				{
					$lookup: {
						from: 'products',
						localField: 'product',
						foreignField: '_id',
						as: 'product',
					},
				},
				{ $unwind: '$product' },
				{ $match: matchQuery },
				{ $sort: sortOptions },
				{ $skip: skipAmount },
				{ $limit: +pageSize },
				{
					$project: {
						'product.title': 1,
						'product.category': 1,
						'product.price': 1,
						amount: 1,
						state: 1,
						create_time: 1,
						perform_time: 1,
						cancel_time: 1,
						reaso: 1,
						provider: 1,
					},
				},
			])

			const totalTransactions =
				await transactionModel.countDocuments(matchQuery)
			const isNext = totalTransactions > skipAmount + transactions.length

			return res.json({ transactions, isNext })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/favorites
	async getFavourites(req, res, next) {
		try {
			const currentUser = req.user
			// 1: Req queries
			const { searchQuery, filter, category, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize

			const user = await userModel.findById(currentUser._id)
			const matchQuery = { _id: { $in: user.favorites } }

			// 2: Query implementations
			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&',
				)
				matchQuery.$or = [
					{ title: { $regex: new RegExp(escapedSearchQuery, 'i') } },
				]
			}

			if (category === 'All') matchQuery.category = { $exists: true }
			else if (category !== 'All') {
				if (category) matchQuery.category = category
			}

			// 3: Sort options
			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const products = await productModel
				.find(matchQuery)
				.sort(sortOptions)
				.skip(skipAmount)
				.limit(+pageSize)

			const totalProducts = await productModel.countDocuments(matchQuery)
			const isNext = totalProducts > skipAmount + +products.length
			return res.json({ products, isNext })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/statistics
	async getStatistics(req, res, next) {
		try {
			const userId = req.user._id
			const user = await userModel.findById(userId)

			const totalOrders = await orderModel.countDocuments({ user: user._id })
			const totalTransactions = await transactionModel.countDocuments({
				user: user._id,
			})
			const totalFavourites = user.favorites.length
			const statistics = { totalOrders, totalTransactions, totalFavourites }

			return res.json({ statistics })
		} catch (error) {
			next(error)
		}
	}

	async getCategories(req, res, next) {
		try {
			const categories = await categoryModel.find()
			return res.json({ categories })
		} catch (error) {
			next(error)
		}
	}
	// [POST] /user/add-favorite
	async addFavorite(req, res, next) {
		try {
			console.log('Adding favorite...')
			const { id } = req.params
			const userId = req.user._id
			const isExist = await userModel.findOne({
				_id: userId,
				favorites: id,
			})
			if (isExist)
				return res.status(409).json({ message: 'Already in favorites' })
			const product = await productModel.findById(id)
			if (!product)
				return res.status(404).json({ message: 'Product not found' })
			product.likeCount += 1
			await product.save()
			const user = await userModel.findById(userId)
			user.favorites.push(id)
			await user.save()
			return res.json({ liked: true, likeCount: product.likeCount })
		} catch (error) {
			next(error)
		}
	}

	// [DELETE] /user/delete-favorite/:id
	async deleteFavorite(req, res, next) {
		try {
			console.log('Deleting favorite...')
			const { id } = req.params
			const userId = req.user._id
			const user = await userModel.findById(userId)
			const product = await productModel.findById(id)
			if (!product)
				return res.status(404).json({ message: 'Product not found' })
			product.likeCount = Math.max(0, product.likeCount - 1)
			await product.save()
			user.favorites.pull(id)
			await user.save()
			return res.json({ liked: false, likeCount: product.likeCount })
		} catch (error) {
			next(error)
		}
	}

	// [POST] /user/createOrder
	async createOrder(req, res, next) {
		try {
			const userId = req.user._id
			const {
				fullName,
				items,
				subTotal,
				deliveryPrice,
				totalPrice,
				address,
				customerPhone,
			} = req.body

			if (address === null || address === undefined) {
				return res.json({ failure: 'Address is required' })
			}

			await userModel.findByIdAndUpdate(userId, { address })

			const products = await productModel.find({
				_id: { $in: items.map(i => i.productId) },
			})

			for (const item of items) {
				const product = products.find(p => p._id.toString() === item.productId)
				if (!product) {
					return res.json({
						failure: `Product with ID ${item.productId} not found`,
					})
				}
				if (product.stock < item.quantity) {
					return res.json({
						failure: `Not enough stock for product ${product.title}`,
					})
				}
				product.stock -= item.quantity
				product.soldCount += item.quantity
				await product.save()
			}

			const newOrder = new orderModel({
				userId,
				fullName,
				items,
				subTotal,
				deliveryPrice,
				totalPrice,
				status: 'pending',
				address,
				customerPhone,
			})

			await newOrder.save()

			// Telegram xabar (order fail bo‘lmasin deb try/catch)
			try {
				await sendOrderToAdmin(newOrder, products)
			} catch (e) {
				console.log('Telegram send error:', e)
			}
			return res.json({ order: newOrder })
		} catch (error) {
			console.log(error)
			next(error)
		}
	}

	// [PUT] /user/update-profile
	async updateProfile(req, res, next) {
		try {
			const userId = req.user._id
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			await userModel.findByIdAndUpdate(userId, req.body)
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
	// [PUT] /user/update-password
	async updatePassword(req, res, next) {
		try {
			const { oldPassword, newPassword } = req.body
			const userId = req.user._id
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })

			const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
			if (!isPasswordMatch)
				return res.json({ failure: 'Old password is incorrect' })

			const hashedPassword = await bcrypt.hash(newPassword, 10)
			await userModel.findByIdAndUpdate(userId, { password: hashedPassword })
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
	// [DELETE] /user/delete-favorite/:id
	// async deleteFavorite(req, res, next) {
	// 	try {
	// 		const { id } = req.params
	// 		const userId = req.user._id
	// 		const user = await userModel.findById(userId)
	// 		user.favorites.pull(id)
	// 		await user.save()
	// 		return res.json({ status: 200 })
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }
}

module.exports = new UserController()
