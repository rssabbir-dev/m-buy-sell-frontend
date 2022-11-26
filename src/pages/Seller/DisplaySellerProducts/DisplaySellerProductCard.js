import React from 'react';

const DisplaySellerProductCard = ({
	product,
	handleProductDelete,
	handleProductPromote,
}) => {
	const { product_name, product_image, category_name, _id, status, promote } =
		product;

	return (
		<div className='relative block rounded-lg p-4 shadow-sm shadow-indigo-100 h-full'>
			<div className=''>
				<img
					alt='Home'
					src={product_image}
					className='h-56 w-full rounded-md object-contain'
				/>
				<span class='absolute top-4 z-10 inline-flex items-center rounded-full bg-gray-400 px-3 py-1 text-xs font-semibold text-white'>
					{category_name}
				</span>
			</div>
			<div className='mt-2'>
				<dl>
					<div>
						<p className='font-medium'>{product_name}</p>

						<p className='text-sm text-gray-500'>$240,000</p>
					</div>

					<div className='uppercase'>
						{status === 'sold' ? (
							<div className='text-xs badge badge-success badge-outline'>
								{status}
							</div>
						) : (
							<div className='text-xs badge badge-error badge-outline'>
								{status}
							</div>
						)}
					</div>
				</dl>

				<div className='flex justify-between my-5'>
					<button
						className='btn btn-sm btn-error'
						onClick={() => handleProductDelete(_id)}
					>
						Delete
					</button>
					{status === 'unsold' && !promote && (
						<button
							className='btn btn-sm btn-primary'
							onClick={() => handleProductPromote(_id)}
						>
							Promote
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default DisplaySellerProductCard;
