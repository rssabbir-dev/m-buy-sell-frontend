import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useAuthHeader from '../../../hooks/useAuthHeader';
import SpinnerThreeDot from '../../shared/Spinners/SpinnerThreeDot';
import DisplaySellerProductCard from './DisplaySellerProductCard';

const DisplaySellerProducts = () => {
    const { user } = useContext(AuthContext);
    const[authHeader] = useAuthHeader()
	
	const { data: products, isLoading,refetch } = useQuery({
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
	if (isLoading) {
		return <SpinnerThreeDot />;
	}
    return (
		<div className='mb-10'>
			<div className='divider'></div>
			<h2 className='text-3xl text-center'>Add A New Product</h2>
			<div className='divider'></div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
				{products.map((product) => (
					<DisplaySellerProductCard
						handleProductDelete={handleProductDelete}
						key={product._id}
						product={product}
					/>
				))}
			</div>
		</div>
	);
};

export default DisplaySellerProducts;
