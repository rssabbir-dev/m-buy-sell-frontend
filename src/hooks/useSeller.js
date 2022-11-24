import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const useSeller = () => {
	const { user } = useContext(AuthContext);
	const [isSellerLoading, setSellerLoading] = useState(true);
	const [isSeller, setIsSeller] = useState(false);
	useEffect(() => {
		if (user?.uid) {
			axios
				.get(
					`${process.env.REACT_APP_SERVER_URL}/user/seller/${user?.uid}`
				)
				.then((res) => {
					setIsSeller(res.data.isSeller);
					setSellerLoading(false)
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [user?.uid]);
	return [isSeller, isSellerLoading];
};

export default useSeller;
