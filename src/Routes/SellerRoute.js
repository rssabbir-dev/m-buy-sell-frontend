import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import useSeller from '../hooks/useSeller';
import SpinnerSeller from '../pages/shared/Spinners/SpinnerSeller';

const SellerRoute = ({children}) => {
	const [isSeller, isSellerLoading] = useSeller();
	const { user, isUserLoading } = useContext(AuthContext);
	if (isUserLoading || isSellerLoading) {
		return <SpinnerSeller />;
    }
    if (user && isSeller) {
        return children;
    }
    return <Navigate to='/seller-not-found'></Navigate>;
};

export default SellerRoute;
