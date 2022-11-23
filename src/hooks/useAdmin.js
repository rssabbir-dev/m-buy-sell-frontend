import { useQuery } from '@tanstack/react-query';
import auth from '../firebase/firebase.config';

const useAdmin = () => {
	const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
		queryKey: ['isAdmin',auth.currentUser?.uid],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/user/admin/${auth.currentUser?.uid}`
			);
			const data = await res.json();
			return data.isAdmin;
		},
	});
	return [isAdmin, isAdminLoading];
};

export default useAdmin;
