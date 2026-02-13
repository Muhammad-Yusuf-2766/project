import { LucideIcon } from 'lucide-react'

export interface Product {
	_id: string
	title: string
	category: string
	price: number
	originalPrice?: number
	unit: string
	description: string
	images: string[]
	stock: number
	likeCount?: string
	createdAt?: string
}

export interface User {
	id: string
	name: string
	email: string
	role: 'admin' | 'seller'
	avatar?: string
}

export interface ProductFormData {
	title: string
	category: string
	price: number | undefined
	originalPrice: number | undefined
	unit: string
	description: string
	images: string[]
	stock?: number | undefined
}

export type CategoryType = {
	_id: string
	title: string
	slug: string
	image: string
	icon: LucideIcon
	description?: string
}

export type FilterCategoryType = CategoryType[]

export type OrderStatus = 'pending' | 'sending' | 'completed'

export interface OrderItem {
	productId: string
	title: string
	quantity: number
	unit: string
	price: number
	originalPrice: number | null
	subPrice: number | null
}

export interface Order {
	_id: string
	userId: string
	fullName: string
	items: OrderItem[]
	subTotal: number
	deliveryPrice: number
	totalPrice: number
	status: OrderStatus
	address: string
	customerPhone: string
	createdAt: string
	updatedAt: string
}
