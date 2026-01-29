import { LucideIcon } from 'lucide-react'

export interface Product {
	_id: string
	title: string
	category: string
	price: number
	originalPrice?: number
	unit: string
	description: string
	image: string
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
