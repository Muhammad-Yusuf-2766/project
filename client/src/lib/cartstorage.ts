export type CartItem = {
	_id: string
	title: string
	price: number
	images?: string[]
	qty: number
	unit: string
}

const GUEST_KEY = 'cart:guest'
const userKey = (userId: string) => `cart:user:${userId}`
export const getKey = (userId?: string) =>
	userId ? userKey(userId) : GUEST_KEY

export function readLS(key: string): CartItem[] {
	try {
		const raw = localStorage.getItem(key)
		return raw ? JSON.parse(raw) : []
	} catch {
		return []
	}
}
export function writeLS(key: string, items: CartItem[]) {
	localStorage.setItem(key, JSON.stringify(items))
}

function readKey(key: string): CartItem[] {
	try {
		const raw = localStorage.getItem(key)
		return raw ? JSON.parse(raw) : []
	} catch {
		return []
	}
}
function writeKey(key: string, items: CartItem[]) {
	localStorage.setItem(key, JSON.stringify(items))
}

function mergeByProductId(a: CartItem[], b: CartItem[]) {
	// a + b -> qty qo‘shiladi
	const map = new Map<string, CartItem>()
	for (const item of a) map.set(item._id, { ...item })
	for (const item of b) {
		const existing = map.get(item._id)
		if (existing)
			map.set(item._id, { ...existing, qty: existing.qty + item.qty })
		else map.set(item._id, { ...item })
	}
	return Array.from(map.values())
}

export function migrateGuestCartToUser(userId: string) {
	const guestItems = readKey(GUEST_KEY)
	if (guestItems.length === 0) return

	const uKey = userKey(userId)
	const userItems = readKey(uKey)

	const merged = mergeByProductId(userItems, guestItems)

	writeKey(uKey, merged)
	localStorage.removeItem(GUEST_KEY)
}
