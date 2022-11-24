import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const useAdmin = () => {
	const { user } = useContext(AuthContext);
	const [isAdminLoading, setAdminLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		if (user?.uid) {
			axios
				.get(
					`${process.env.REACT_APP_SERVER_URL}/user/admin/${user?.uid}`
				)
				.then((res) => {
					setIsAdmin(res.data.isAdmin);
					setAdminLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [user?.uid]);
	return [isAdmin, isAdminLoading];
};

export default useAdmin;
