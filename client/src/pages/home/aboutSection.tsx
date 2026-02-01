import { Play, ShoppingCart, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AboutSection() {
	const [isVideoPlaying, setIsVideoPlaying] = useState(false)

	return (
		<div className='bg-card py-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<div>
						<div className='flex items-center gap-2 mb-4'>
							<Sparkles className='w-6 h-6 text-secondary' />
							<span className='text-secondary font-semibold uppercase tracking-wider text-sm'>
								Biz haqimizda
							</span>
						</div>
						<h2 className='text-3xl md:text-4xl font-bold text-text mb-6'>
							Ansor Market - Halol mahsulotlar uchun ishonchli manba
						</h2>
						<p className='text-text-secondary text-lg mb-6 leading-relaxed'>
							Biz 2020-yildan beri mijozlarimizga eng sifatli halol
							mahsulotlarni yetkazib beramiz. Bizning barcha mahsulotlarimiz
							sertifikatlangan va sifat nazoratidan o'tgan.
						</p>
						<div className='grid grid-cols-3 gap-6 mb-8'>
							<div className='text-center'>
								<div className='text-3xl md:text-4xl font-bold text-primary mb-1'>
									500+
								</div>
								<div className='text-text-muted text-sm'>Mahsulotlar</div>
							</div>
							<div className='text-center'>
								<div className='text-3xl md:text-4xl font-bold text-primary mb-1'>
									10K+
								</div>
								<div className='text-text-muted text-sm'>Mijozlar</div>
							</div>
							<div className='text-center'>
								<div className='text-3xl md:text-4xl font-bold text-primary mb-1'>
									50+
								</div>
								<div className='text-text-muted text-sm'>Sotuvchilar</div>
							</div>
						</div>
						<Link
							to='/products'
							className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-all'
						>
							Mahsulotlarni ko'rish
							<ShoppingCart className='w-5 h-5' />
						</Link>
					</div>
					<div className='relative'>
						<div className='relative rounded-2xl overflow-hidden shadow-2xl'>
							{isVideoPlaying ? (
								<iframe
									className='w-full h-80 lg:h-96'
									src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
									title='Ansor Market Video'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								></iframe>
							) : (
								<div
									className='cursor-pointer group'
									onClick={() => setIsVideoPlaying(true)}
								>
									<img
										src='https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800'
										alt='Ansor Market Video'
										className='w-full h-80 lg:h-96 object-cover'
									/>
									<div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center'>
										<div className='w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl'>
											<Play className='w-8 h-8 text-primary ml-1' />
										</div>
									</div>
								</div>
							)}
						</div>
						<div className='absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl -z-10'></div>
						<div className='absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10'></div>
					</div>
				</div>
			</div>
		</div>
	)
}
