export interface Product {
	_id?: string
	productId: string
	title: string
	category: CategoryType
	price: number
	originalPrice?: number
	unit: string
	description: string
	image: string
	stock: number
	rating?: number
	sellerId?: string
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
	category: CategoryType
	price: number
	unit: string
	description: string
	image: string
	stock?: number
}

export type CategoryType =
	| 'beef'
	| 'mutton'
	| 'chicken'
	| 'bread'
	| 'other'
	| ''
export type FilterCategoryType = CategoryType | 'all'
