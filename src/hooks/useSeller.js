import { useQuery } from '@tanstack/react-query';
import auth from '../firebase/firebase.config';

const useSeller = () => {
	const { data: isSeller = false, isLoading: isSellerLoading } = useQuery({
		queryKey: ['isSeller'],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/user/seller/${auth.currentUser.uid}`
			);
			const data = await res.json();
			return data.isSeller;
		},
	});
	return [isSeller, isSellerLoading];
};

export default useSeller;
