import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import SpinnerSeller from '../pages/shared/Spinners/SpinnerSeller';

const PrivateRoute = ({ children }) => {
	const { user, userLoading } = useContext(AuthContext);
	const location = useLocation();
    console.log(userLoading);
	if (userLoading) {
		return <SpinnerSeller />;
    }
	if (user) {
        return children;
	}
    return <Navigate to='/login' state={{ from: location }} replace />;
};

export default PrivateRoute;
