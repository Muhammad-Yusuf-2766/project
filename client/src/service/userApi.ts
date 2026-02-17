import { AuthUser } from '../lib/authstorage'
import { Order, Product } from '../types'
import { api } from './axiosinctance'

export type AuthResponse = {
	failure: string
	token: string
	user: AuthUser
}
export type TGetProductsResponse = {
	proudcts: Product[]
}

export async function loginApi(payload: {
	phone: string
	password: string
}): Promise<AuthResponse> {
	const res = await api.post<AuthResponse>('/api/auth/login', payload)
	return res.data
}

export async function registerApi(payload: {
	fullName: string
	phone: string
	password: string
}): Promise<AuthResponse> {
	const res = await api.post<AuthResponse>('/api/auth/register', payload)
	return res.data
}

type CheckMeResponse = {
	user: AuthUser
	state: string
}

export async function checkMe(): Promise<CheckMeResponse> {
	const res = await api.get('/api/auth/check-me')
	return res.data
}

type GetUserOrders = {
	orders: Order[]
}
export async function fetchUserOrders(): Promise<GetUserOrders> {
	const res = await api.get('/api/user/orders')
	return res.data
}

type GetUserFavorites = {
	products: Product[]
}

export async function fetchUserFavorites(): Promise<GetUserFavorites> {
	const res = await api.get('/api/user/favorites')
	return res.data
}

export const getProducts = () =>
	api.get<TGetProductsResponse>('/api/user/products')
