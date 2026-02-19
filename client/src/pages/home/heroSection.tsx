import { Link } from 'react-router-dom'
import { Reveal } from '../../components/UI/Reveal'

export default function HeroSection() {
	return (
		<div
			className='relative text-light'
			style={{
				backgroundImage:
					'linear-gradient(#14141490, #14141499), url(https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32'>
				<div className='max-w-3xl'>
					<Reveal
						as='h1'
						delay='0ms'
						className='text-3xl md:text-6xl font-bold mb-6 leading-tight'
					>
						Halollik, foydadan ustun turadi
					</Reveal>

					<Reveal as='p' delay='400ms' className='text-xl md:text-2xl mb-8'>
						Ansor Market da halol go'sht, yangi yopilgan non va saralangan halol
						mahsulotlarni oson topasiz.
					</Reveal>

					<Reveal delay='800ms' className='flex flex-col sm:flex-row gap-4'>
						<Link
							to='/products'
							className='px-8 py-4 bg-card text-primary rounded-lg font-semibold text-lg hover:bg-light transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center'
						>
							Harid qilish
						</Link>
						<button className='px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-hover transition-all shadow-lg'>
							Biz bilan bog'lanish
						</button>
					</Reveal>
				</div>
			</div>
		</div>
	)
}
