import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import SpinnerThreeDot from '../../shared/Spinners/SpinnerThreeDot';
import DisplaySellerProductCard from './DisplaySellerProductCard';

const DisplaySellerProducts = () => {
	const { user } = useContext(AuthContext);
	const head = {
		authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	};
	const { data: products, isLoading } = useQuery({
		queryKey: ['products', user?.uid],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/products/${user?.uid}`
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
