import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useAuthHeader from '../../../hooks/useAuthHeader';
import SpinnerThreeDot from '../../shared/Spinners/SpinnerThreeDot';
import DisplaySellerProductCard from './DisplaySellerProductCard';

const DisplaySellerProducts = () => {
    const { user } = useContext(AuthContext);
    const[authHeader] = useAuthHeader()
	
	const { data: products, isLoading } = useQuery({
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
						key={product._id}
						product={product}
					/>
				))}
			</div>
		</div>
	);
};

export default DisplaySellerProducts;
