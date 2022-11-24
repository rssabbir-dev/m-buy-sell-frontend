import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const AddProduct = () => {
	const { user } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleProductSubmit = (data) => {
		handleGetImageLink(data);
	};
	const handleGetImageLink = (data) => {
		const formData = new FormData();
		formData.append('image', data.product_image[0]);
		axios
			.post(
				`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`,
				formData
			)
			.then((res) => {
				handleAddProduct(data, res.data.data.url);
			})
			.catch((err) => console.log(err));
	};

	const handleAddProduct = (data, image) => {
		const {
			product_name,
			seller_phone,
			seller_location,
			condition,
			original_price,
			resell_price,
			product_description,
			year_of_used,
			category,
		} = data;
		const product = {
			product_name,
			product_description,
			product_image: image,
			category,
			condition,
			resell_price,
			original_price,
			year_of_used,
			seller_location,
			seller_phone,
			seller_email: user.email,
			seller_name: user.displayName,
			seller_uid: user.uid,
			seller_image: user.photoURL,
		};
		axios
			.post(
				`${process.env.REACT_APP_SERVER_URL}/products/${user?.uid}`,
				product
			)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
	};

	/**
	 * name ----
	 * img ----
	 * resell price ----
	 * originial price ----
	 * year of use ----
	 * posted time
	 * seller's name
	 * verified tick
	 * category name
	 * category id
	 * seller email
	 * seller photo
	 * seller uid
	 * condition (excellent,good,fair), ----
	 * seller phone number ----
	 * seller location
	 * product description ----
	 * status(sold,unsold)
	 */
	return (
		<section className=''>
			<h2 className='text-3xl'>Add A New Product</h2>
			<div className='mx-auto'>
				<div className='rounded-lg bg-white lg:col-span-3 mt-10'>
					<form
						onSubmit={handleSubmit(handleProductSubmit)}
						className='space-y-4'
					>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label className='font-semibold'>
									Product Name
								</label>
								<input
									className='w-full input input-bordered'
									placeholder='Product Name'
									type='text'
									{...register('product_name', {
										required: 'Product name is required',
									})}
								/>
								{errors.product_name && (
									<p className='text-red-500 text-sm'>
										{errors.product_name?.message}
									</p>
								)}
							</div>
							<div>
								<label className='font-semibold'>Phone</label>
								<input
									className='w-full input input-bordered'
									placeholder='Phone Number'
									type='number'
									{...register('seller_phone', {
										required: 'Phone number is required',
										minLength: {
											value: 11,
											message:
												'Phone number must be minimums 11 character',
										},
									})}
								/>
								{errors.seller_phone && (
									<p className='text-red-500 text-sm'>
										{errors.seller_phone?.message}
									</p>
								)}
							</div>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label className='font-semibold'>Image</label>
								<input
									className='w-full file-input input-bordered'
									placeholder='Email address'
									type='file'
									{...register('product_image', {
										required: 'Product image is required',
									})}
								/>
								{errors.product_image && (
									<p className='text-red-500 text-sm'>
										{errors.product_image?.message}
									</p>
								)}
							</div>

							<div>
								<label className='font-semibold'>
									Category
								</label>
								<select
									{...register('category')}
									className='select select-bordered w-full'
								>
									<option disabled selected>
										Who shot first?
									</option>
									<option value='1'>Han Solo</option>
									<option>Greedo</option>
								</select>
							</div>
						</div>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label className='font-semibold'>
									Location
								</label>
								<input
									className='w-full input input-bordered'
									placeholder='Location address'
									type='text'
									{...register('seller_location', {
										required: 'Location is required',
									})}
								/>
								{errors.seller_location && (
									<p className='text-red-500 text-sm'>
										{errors.seller_location?.message}
									</p>
								)}
							</div>

							<div>
								<label className='font-semibold'>
									Condition
								</label>
								<select
									defaultValue='Fair'
									{...register('condition', {
										required: 'Condition status required',
									})}
									className='select select-bordered w-full'
								>
									<option value='Excellent'>Excellent</option>
									<option value='Good'>Good</option>
									<option value='Fair'>Fair</option>
								</select>
								{errors.condition && (
									<p className='text-red-500 text-sm'>
										{errors.condition?.message}
									</p>
								)}
							</div>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
							<div>
								<label className='font-semibold'>
									Resell Price
								</label>
								<input
									className='w-full input input-bordered'
									placeholder='Resell Price'
									type='number'
									{...register('resell_price', {
										required: 'Resell price is required',
									})}
								/>
								{errors.resell_price && (
									<p className='text-red-500 text-sm'>
										{errors.resell_price?.message}
									</p>
								)}
							</div>
							<div>
								<label className='font-semibold'>
									Original Price
								</label>
								<input
									className='w-full input input-bordered'
									placeholder='Original Price'
									type='number'
									{...register('original_price', {
										required: 'Original price is required',
									})}
								/>
								{errors.product_name && (
									<p className='text-red-500 text-sm'>
										{errors.original_price?.message}
									</p>
								)}
							</div>
							<div>
								<label className='font-semibold'>
									Year Of Used
								</label>
								<input
									className='w-full input input-bordered'
									placeholder='Year of Used'
									type='number'
									{...register('year_of_used', {
										required: 'Year of used is required',
									})}
								/>
								{errors.year_of_used && (
									<p className='text-red-500 text-sm'>
										{errors.year_of_used?.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<label className='font-semibold'>Description</label>
							<textarea
								className='w-full textarea textarea-bordered'
								placeholder='description'
								rows='8'
								{...register('product_description', {
									required: 'Product description is required',
								})}
							></textarea>
							{errors.product_description && (
								<p className='text-red-500 text-sm'>
									{errors.product_description?.message}
								</p>
							)}
						</div>

						<div className='mt-4'>
							<button
								type='submit'
								className='inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto'
							>
								<span className='font-medium'>
									{' '}
									Add Product{' '}
								</span>

								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='ml-3 h-5 w-5'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M14 5l7 7m0 0l-7 7m7-7H3'
									/>
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default AddProduct;
