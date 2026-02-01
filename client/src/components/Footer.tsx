import { Mail, MapPin, Phone } from 'lucide-react'

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
								<a href='#' className='hover:text-primary transition-colors'>
									About Us
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-primary transition-colors'>
									Products
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-primary transition-colors'>
									Become a Seller
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-primary transition-colors'>
									Terms & Conditions
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-white font-semibold mb-4'>Contact</h3>
						<ul className='space-y-3'>
							<li className='flex items-center space-x-2'>
								<Mail className='w-4 h-4 text-primary' />
								<span>info@ansormarket.com</span>
							</li>
							<li className='flex items-center space-x-2'>
								<Phone className='w-4 h-4 text-primary' />
								<span>+1 (555) 123-4567</span>
							</li>
							<li className='flex items-center space-x-2'>
								<MapPin className='w-4 h-4 text-primary' />
								<span>123 Market St, City</span>
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
