// useToggleLike.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useFavorites } from '../context/FavoritesContext'
import { api } from '../service/axiosinctance'

// ========== API ========== //

type LikeResponse = { liked: boolean; likeCount?: number; failure?: string }

export async function apiAddFavorite(productId: string) {
	const res = await api.post(`/api/user/products/${productId}/like`)
	return res.data as LikeResponse // { liked:true, likeCount? }
}

export async function apiRemoveFavorite(productId: string) {
	const res = await api.delete(`/api/user/products/${productId}/unlike`)
	return res.data as LikeResponse // { liked:false, likeCount? }
}

// ========== HOOK ========== //

type ToggleVars = { productId: string; prevLiked: boolean }
type Product = { _id: string; likeCount: number }

export function useToggleLike() {
	const qc = useQueryClient()
	const { requireAuth, ready, setLiked } = useFavorites()

	return useMutation({
		mutationFn: async ({ productId, prevLiked }: ToggleVars) => {
			// prevLiked — optimistic update oldidan olingan haqiqiy holat
			return prevLiked
				? apiRemoveFavorite(productId)
				: apiAddFavorite(productId)
		},

		onMutate: async ({ productId, prevLiked }) => {
			if (!requireAuth() || !ready) {
				throw new Error('Like uchun avval login qiling!')
			}
			const nextLiked = !prevLiked

			// ✅ 1) UI darhol o'zgaradi
			setLiked(productId, nextLiked)

			// ✅ 2) likeCount optimistic
			const delta = nextLiked ? 1 : -1

			const prevDetail = qc.getQueryData<Product>(['product', productId])
			if (prevDetail) {
				qc.setQueryData<Product>(['product', productId], {
					...prevDetail,
					likeCount: Math.max(0, (prevDetail.likeCount ?? 0) + delta),
				})
			}

			const prevList = qc.getQueryData<Product[]>(['products'])
			if (prevList) {
				qc.setQueryData<Product[]>(
					['products'],
					prevList.map(p =>
						p._id === productId
							? { ...p, likeCount: Math.max(0, (p.likeCount ?? 0) + delta) }
							: p,
					),
				)
			}

			return { productId, prevLiked, prevDetail, prevList }
		},

		onSuccess: (data, productIdVars) => {
			const { productId } = productIdVars
			setLiked(productId, data.liked)

			if (typeof data.likeCount === 'number') {
				const d = data.likeCount
				qc.setQueryData<Product>(['product', productId], old =>
					old ? { ...old, likeCount: d } : old,
				)
				qc.setQueryData<Product[]>(['products'], old =>
					old
						? old.map(p => (p._id === productId ? { ...p, likeCount: d } : p))
						: old,
				)
			}

			toast.success(data.liked ? 'Like qo‘shildi' : 'Like olib tashlandi')
		},

		onError: (err, _vars, ctx) => {
			if (ctx) {
				setLiked(ctx.productId, ctx.prevLiked)
				if (ctx.prevDetail)
					qc.setQueryData(['product', ctx.productId], ctx.prevDetail)
				if (ctx.prevList) qc.setQueryData(['products'], ctx.prevList)
			}

			toast.error(
				err instanceof Error ? err.message : 'Xatolik: like saqlanmadi',
			)
		},
	})
}
