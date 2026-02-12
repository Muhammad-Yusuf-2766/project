export default function AdminHeader() {
	return (
		<div
			className='relative text-white py-16 sm:py-24'
			style={{
				backgroundImage:
					'linear-gradient(#14141490, #14141499), url(/Madina-light.avif)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h1 className='md:text-4xl text-2xl font-bold mb-4'>
					Bizning Mahsulotlar
				</h1>
				<p className='md:text-lg text-base'>
					Eng sara halol mahsulotlar — bir joyda
				</p>
			</div>
		</div>
	)
}
