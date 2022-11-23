import React from 'react';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleProductSubmit = (data) => {
		console.log(data);
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
			<div class='mx-auto'>
				<div class='rounded-lg bg-white lg:col-span-3 mt-10'>
					<form
						onSubmit={handleSubmit(handleProductSubmit)}
						class='space-y-4'
					>
						<div class='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label class='font-semibold' for='name'>
									Name
								</label>
								<input
									class='w-full input input-bordered'
									placeholder='Name'
									type='text'
									id='name'
								/>
							</div>
							<div>
								<label class='font-semibold' for='phone'>
									Phone
								</label>
								<input
									class='w-full input input-bordered'
									placeholder='Phone Number'
									type='tel'
									id='phone'
								/>
							</div>
						</div>

						<div class='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label class='font-semibold'>Image</label>
								<input
									class='w-full file-input input-bordered'
									placeholder='Email address'
									type='file'
								/>
							</div>

							<div>
								<label class='font-semibold'>Category</label>
								<select className='select select-bordered w-full'>
									<option disabled selected>
										Who shot first?
									</option>
									<option>Han Solo</option>
									<option>Greedo</option>
								</select>
							</div>
						</div>
						<div class='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label class='font-semibold'>Location</label>
								<input
									class='w-full input input-bordered'
									placeholder='Location address'
									type='text'
								/>
							</div>

							<div>
								<label class='font-semibold'>Condition</label>
								<select className='select select-bordered w-full'>
									<option disabled selected>
										Excellent
									</option>
									<option>Good</option>
									<option>Fair</option>
								</select>
							</div>
						</div>

						<div class='grid grid-cols-1 gap-4 sm:grid-cols-3'>
							<div>
								<label class='font-semibold'>
									Resell Price
								</label>
								<input
									class='w-full input input-bordered'
									placeholder='Resell Price'
									type='number'
								/>
							</div>
							<div>
								<label class='font-semibold'>
									Original Price
								</label>
								<input
									class='w-full input input-bordered'
									placeholder='Original Price'
									type='number'
								/>
							</div>
							<div>
								<label class='font-semibold'>
									Year Of Used
								</label>
								<input
									class='w-full input input-bordered'
									placeholder='Year of Used'
									type='number'
								/>
							</div>
						</div>

						<div>
							<label class='font-semibold'>Description</label>
							<textarea
								class='w-full textarea textarea-bordered'
								placeholder='description'
								rows='8'
							></textarea>
						</div>

						<div class='mt-4'>
							<button
								type='submit'
								class='inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto'
							>
								<span class='font-medium'> Add Product </span>

								<svg
									xmlns='http://www.w3.org/2000/svg'
									class='ml-3 h-5 w-5'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
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
