import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import SpinnerSeller from '../../shared/Spinners/SpinnerSeller';

const AllOrder = () => {
	const { user } = useContext(AuthContext);
	const { data: orders, isLoading } = useQuery({
		queryKey: ['orders', user?.uid],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/orders/:${user?.uid}`
			);
			return res.data;
		},
	});
	if (isLoading) {
		return <SpinnerSeller />;
	}
	return (
		<div>
			{orders.map((order) => (
				<p>{order?.product_info?.product_name}</p>
			))}
		</div>
	);
};

export default AllOrder;
