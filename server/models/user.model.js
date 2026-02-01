const { Schema, model } = require('mongoose')

const userSchema = new Schema(
	{
		fullName: { type: String, required: true },
		phone: { type: String, required: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ['admin', 'customer', 'user'],
			required: false,
			default: 'user',
		},
		userImage: { type: String },
		isDeleted: { type: Boolean, default: false },
		deletedAt: { type: Date },
		favorites: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
		address: { type: String, default: '' },
	},
	{ timestamps: true },
)

/**
 * 1) Phone unique (eng muhim)
 * - Trim/lowercase telefon uchun ishlamaydi (raqam), shuning uchun normalize qilishni tavsiya qilaman.
 */
userSchema.index({ phone: 1 }, { unique: true })

/**
 * 2) Admin panelda ko‘p ishlatiladigan filterlar:
 */
userSchema.index({ role: 1, isDeleted: 1 })

/**
 * 3) Soft delete bo‘yicha tez filter:
 */
userSchema.index({ isDeleted: 1, deletedAt: -1 })

/**
 * 4) Qidiruv uchun (agar fullName bo‘yicha search qilmoqchi bo‘lsangiz)
 * - Text search ishlatsangiz: User.find({ $text: { $search: "kim" } })
 */
userSchema.index({ fullName: 'text', phone: 'text' })

/**
 * 5) Favorites orqali reverse lookup bo‘lsa (masalan: "qaysi userlarda shu product favorite?")
 */
userSchema.index({ favorites: 1 })

const UserModel = model('User', userSchema)

module.exports = UserModel
