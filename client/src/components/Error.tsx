type Props = {
	error: string | null
}

const Error = ({ error }: Props) => {
	return (
		<div className=' mb-8 p-2 bg-red-100 border-red-500 border rounded-lg'>
			<p className='text-red-500'>{error}</p>
		</div>
	)
}

export default Error
