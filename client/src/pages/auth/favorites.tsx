import { useQuery } from '@tanstack/react-query'
import { Heart, ShoppingBag } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { ProductGridSkeleton } from '../../components/Loader/Loading'
import { useAuth } from '../../context/AuthContext'
import { useFavorites } from '../../context/FavoritesContext'
import { useToggleLike } from '../../hooks/useToggleLike'
import { formatPrice } from '../../lib/helpers'
import { resolveImageUrl } from '../../lib/mediaUrl'
import { fetchUserFavorites } from '../../service/userApi'

const MyFavorites = () => {
	const { mutateAsync: toggleLikeAsync } = useToggleLike()
	const { isLiked } = useFavorites()
	const { user } = useAuth()

	const {
		data: favoritesData,
		isLoading: loadingFavorites,
		refetch: refetchFavorites,
	} = useQuery({
		queryKey: ['user-favorites', user?._id],
		queryFn: async () => fetchUserFavorites(),
		enabled: !!user,
	})

	const handelLikle = async (
		e: React.MouseEvent<HTMLButtonElement>,
		productId: string,
	) => {
		e.preventDefault()
		e.stopPropagation()

		await toggleLikeAsync({
			productId,
			prevLiked: isLiked(productId),
		})

		await refetchFavorites()
	}

	const favorites = favoritesData?.products || []

	return (
		<div>
			{loadingFavorites && <ProductGridSkeleton />}
			{!loadingFavorites && (
				<div className='bg-card rounded-2xl shadow-md p-6 lg:p-8'>
					<h2 className='text-2xl font-bold text-text mb-6'>
						Sevimli mahsulotlar
					</h2>

					{!loadingFavorites && favorites.length <= 0 ? (
						<div className='text-center py-12'>
							<Heart className='w-16 h-16 text-red-500 mx-auto mb-4' />
							<h3 className='text-xl font-semibold text-text mb-2'>
								Sevimlilar bo'sh
							</h3>
							<p className='text-text-muted mb-6'>
								Siz hali hech qanday mahsulotni sevimlilarga qo'shmadingiz
							</p>
							<Link
								to='/products'
								className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors'
							>
								<ShoppingBag className='w-5 h-5' />
								Sevimlilarni to'ldirish
							</Link>
						</div>
					) : null}

					<div className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4'>
						{favorites?.map(item => (
							<div
								key={item._id}
								className='bg-light rounded-xl overflow-hidden shadow-md hover:shadow-lg  cursor-pointer hover:scale-105 transition-all ease'
							>
								<div className='relative h-32 sm:h-40'>
									<img
										src={resolveImageUrl(item.images[0])}
										alt='Product'
										className='w-full h-full object-cover'
									/>
									<button
										onClick={e => handelLikle(e, item._id)}
										className='absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 sm:p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors'
									>
										<Heart className='w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current' />
									</button>
								</div>
								<div className='p-2.5 sm:p-4'>
									<h3 className='font-semibold text-text mb-1 text-xs sm:text-sm line-clamp-2'>
										{item.title}
									</h3>
									<p className='text-primary font-bold text-sm sm:text-base'>
										{formatPrice(item.price)}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default MyFavorites
