import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useAuthHeader from '../../../hooks/useAuthHeader';
import SpinnerSeller from '../../shared/Spinners/SpinnerSeller';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import OrderSuccess from '../OrderSuccess/OrderSuccess';

const PaymentPage = () => {
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);
	const { user } = useContext(AuthContext);
	const [order, setOrder] = useState({});
	const [orderLoading, setOrderLoading] = useState(false);
	const [reloadOrder, setReloadOrder] = useState(0);
	const param = useParams();

	useEffect(() => {
		setOrderLoading(true);
		if (user?.uid) {
			axios
				.get(
					`${process.env.REACT_APP_SERVER_URL}/order/${user?.uid}?id=${param?.id}`,
					{
						headers: {
							authorization: `Bearer ${localStorage.getItem(
								'accessToken'
							)}`,
						},
					}
				)
				.then((data) => {
					console.log(data);
					setOrder(data.data);
					setOrderLoading(false);
				});
		}
	}, [param?.id, user?.uid, reloadOrder]);

	if (orderLoading) {
		return <SpinnerSeller />;
	}

	return (
		<>
			{!order.order_status && (
				<Elements stripe={stripePromise}>
					<CheckoutForm
						order={order}
						setReloadOrder={setReloadOrder}
						reloadOrder={reloadOrder}
					/>
				</Elements>
			)}
			{order.order_status && <OrderSuccess />}
		</>
	);
};

export default PaymentPage;
