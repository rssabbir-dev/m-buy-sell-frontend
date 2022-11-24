import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const useAdmin = () => {
	const {user} = useContext(AuthContext)
	const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
		queryKey: ['isAdmin',user?.uid],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/user/admin/${user?.uid}`
			);
			const data = await res.json();
			return data.isAdmin;
		},
	});
	return [isAdmin, isAdminLoading];
};

export default useAdmin;
