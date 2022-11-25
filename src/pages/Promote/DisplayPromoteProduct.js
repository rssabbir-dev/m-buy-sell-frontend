import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import DisplaySellerProductCard from '../Seller/DisplaySellerProducts/DisplaySellerProductCard';
import SpinnerSeller from '../shared/Spinners/SpinnerSeller';
import PromotedCard from './PromotedCard';

const DisplayPromoteProduct = () => {
	const { data: products, isLoading } = useQuery({
		queryKey: ['promotedProduct'],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/promoted-product/`
			);
			return res.data;
		},
	});
	if (isLoading) {
		return <SpinnerSeller />;
	}

	return (
		<div className='grid grid-cols-4'>
			{products.map((product) => (
				<PromotedCard product={product} />
			))}
		</div>
	);
};

export default DisplayPromoteProduct;
