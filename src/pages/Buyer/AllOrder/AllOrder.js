import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useAuthHeader from '../../../hooks/useAuthHeader';
import SpinnerSeller from '../../shared/Spinners/SpinnerSeller';

const AllOrder = () => {
	document.title = 'My Order - Buyer Dashboard';
	const [authHeader] = useAuthHeader();
	const { user } = useContext(AuthContext);
	const { data: orders, isLoading } = useQuery({
		queryKey: ['orders', user?.uid],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/orders/${user?.uid}`,
				{
					headers: authHeader,
				}
			);
			return res.data;
		},
	});
	if (isLoading) {
		return <SpinnerSeller />;
	}
	return (
		<div className='w-screen md:w-[calc(100vw-240px)]'>
			<div className='divider'></div>
			<h2 className='text-3xl text-center'>All order List</h2>
			<div className='divider'></div>
			{orders.length > 0 ? (
				<div className='overflow-x-auto'>
					<table className='table w-full'>
						<thead>
							<tr>
								<th>No.</th>
								<th>Product Image</th>
								<th>Product Name</th>
								<th>Seller Name</th>
								<th>Price</th>
								<th>Payment</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, i) => (
								<tr key={order._id}>
									<th>{i + 1}</th>
									<th>
										<div className='avatar'>
											<div className='w-16 rounded'>
												<img
													src={
														order.product_info
															?.product_image
													}
													alt='Tailwind-CSS-Avatar-component'
												/>
											</div>
										</div>
									</th>
									<td>{order.product_info?.product_name}</td>
									<td>{order.seller_info?.seller_name}</td>
									<td>
										${order.product_info?.product_price}
									</td>
									<td>
										{!order.order_status && (
											<Link
												to={`/payment/${order._id}`}
												className='btn btn-xs btn-primary'
											>
												Pay
											</Link>
										)}
										{order.order_status && (
											<p className='text-green-500'>
												PAID
											</p>
										)}
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

export default AllOrder;
