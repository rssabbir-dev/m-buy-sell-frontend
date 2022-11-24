import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const useSeller = () => {
	const { user } = useContext(AuthContext);
	const { data: isSeller = false, isLoading: isSellerLoading } = useQuery({
		queryKey: ['isSeller', user?.uid],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/user/seller/${user?.uid}`
			);
			const data = await res.json();
			return data.isSeller;
		},
	});
	return [isSeller, isSellerLoading];
};

export default useSeller;
