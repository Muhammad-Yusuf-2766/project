import AboutSection from './aboutSection'
import CategoriesSection from './categoriesSection'
import CTASection from './ctaSection'
import FeaturesSection from './featuresSection'
import HeroSection from './heroSection'
import RecentProductsSection from './recentProducts'
import TopProductsSection from './topProducts'

// <CHANGE> Removed HomeProps interface and onNavigate prop

export default function Home() {
	return (
		<div className='min-h-screen'>
			<HeroSection />
			<TopProductsSection />
			<AboutSection />
			<RecentProductsSection />
			<CategoriesSection />
			<FeaturesSection />
			<CTASection />
		</div>
	)
}
