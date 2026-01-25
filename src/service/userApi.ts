import { AuthUser } from '../lib/authstorage'

export type AuthResponse = {
	token: string
	user: AuthUser
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
