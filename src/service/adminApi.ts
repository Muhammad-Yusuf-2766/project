/* eslint-disable @typescript-eslint/no-explicit-any */
// api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { ICategory } from '../pages/admin/_components/AddProductForm'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

// Har request oldidan token qo‘shib yuboradi
api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem('auth:token') // sizda key nomi qanday bo‘lsa shuni yozing
		if (token) {
			config.headers = config.headers ?? {}
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error),
)

// optional: errorlarni bir xil formatda ushlash
api.interceptors.response.use(
	res => res,
	(err: AxiosError<any>) => Promise.reject(err),
)

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
	categories: ICategory[]
}

export const createCategory = (payload: TCreateCategory) =>
	api.post('/api/admin/create-category', payload)

export const createProduct = (payload: TCreateProduct) =>
	api.post('/api/admin/create-product', payload)

export const getCategories = async (): Promise<ICategory[]> => {
	const res = await api.get<GetCategories>('/api/user/categories')
	return res.data.categories
}
