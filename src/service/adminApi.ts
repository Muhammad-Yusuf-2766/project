/* eslint-disable @typescript-eslint/no-explicit-any */
// api.ts
import { CategoryType } from '../types'
import { api } from './axiosinctance'

export type TCreateCategory = {
	title: string
	slug: string
	description?: string
	image: string
}

export type TCreateProduct = {
	title: string
	category: string
	price: number
	originalPrice?: string
	unit: string
	stock?: number
	image: string
	description: string
}

type GetCategories = {
	categories: CategoryType[]
}

export const createCategory = (payload: TCreateCategory) =>
	api.post('/api/admin/create-category', payload)

export const createProduct = (payload: FormData) =>
	api.post('/api/admin/create-product', payload)

export const getCategories = async (): Promise<CategoryType[]> => {
	const res = await api.get<GetCategories>('/api/user/categories')
	return res.data.categories
}
