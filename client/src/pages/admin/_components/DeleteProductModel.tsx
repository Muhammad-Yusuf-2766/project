import { X } from 'lucide-react'

interface DeleteProductModalProps {
	header: string
	descr?: string
	confirmButton: string
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

export default function ConfirmModal({
	header,
	descr,
	confirmButton,
	isOpen,
	onClose,
	onConfirm,
}: DeleteProductModalProps) {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
			<div className='bg-card rounded-xl max-w-md w-full p-6'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-xl font-bold text-text'>{header}</h3>
					<button
						onClick={onClose}
						className='text-text-muted hover:text-text transition-colors'
					>
						<X className='w-6 h-6' />
					</button>
				</div>
				<p className='text-text-muted mb-6'>{descr}</p>
				<div className='flex gap-3'>
					<button
						onClick={onConfirm}
						className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors'
					>
						{confirmButton}
					</button>
					<button
						onClick={onClose}
						className='flex-1 px-4 py-2 bg-light text-text rounded-lg font-semibold hover:bg-border transition-colors'
					>
						Bekor qilish
					</button>
				</div>
			</div>
		</div>
	)
}
