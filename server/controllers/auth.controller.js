const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signToken = user => {
	return jwt.sign(
		{ id: user._id, role: user.role }, // payload (xohlasang role ni olib tashla)
		process.env.JWT_SECRET,
		{ expiresIn: '7d' },
	)
}

class AuthController {
	async login(req, res, next) {
		try {
			const { phone, password } = req.body

			const user = await userModel.findOne({ phone })
			if (!user) return res.status(404).json({ failure: 'User not found' })

			const isValidPassword = await bcrypt.compare(password, user.password)
			if (!isValidPassword)
				return res.status(401).json({ failure: 'Password is incorrect' })

			if (user.isDeleted)
				return res.status(403).json({
					failure: `User is deleted at ${user.deletedAt.toLocaleString()}`,
				})

			const token = signToken(user)

			// passwordni response’dan olib tashlash
			const safeUser = user.toObject()
			delete safeUser.password

			return res.json({ user: safeUser, token })
		} catch (error) {
			next(error)
		}
	}

	async register(req, res, next) {
		try {
			console.log('register')
			const { fullName, phone, password } = req.body

			const user = await userModel.findOne({ phone })
			if (user)
				return res.status(409).json({
					failure:
						'Bu raqam bilan ro`yxatdan o`tilgan. Iltimos boshqa raqam kiriting',
				})

			const hashedPassword = await bcrypt.hash(password, 10)

			const newUser = await userModel.create({
				phone,
				password: hashedPassword,
				fullName,
			})

			const token = signToken(newUser)

			const safeUser = newUser.toObject()
			delete safeUser.password

			return res.status(201).json({ user: safeUser, token })
		} catch (error) {
			next(error)
		}
	}

	async checkMe(req, res) {
		try {
			console.log('request: Check me')

			const header = req.headers.authorization || ''
			const [type, token] = header.split(' ')

			if (type !== 'Bearer' || !token) {
				return res.status(401).json({ message: 'No token provided' })
			}

			const payload = jwt.verify(token, process.env.JWT_SECRET) // { id, role, iat, exp }

			const user = await userModel.findById(payload.id).select('-password')
			if (!user) {
				return res.status(401).json({ message: 'User not found' })
			}

			return res.json({ state: 'success', user })
		} catch (error) {
			console.log(error)

			// token expired bo'lsa 401 qaytargan yaxshiroq
			if (
				error?.name === 'TokenExpiredError' ||
				error?.name === 'JsonWebTokenError'
			) {
				return res.status(401).json({ message: 'Token invalid or expired' })
			}

			return res.status(500).json({ message: 'Server error' })
		}
	}
}

module.exports = new AuthController()
