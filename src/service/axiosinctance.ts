/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

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
