// components/SearchInput.tsx
import { Search } from 'lucide-react'

type Props = {
	value: string
	onChange: (v: string) => void
	placeholder?: string
	className?: string
}

export default function SearchInput({
	value,
	onChange,
	placeholder = 'Mahsulotlarni qidirish...',
	className = '',
}: Props) {
	return (
		<div className={`relative flex-1 ${className}`}>
			<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
			<input
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={e => onChange(e.target.value)}
				className='w-full pl-12 pr-4 md:py-3 py-2 border border-border rounded-lg ring-1 ring-text-muted focus:outline-none bg-card text-text'
			/>
		</div>
	)
}
