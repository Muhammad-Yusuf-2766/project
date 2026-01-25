export const formatPrice = (price: number) => {
	return new Intl.NumberFormat('ko-KO').format(price) + ' won'
}

// phoneKR.ts
export function formatKoreanPhone(input: string) {
	const hasPlus = input.trim().startsWith('+')
	// faqat raqamlarni olamiz
	let digits = input.replace(/\D/g, '')

	// +82 bilan kelsa
	if (hasPlus) {
		// +82 ... bo'lmasa ham user + bosib yuborgan bo'lishi mumkin
		if (digits.startsWith('82')) digits = digits.slice(2)

		// ba'zan +82 010... yozib yuborishadi -> 0 ni olib tashlaymiz
		if (digits.startsWith('0')) digits = digits.slice(1)

		// endi digits: 10XXXXXXXX yoki 2XXXXXXXX ...
		// Biz asosan mobile (10) ni chiroyli qilamiz
		if (digits.startsWith('10')) {
			const rest = digits.slice(2, 10) // 8ta raqam
			const a = rest.slice(0, 4)
			const b = rest.slice(4, 8)
			if (rest.length <= 4) return `+82 10 ${a}`.trim()
			return `+82 10 ${a} ${b}`.trim()
		}

		// boshqa koreya raqamlar uchun umumiy ko'rinish:
		return `+82 ${digits}`.trim()
	}

	// Domestic (010...)
	if (digits.startsWith('010')) {
		const mid = digits.slice(3, 7)
		const last = digits.slice(7, 11)
		if (digits.length <= 3) return digits
		if (digits.length <= 7) return `010-${mid}`.trim()
		return `010-${mid}-${last}`.trim()
	}

	// Agar user 10... (0siz) yozsa, 010 deb qabul qilamiz (ixtiyoriy)
	if (digits.startsWith('10')) {
		const mid = digits.slice(2, 6)
		const last = digits.slice(6, 10)
		if (digits.length <= 2) return digits
		if (digits.length <= 6) return `010-${mid}`.trim()
		return `010-${mid}-${last}`.trim()
	}

	// fallback
	return input
}
