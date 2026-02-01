require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error.middleware')
const path = require('path')

const app = express()

// Webhook

// Middleware
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static(path.join(process.cwd(), 'static')))

// Routes
app.use('/api', require('./routes/index.route'))

// Error handling
app.use(errorMiddleware)

const bootstrap = async () => {
	console.log('CLIENT_URL =', process.env.CLIENT_URL)
	try {
		const PORT = process.env.PORT || 5000
		mongoose
			.connect(process.env.MONGO_URI)
			.then(() => console.log('Connected to MongoDB'))
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	} catch (error) {
		console.log('Error connecting to MongoDB:', error)
	}
}

bootstrap()

// https://www.mongodb.com/try/download/community - Download MongoDB Community Server
// https://www.mongodb.com/try/download/compass - Download MongoDB Compass
