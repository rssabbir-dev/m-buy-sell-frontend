import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const PaymentPage = () => {
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	);
};

export default PaymentPage;
