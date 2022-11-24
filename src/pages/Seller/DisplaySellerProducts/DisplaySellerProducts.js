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
		<div>
			{products.map((product) => (
				<DisplaySellerProductCard key={product._id} product={product} />
			))}
		</div>
	);
};

export default DisplaySellerProducts;
