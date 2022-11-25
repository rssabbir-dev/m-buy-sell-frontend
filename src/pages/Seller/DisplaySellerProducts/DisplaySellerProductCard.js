import React from 'react';
import Swal from 'sweetalert2';

const DisplaySellerProductCard = ({ product, handleProductDelete }) => {
	const { product_name, product_image, category_name, _id,status } = product;

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
						<dt className='sr-only'>Price</dt>

						<dd className='text-sm text-gray-500'>$240,000</dd>
					</div>

					<div>
						<dt className=''>{status}</dt>

						<dd className='font-medium'>{product_name}</dd>
					</div>
				</dl>

				<div>
					<button
						className='btn btn-sm btn-error'
						onClick={() => handleProductDelete(_id)}
					>
						Delete
					</button>
					{status === 'unsold' && (
						<button
							className='btn btn-sm btn-primary'
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
