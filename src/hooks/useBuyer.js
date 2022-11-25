import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const useBuyer = () => {
	const { user } = useContext(AuthContext);
	const [isBuyerLoading, setBuyerLoading] = useState(true);
	const [isBuyer, setIsBuyer] = useState(false);
	useEffect(() => {
		if (user?.uid) {
			axios
				.get(
					`${process.env.REACT_APP_SERVER_URL}/user/buyer/${user?.uid}`
				)
				.then((res) => {
					setIsBuyer(res.data.isBuyer);
					setBuyerLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [user?.uid]);
	return [isBuyer, isBuyerLoading];
};

export default useBuyer;
