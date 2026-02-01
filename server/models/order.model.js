const { Schema, model } = require('mongoose')

const orderSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		fullName: { type: String, required: true },
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				title: { type: String, required: true },
				quantity: { type: Number, required: true, min: 1, default: 1 },
				unit: { type: String, required: true },
				price: { type: Number, required: true, min: 0 },
				originalPrice: { type: Number, required: false, default: null },
				subPrice: { type: Number, required: false, default: null },
			},
		],
		subTotal: { type: Number, required: true },
		deliveryPrice: { type: Number, required: false, default: 0 },
		totalPrice: { type: Number, required: true, min: 0 },
		status: {
			type: String,
			enum: ['pending', 'sending', 'completed'],
			default: 'pending',
		},
		address: { type: String, required: true },
		customerPhone: { type: String, required: true },
	},
	{ timestamps: true },
)

const OrderModel = model('Order', orderSchema)

module.exports = OrderModel
