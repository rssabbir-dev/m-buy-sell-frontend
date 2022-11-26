import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { MdOutlineVerifiedUser } from 'react-icons/md';

const ProductByCategoryCard = ({ product, setBookedProduct }) => {
	const [verifiedSeller, setVerifiedSeller] = useState(false);
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
		createAt,
	} = product;

	useEffect(() => {
		if (seller_uid) {
			fetch(
				`${process.env.REACT_APP_SERVER_URL}/seller-verify/${seller_uid}`
			)
				.then((res) => res.json())
				.then((data) => {
					setVerifiedSeller(data.isVerified);
				});
		}
	}, [seller_uid]);
	return (
		<div className='block rounded-lg p-4 shadow-sm shadow-indigo-100'>
			<img
				alt='Home'
				src={product_image}
				className='h-56 w-full rounded-md object-cover'
			/>

			<div className='mt-2'>
				<p className='font-medium uppercase'>{product_name}</p>

				<div className='text-xs uppercase'>
					<div>
						<p className=''>Resell Price: ${resell_price}</p>
						<p>Original Price: ${original_price}</p>
						<p>used: {year_of_used} year</p>
					</div>

					<div className='my-3'>
						<p className='flex items-center'>
							Post By: {seller_name}{' '}
							<span>
								{verifiedSeller ? (
									<MdOutlineVerifiedUser className='text-primary text-sm rounded-full ml-1' />
								) : (
									''
								)}
							</span>
						</p>

						<p className=''>Location: {seller_location}</p>
						<p>Date : {format(new Date(createAt), 'Pp')}</p>
					</div>
					<div className='mb-3 text-right'></div>
				</div>
				<label
					htmlFor='book-product-modal'
					className='btn btn-block btn-primary'
					onClick={() => setBookedProduct(product)}
				>
					Book Now
				</label>
			</div>
		</div>
	);
};

export default ProductByCategoryCard;
