import { useQuery } from '@tanstack/react-query'

import { Reveal } from '../../components/UI/Reveal'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { fetchHomeData } from '../../service/apiProducts'
import AboutSection from './aboutSection'
import CategoriesSection from './categoriesSection'
import CTASection from './ctaSection'
import FeaturesSection from './featuresSection'
import HeroSection from './heroSection'
import RecentProductsSection from './recentProducts'
import TopProductsSection from './topProducts'

// // <CHANGE> Removed HomeProps interface and onNavigate prop
// const injectStyles = () => {
// 	if (typeof document === 'undefined') return
// 	if (document.getElementById('fade-in-up-styles')) return
// 	const style = document.createElement('style')
// 	style.id = 'fade-in-up-styles'
// 	style.textContent = `
//     @keyframes fadeInUp {
//       from {
//         opacity: 0;
//         transform: translateY(100px);
//       }
//       to {
//         opacity: 1;
//         transform: translateY(0);
//       }
//     }

//     .scroll-reveal {
//       opacity: 0;
//       transform: translateY(100px);
//       transition: all ease;
//     }

//     .scroll-reveal.visible {
//       animation: fadeInUp 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
//     }
//   `
// 	document.head.appendChild(style)
// }

// function useScrollReveal() {
// 	useEffect(() => {
// 		injectStyles()

// 		const elements = document.querySelectorAll('.scroll-reveal')

// 		const observer = new IntersectionObserver(
// 			entries => {
// 				entries.forEach(entry => {
// 					if (entry.isIntersecting) {
// 						entry.target.classList.add('visible')
// 						observer.unobserve(entry.target) // animate only once
// 					}
// 				})
// 			},
// 			{
// 				threshold: 0.2, // trigger when 12% of element is visible
// 				rootMargin: '0px 0px -60px 0px', // slight offset from bottom edge
// 			},
// 		)

// 		elements.forEach(el => observer.observe(el))

// 		return () => observer.disconnect()
// 	}, [])
// }

export default function Home() {
	useScrollReveal()

	const { data } = useQuery({
		queryKey: ['home-data'],
		queryFn: () => fetchHomeData(),
		placeholderData: prev => prev,
		staleTime: 60_000,
	})

	const topProducts = data?.topProducts ?? []
	const newProducts = data?.newProducts ?? []

	return (
		<div className='min-h-screen'>
			{/* <Reveal> */}
			<HeroSection />
			{/* </Reveal> */}
			<Reveal>
				<TopProductsSection products={topProducts} />
			</Reveal>

			<Reveal>
				<AboutSection />
			</Reveal>

			<Reveal>
				<RecentProductsSection products={newProducts} />
			</Reveal>

			<Reveal>
				<CategoriesSection />
			</Reveal>

			<Reveal>
				<FeaturesSection />
			</Reveal>

			<Reveal>
				<CTASection />
			</Reveal>
		</div>
	)
}
