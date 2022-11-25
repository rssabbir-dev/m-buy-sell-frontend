import React from 'react';

const DisplaySellerProductCard = ({
	product,
	handleProductDelete,
	handleProductPromote,
}) => {
	const { product_name, product_image, category_name, _id, status, promote } =
		product;

	return (
		<div className='block rounded-lg p-4 shadow-sm shadow-indigo-100'>
			<img
				alt='Home'
				src={product_image}
				className='h-56 w-full rounded-md object-cover'
			/>

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
