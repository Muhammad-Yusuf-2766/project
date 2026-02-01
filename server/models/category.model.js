const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
	title: { type: String, required: true },
	slug: { type: String, required: true },
	image: { type: String, required: false },
	description: { type: String, required: false },
})

categorySchema.index({ slug: 1 }, { unique: true })

const CategoryModel = model('Category', categorySchema)

module.exports = CategoryModel
