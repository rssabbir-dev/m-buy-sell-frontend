import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import useBuyer from '../hooks/useBuyer';
import SpinnerSeller from '../pages/shared/Spinners/SpinnerSeller';

const BuyerRoute = ({ children }) => {
	const [isBuyer, isBuyerLoading] = useBuyer();
	const { user, userLoading } = useContext(AuthContext);
	if (userLoading || isBuyerLoading) {
		return <SpinnerSeller />;
	}
	if (user && isBuyer) {
		return children;
	}
	return <Navigate to='/buyer-not-found'></Navigate>;
};

export default BuyerRoute;
