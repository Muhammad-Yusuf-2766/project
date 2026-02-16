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
	const res = await fetch('http://localhost:3001/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	})
	if (!res.ok) throw new Error(await res.text())
	return res.json()
}

export async function registerApi(payload: {
	fullName: string
	phone: string
	password: string
}): Promise<AuthResponse> {
	const res = await fetch('http://localhost:3001/api/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
		// credentials: 'include',
	})
	console.log(res)
	// if (!res.ok) throw new Error(await res.text())
	const result = res.json()
	return result
}

export async function checkMe(token: string) {
	const res = await fetch('http://localhost:3001/api/auth/check-me', {
		headers: { Authorization: `Bearer ${token}` },
	})
	if (!res.ok) throw new Error(await res.text())
	return res.json()
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
