const axios = require('axios')

const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TG_ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID

function escapeHtml(s) {
	return String(s ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
}

function money(n) {
	return new Intl.NumberFormat('uz-UZ').format(Number(n || 0)) + " so'm"
}

async function sendOrderToAdmin(order, products) {
	if (!TG_BOT_TOKEN || !TG_ADMIN_CHAT_ID) return

	const byId = new Map((products || []).map(p => [String(p._id), p]))

	const itemsText = (order.items || [])
		.map((it, idx) => {
			const p = byId.get(String(it.productId))
			const title = p?.title ?? it.productId
			const price = p?.price ?? 0
			return `${idx + 1}) ${escapeHtml(title)}  x${it.quantity}  —  ${money(price)}`
		})
		.join('\n')

	const text = `🛒 <b>Yangi buyurtma</b>
🆔 <b>Order ID:</b> <code>${escapeHtml(order._id)}</code>
👤 <b>Mijoz:</b> ${escapeHtml(order.fullName)}
📞 <b>Telefon:</b> ${escapeHtml(order.customerPhone || '-')}
📍 <b>Manzil:</b> ${escapeHtml(order.address)}

<b>Mahsulotlar:</b>
${itemsText}

💰 <b>SubTotal:</b> ${money(order.subTotal)}
🚚 <b>Delivery:</b> ${money(order.deliveryPrice)}
✅ <b>Total:</b> ${money(order.totalPrice)}
🕒 <b>Status:</b> ${escapeHtml(order.status)}
`

	const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`

	await axios.post(url, {
		chat_id: TG_ADMIN_CHAT_ID,
		text,
		parse_mode: 'HTML',
		disable_web_page_preview: true,
	})
}

module.exports = sendOrderToAdmin
