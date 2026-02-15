import { Package } from 'lucide-react'

type Props = {
	header: string
	subHeader?: string
}

const UndefinedData = ({ header, subHeader }: Props) => {
	return (
		<div className='flex flex-col items-center justify-center py-16 text-muted-foreground'>
			<Package className='h-12 w-12 mb-3' />
			<p className='text-lg font-medium'>{header}</p>
			<p className='text-sm'>
				{subHeader ?? "Qidiruv yoki filtrni o'zgartirib ko'ring"}
			</p>
		</div>
	)
}

export default UndefinedData
