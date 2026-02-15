/* eslint-disable @typescript-eslint/no-explicit-any */
// api.ts
import { CategoryType } from '../types'
import { ProductsParams, ProductsResponse } from './apiProducts'
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

type getAdminOverview = {
	overview: {
		totalProducts: number
		totalOrders: number
	}
	recentActivity: {
		type: string
		message: string
		detail: string
		at: string
	}[]
}

type getAdminSales = {
	sales: {
		totalSales: number
		growthPercent: number
		mode: string
		month: string | null
	}
}

export const fetchAdminSales = async (
	month: string | null,
): Promise<getAdminSales> => {
	const qs = new URLSearchParams()
	if (month) qs.set('month', month)

	const res = await api.get(`/api/admin/sales?${qs.toString()}`)
	return res.data
}

export const fetchAdminOverview = async (): Promise<getAdminOverview> => {
	const res = await api.get('/api/admin/overview')
	return res.data
}

export const createCategory = (payload: TCreateCategory) =>
	api.post('/api/admin/create-category', payload)

export const createProduct = (payload: FormData) =>
	api.post('/api/admin/create-product', payload)

export const getCategories = async (): Promise<CategoryType[]> => {
	const res = await api.get<GetCategories>('/api/user/categories')
	return res.data.categories
}

export async function fetchProducts(params: ProductsParams) {
	const qs = new URLSearchParams()

	if (params.searchQuery?.trim())
		qs.set('searchQuery', params.searchQuery.trim())
	qs.set('sort', params.sort)
	qs.set('category', params.category)
	qs.set('page', String(params.page))
	qs.set('pageSize', String(params.pageSize))

	const res = await api.get<ProductsResponse>(
		`/api/admin/products?${qs.toString()}`,
	)
	return res.data
}

export const updateOrderStatus = async (id: string, status: string) => {
	const res = await api.put(`/api/admin/update-order/${id}`, { status })
	return res
}

export const deleteProduct = async (id: string) => {
	const res = await api.delete(`/api/admin/product/${id}`)
	return res
}
