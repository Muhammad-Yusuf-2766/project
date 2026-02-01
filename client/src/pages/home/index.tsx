import { useQuery } from '@tanstack/react-query'

import { fetchHomeData } from '../../service/apiProducts'
import AboutSection from './aboutSection'
import CategoriesSection from './categoriesSection'
import CTASection from './ctaSection'
import FeaturesSection from './featuresSection'
import HeroSection from './heroSection'
import RecentProductsSection from './recentProducts'
import TopProductsSection from './topProducts'

// <CHANGE> Removed HomeProps interface and onNavigate prop

export default function Home() {
	const { data } = useQuery({
		queryKey: ['home-data'],
		queryFn: () => fetchHomeData(),
		placeholderData: prev => prev, // keepPreviousData (v5 uslub)
		staleTime: 60_000,
	})

	const topProducts = data?.topProducts ?? []
	const newProducts = data?.newProducts ?? []

	return (
		<div className='min-h-screen'>
			<HeroSection />
			<TopProductsSection products={topProducts} />
			<AboutSection />
			<RecentProductsSection products={newProducts} />
			<CategoriesSection />
			<FeaturesSection />
			<CTASection />
		</div>
	)
}
