export default function CTASection() {
	return (
		<div className='bg-card text-text py-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<h2 className='text-4xl font-bold mb-4'>
					Sotuvchi bo'lishni xohlaysizmi?
				</h2>
				<p className='text-xl text-text-muted mb-8 max-w-2xl mx-auto'>
					Ishonchli sotuvchilar jamoamizga qo'shiling va minglab mijozlarga
					sifatli halol mahsulotlaringizni yetkazing.
				</p>
				<button className='px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl transform hover:scale-105'>
					Sotuvchi sifatida ro'yxatdan o'tish
				</button>
			</div>
		</div>
	)
}
