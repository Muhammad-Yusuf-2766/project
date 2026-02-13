import { CategoryType, Order, Product } from '../types'
import { api } from './axiosinctance'

// api/products.ts
export type SortProducts = 'newest' | 'oldest'
export type SortOrders = 'newest' | 'oldest' | 'highest' | 'lowest'
export type Statusorders = 'all' | 'pending' | 'sending' | 'completed'
export type Category = 'all' | string

export type ProductsParams = {
	searchQuery?: string
	sort: SortProducts
	category: Category
	page: number
	pageSize: number
}

export type OrdersParams = {
	searchQuery?: string
	status: Statusorders
	sort: SortOrders
	page: number
	pageSize: number
}

type ProductsResponse = {
	success: boolean
	meta: { page: number; limit: number; total: number; isNext: boolean }
	products: Product[]
}

type OrdersResponse = {
	success: boolean
	meta: { page: number; limit: number; total: number; isNext: boolean }
	orders: Order[]
}

type HomeResponse = {
	topProducts: Product[]
	newProducts: Product[]
	categories: CategoryType[]
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
		`/api/user/products?${qs.toString()}`,
	)
	return res.data
}

export async function fetchOrders(params: OrdersParams) {
	const qs = new URLSearchParams()

	if (params.searchQuery?.trim())
		qs.set('searchQuery', params.searchQuery.trim())
	qs.set('sort', params.sort)
	qs.set('status', params.status || 'all')
	qs.set('page', String(params.page))
	qs.set('pageSize', String(params.pageSize))

	const res = await api.get<OrdersResponse>(
		`/api/admin/orders?${qs.toString()}`,
	)
	return res.data
}

export async function fetchHomeData() {
	const res = await api.get<HomeResponse>(`/api/user/home`)
	return res.data
}

type ProductDetailResp = {
	product: Product
}
export async function fetchProductDetail(id: string | undefined) {
	const res = await api.get<ProductDetailResp>(`/api/user/product/${id}`)
	return res.data.product
}
