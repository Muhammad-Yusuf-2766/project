import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { CartItem, getKey, readLS, writeLS } from '../lib/cartstorage'

type CartCtx = {
	items: CartItem[]
	itemsCount: number
	add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
	updateQty: (productId: string, qty: number) => void
	remove: (productId: string) => void
	clear: () => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({
	children,
	userId,
}: {
	children: React.ReactNode
	userId?: string
}) {
	const [key, setKey] = useState(() => getKey(userId))

	// ✅ faqat 1 marta initial read (lazy init)
	const [items, setItems] = useState<CartItem[]>(() => readLS(getKey(userId)))

	// user login/logout bo‘lsa key o‘zgaradi -> o‘sha keydan 1 marta o‘qiymiz
	useEffect(() => {
		const nextKey = getKey(userId)
		setKey(nextKey)
		setItems(readLS(nextKey))
	}, [userId])

	// ✅ persist: items o‘zgarsa localStorage’ga yoz
	useEffect(() => {
		writeLS(key, items)
	}, [key, items])

	const add = (item: Omit<CartItem, 'qty'>, qty = 1) => {
		setItems(prev => {
			const found = prev.find(p => p._id === item._id)
			return found
				? prev.map(p => (p._id === item._id ? { ...p, qty: p.qty + qty } : p))
				: [...prev, { ...item, qty }]
		})
	}

	const updateQty = (productId: string, qty: number) => {
		setItems(prev => {
			if (qty <= 0) return prev.filter(p => p._id !== productId)
			return prev.map(p => (p._id === productId ? { ...p, qty } : p))
		})
	}

	const remove = (productId: string) => {
		setItems(prev => prev.filter(p => p._id !== productId))
	}

	const clear = () => setItems([])

	const itemsCount = useMemo(
		() => items.reduce((sum, i) => sum + i.qty, 0),
		[items],
	)

	const value = useMemo(
		() => ({ items, itemsCount, add, updateQty, remove, clear }),
		[items, itemsCount],
	)

	return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}

export function useCart() {
	const ctx = useContext(CartContext)
	if (!ctx) throw new Error('useCart must be used within CartProvider')
	return ctx
}
