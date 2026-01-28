import Loading, {
	CartItemSkeleton,
	PageLoading,
	ProductGridSkeleton,
	ProfileSkeleton,
	TableSkeleton,
} from './Loading'

const UsageExample = () => {
	return (
		<div className='max-w-7xl mx-auto lg:px-8 mt-10'>
			// Basic spinner
			<Loading />
			// With text
			<Loading text='Yuklanmoqda...' />
			// Different sizes
			<Loading size='sm' />
			<Loading size='lg' />
			// Dots animation
			<Loading variant='dots' text='Mahsulotlar yuklanmoqda' />
			// Brand loading (with logo) - great for initial page loads
			<Loading variant='brand' text='Ansor Market' />
			// Full screen loading
			{/* <Loading variant='brand' fullScreen text='Yuklanmoqda...' /> */}
			// Overlay loading (for cards/buttons with relative positioning)
			{/* <div className="relative">
  <ProductCard />
  {isLoading && <Loading variant="overlay" />}
</div> */}
			// Skeleton for single element
			<Loading variant='skeleton' className='h-40 w-full' />
			// Product grid skeleton
			<ProductGridSkeleton count={8} />
			// Table skeleton
			<TableSkeleton rows={5} columns={4} />
			// Cart item skeleton
			<CartItemSkeleton />
			// Profile sidebar skeleton
			<ProfileSkeleton />
			// Full page loading component
			<PageLoading text='Sahifa yuklanmoqda...' />
		</div>
	)
}

export default UsageExample
