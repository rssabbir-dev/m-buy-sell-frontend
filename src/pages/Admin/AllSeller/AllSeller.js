import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useAuthHeader from '../../../hooks/useAuthHeader';

const AllSeller = () => {
    const [authHeader] = useAuthHeader();
    const {user} =useContext(AuthContext)
	const { data: sellers, isLoading } = useQuery({
		queryKey: ['sellers',user?.uid],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/users-by-role/${user?.uid}?role=seller`,
				{
					headers: authHeader,
				}
			);
			console.log(res);
			return res.data;
		},
	});
	return (
		<div>
			<p>All User</p>
		</div>
	);
};

export default AllSeller;
