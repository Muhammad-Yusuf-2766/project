const Contactus = () => {
	return (
		<div className='mt-8 sm:mt-12 p-4 sm:p-6 bg-card rounded-xl border border-border'>
			<p className='text-text-muted text-sm mx-auto'>
				Muammo bormi? Biz bilan bog'laning:{' '}
				<a
					href='https://t.me/AnsorEsan'
					className='hover:underline flex gap-x-2 items-center py-2 px-4 rounded-lg bg-light border mt-4 md:w-1/2 mx-auto text-primary '
				>
					<img src='/telegram.png' alt='Telegram logo' className='w-6 h-6' />
					<span className=' text-lg'>@Ansor Maket</span>
				</a>
			</p>
		</div>
	)
}

export default Contactus
