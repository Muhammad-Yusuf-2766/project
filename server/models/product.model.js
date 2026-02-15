const { Schema, model } = require('mongoose')

const productSchema = new Schema(
	{
		title: { type: String, required: true },
		category: { type: String, required: true },
		price: { type: Number, required: true },
		originalPrice: { type: Number, default: null },
		description: { type: String, required: true },
		images: [{ type: String }],
		unit: { type: String, required: true },
		stock: { type: Number, required: false },
		soldCount: { type: Number, required: false, default: 0 },
		likeCount: { type: Number, required: false, default: null },
	},
	{ timestamps: true },
)

const ProductModel = model('Product', productSchema)

module.exports = ProductModel
