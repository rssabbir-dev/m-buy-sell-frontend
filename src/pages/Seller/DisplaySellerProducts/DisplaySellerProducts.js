import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useAuthHeader from '../../../hooks/useAuthHeader';
import SpinnerSeller from '../../shared/Spinners/SpinnerSeller';
import DisplaySellerProductCard from './DisplaySellerProductCard';

const DisplaySellerProducts = () => {
	document.title = 'All Products - Seller Dashboard';
	const { user } = useContext(AuthContext);
	const [authHeader] = useAuthHeader();

	const {
		data: products,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['products', user?.uid],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/products/${user?.uid}`,
				{
					headers: authHeader,
				}
			);
			return res.data;
		},
	});
	const handleProductDelete = (id) => {
		Swal.fire({
			title: 'Do you want to delete this Product?',
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: 'Confirm',
			denyButtonText: `Don't Confirm`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				fetch(
					`${process.env.REACT_APP_SERVER_URL}/product-delete/${user?.uid}?id=${id}`,
					{
						method: 'DELETE',
						headers: authHeader,
					}
				)
					.then((res) => res.json())
					.then((data) => {
						if (data.deletedCount) {
							Swal.fire('Deleted Success!', '', 'success');
							refetch();
						}
					})
					.catch((err) => {
						Swal.fire(
							'Oops! Something was wrong, please try again',
							'',
							'error'
						);
					});
			} else if (result.isDenied) {
				Swal.fire('Changes are not saved', '', 'info');
			}
		});
	};

	const handleProductPromote = (id) => {
		Swal.fire({
			title: 'Do you want to Promote this Product?',
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: 'Confirm',
			denyButtonText: `Don't Confirm`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				fetch(
					`${process.env.REACT_APP_SERVER_URL}/promote-product/${user?.uid}?id=${id}`,
					{
						method: 'PATCH',
						headers: authHeader,
					}
				)
					.then((res) => res.json())
					.then((data) => {
						Swal.fire('Promoted Success!', '', 'success');
						refetch();
					})
					.catch((err) => {
						Swal.fire(
							'Oops! Something was wrong, please try again',
							'',
							'error'
						);
					});
			} else if (result.isDenied) {
				Swal.fire('Changes are not saved', '', 'info');
			}
		});

		console.log(id);
	};
	if (isLoading) {
		return <SpinnerSeller />;
	}
	console.log(products);
	return (
		// <div className='mx-4 mb-20'>
		// 	<div className='divider'></div>
		// 	<h2 className='text-3xl text-center'>My Products</h2>
		// 	<div className='divider'></div>
		// 	<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
		// 		{products.map((product) => (
		// 			<DisplaySellerProductCard
		// 				handleProductDelete={handleProductDelete}
		// 				handleProductPromote={handleProductPromote}
		// 				key={product._id}
		// 				product={product}
		// 			/>
		// 		))}
		// 	</div>
		// </div>
		<div className='w-screen md:w-[calc(100vw-240px)]'>
			<div className='divider'></div>
			<h2 className='text-3xl text-center'>All order List</h2>
			<div className='divider'></div>
			{products.length > 0 ? (
				<div className='overflow-x-auto'>
					<table className='table w-full'>
						<thead>
							<tr>
								<th>No.</th>
								<th>Product Image</th>
								<th>Product Name</th>
								<th>Category Name</th>
								<th>Price</th>
								<th>Status</th>
								<th>Advertise</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product, i) => (
								<tr key={product._id}>
									<th>{i + 1}</th>
									<th>
										<div className='avatar'>
											<div className='w-16 rounded'>
												<img
													src={product.product_image}
													alt='Tailwind-CSS-Avatar-component'
												/>
											</div>
										</div>
									</th>
									<td>{product.product_name}</td>
									<td>{product.category_name}</td>
									<td>${product.resell_price}</td>
									<td>
										<div className='uppercase'>
											{product.order_status ? (
												<div className='text-xs badge badge-success badge-outline'>
													SOLD
												</div>
											) : (
												<div className='text-xs badge badge-error badge-outline'>
													UNSOLD
												</div>
											)}
										</div>
									</td>
									<td>
										{!product.order_status &&
										!product.promote ? (
											<button
												className='btn btn-sm btn-primary'
												onClick={() =>
													handleProductPromote(
														product._id
													)
												}
											>
												Promote
											</button>
										) : (
											<p className='text-sm text-green-500'>
												Promoted
											</p>
										)}
									</td>
									<td>
										<button
											className='btn btn-sm btn-error'
											onClick={() =>
												handleProductDelete(product._id)
											}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p className='italic '>You haven't placed any order yet!</p>
			)}
		</div>
	);
};

export default DisplaySellerProducts;
