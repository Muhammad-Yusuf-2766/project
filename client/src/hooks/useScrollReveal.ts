import { useEffect } from 'react'

const injectStyles = () => {
	if (typeof document === 'undefined') return
	if (document.getElementById('scroll-reveal-styles')) return

	const style = document.createElement('style')
	style.id = 'scroll-reveal-styles'
	style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(80px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-80px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-80px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(80px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .sr-hidden {
      opacity: 0;
    }

    .sr-visible[data-sr-animation="up"] {
      animation: fadeInUp var(--sr-duration, 1.2s)
      var(--sr-easing, cubic-bezier(0.22, 1, 0.36, 1))
      var(--sr-delay, 0s) both; /* <-- MUHIM: both */
}
    .sr-visible[data-sr-animation="down"] {
      animation: fadeInDown var(--sr-duration, 1.2s) var(--sr-easing, cubic-bezier(0.22, 1, 0.36, 1)) var(--sr-delay, 1s) forwards;
    }
    .sr-visible[data-sr-animation="left"] {
      animation: fadeInLeft var(--sr-duration, 1.2s) var(--sr-easing, cubic-bezier(0.22, 1, 0.36, 1)) var(--sr-delay, 1s) forwards;
    }
    .sr-visible[data-sr-animation="right"] {
      animation: fadeInRight var(--sr-duration, 1.2s) var(--sr-easing, cubic-bezier(0.22, 1, 0.36, 1)) var(--sr-delay, 1s) forwards;
    }
    .sr-visible[data-sr-animation="fade"] {
      animation: fadeIn var(--sr-duration, 1.2s) var(--sr-easing, cubic-bezier(0.22, 1, 0.36, 1)) var(--sr-delay, 1s) forwards;
    }
  `
	document.head.appendChild(style)
}

export function useScrollReveal(deps: unknown[] = []) {
	useEffect(() => {
		injectStyles()

		const elements = document.querySelectorAll('.sr-hidden')

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.remove('sr-hidden')
						entry.target.classList.add('sr-visible')
						observer.unobserve(entry.target)
					}
				})
			},
			{ threshold: 0.2, rootMargin: '0px 0px -60px 0px' },
		)

		elements.forEach(el => observer.observe(el))

		return () => observer.disconnect()
	}, deps)
}
