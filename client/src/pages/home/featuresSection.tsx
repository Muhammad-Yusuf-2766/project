import { features } from '../../constants'

export default function FeaturesSection() {
	return (
		<div className='py-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-12'>
					<h2 className='text-4xl font-bold text-text mb-4'>
						Nima uchun Ansor Market?
					</h2>
					<p className='text-xl text-text-secondary'>
						Sifatli halol mahsulotlar uchun ishonchli hamkor
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{features.map((feature, index) => {
						const Icon = feature.icon
						return (
							<div
								key={index}
								className='bg-card hover:bg-light p-8 rounded-xl shadow-lg hover:shadow-xl transition-all'
							>
								<div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6'>
									<Icon className='w-8 h-8 text-primary' />
								</div>
								<h3 className='text-2xl font-bold text-text mb-4'>
									{feature.title}
								</h3>
								<p className='text-text-muted leading-relaxed'>
									{feature.description}
								</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
