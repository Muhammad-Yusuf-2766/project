import { MapPin, Phone } from 'lucide-react'

export default function Footer() {
	return (
		<footer className='bg-card border-t border-border'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-text'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					<div className='col-span-1 md:col-span-2'>
						<div className='flex items-center space-x-2 mb-4'>
							<img
								src='/ansor_logo_180px.png'
								className='w-20 h-20 text-primary'
							/>
							<span className='text-2xl font-bold text-white'>
								<span className='text-primary text-3xl'>Market</span>
							</span>
						</div>
						<p className='text-text-muted mb-4 max-w-md'>
							Your trusted source for premium halal products. We connect quality
							sellers with customers who value authenticity and excellence.
						</p>
					</div>

					<div>
						<h3 className='text-white font-semibold mb-4'>Quick Links</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='/about'
									className='hover:text-primary transition-colors'
								>
									Biz haqimizda
								</a>
							</li>
							<li>
								<a
									href='/products'
									className='hover:text-primary transition-colors'
								>
									Mahsulotlar
								</a>
							</li>

							<li>
								<a
									href='/contact'
									className='hover:text-primary transition-colors'
								>
									Shartlar va qoidalar
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-white font-semibold mb-4'>Contact</h3>
						<ul className='space-y-3'>
							<li className='flex items-center space-x-2 hover:underline '>
								<svg
									className='w-4 h-4 sm:w-6 sm:h-6 text-white bg-primary rounded-xl'
									viewBox='0 0 24 24'
									fill='currentColor'
								>
									<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
								</svg>
								<a href='https://t.me/AnsorEsan'>Telegram manzil</a>
							</li>
							<li className='flex items-center space-x-2'>
								<Phone className='w-4 h-4 text-primary' />
								<span>+82 10 7301 3407</span>
							</li>
							<li className='flex items-center space-x-2'>
								<MapPin className='w-4 h-4 text-primary' />
								<span>Seoul, South Korea</span>
							</li>
						</ul>
					</div>
				</div>

				<div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
					<p>&copy; 2024 Ansor Market. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
