import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../service/adminApi'

export const categoriesQueryKey = ['categories'] as const

export function useCategories() {
	return useQuery({
		queryKey: categoriesQueryKey,
		queryFn: getCategories,
		staleTime: 1000 * 60 * 10, // 10min
	})
}
