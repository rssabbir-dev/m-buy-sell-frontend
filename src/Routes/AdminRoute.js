import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import SpinnerSeller from '../pages/shared/Spinners/SpinnerSeller';

const AdminRoute = ({ children }) => {
	const [isAdmin, isAdminLoading] = useAdmin();
	const { user, isUserLoading } = useContext(AuthContext);
	if (isUserLoading || isAdminLoading) {
		return <SpinnerSeller />;
	}
	if (user && isAdmin) {
		return children;
	}
	return <Navigate to='/admin-not-found'></Navigate>;
};

export default AdminRoute;
