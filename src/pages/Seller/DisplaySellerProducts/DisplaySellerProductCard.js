import React from 'react';

const DisplaySellerProductCard = ({ product }) => {
	const {
		product_name,
		product_description,
		product_image,
		category,
		condition,
		resell_price,
		original_price,
		year_of_used,
		seller_location,
		seller_phone,
		seller_email,
		seller_name,
		seller_uid,
		seller_image,
	} = product;
	return (
		<a
			href='#'
			className='block rounded-lg p-4 shadow-sm shadow-indigo-100'
		>
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
						<dt className='sr-only'>Address</dt>

						<dd className='font-medium'>{product_name}</dd>
					</div>
				</dl>

				<div className='mt-6 flex items-center gap-8 text-xs'>
					<div className='sm:inline-flex sm:shrink-0 sm:items-center'>
						<svg
							className='h-4 w-4 text-indigo-700'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'
							/>
						</svg>

						<div className='mt-1.5 sm:ml-3 sm:mt-0'>
							<p className='text-gray-500'>Parking</p>

							<p className='font-medium'>2 spaces</p>
						</div>
					</div>

					<div className='sm:inline-flex sm:shrink-0 sm:items-center'>
						<svg
							className='h-4 w-4 text-indigo-700'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
							/>
						</svg>

						<div className='mt-1.5 sm:ml-3 sm:mt-0'>
							<p className='text-gray-500'>Bathroom</p>

							<p className='font-medium'>2 rooms</p>
						</div>
					</div>

					<div className='sm:inline-flex sm:shrink-0 sm:items-center'>
						<svg
							className='h-4 w-4 text-indigo-700'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
							/>
						</svg>

						<div className='mt-1.5 sm:ml-3 sm:mt-0'>
							<p className='text-gray-500'>Bedroom</p>

							<p className='font-medium'>4 rooms</p>
						</div>
					</div>
				</div>
			</div>
		</a>
	);
};

export default DisplaySellerProductCard;
