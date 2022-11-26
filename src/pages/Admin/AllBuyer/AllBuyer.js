import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useAuthHeader from '../../../hooks/useAuthHeader';
import SpinnerSeller from '../../shared/Spinners/SpinnerSeller';

const AllBuyer = () => {
	document.title = 'All Buyer - Admin Dashboard';
	const [authHeader] = useAuthHeader();
	const { user } = useContext(AuthContext);
	const {
		data: buyers,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['buyers', user?.uid],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/users-by-role/${user?.uid}?role=buyer`,
				{
					headers: authHeader,
				}
			);
			return res.data;
		},
	});
	if (isLoading) {
		return <SpinnerSeller />;
	}
	const handleUserDelete = (id) => {
		Swal.fire({
			title: 'Do you want to delete this buyer?',
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: 'Confirm Verified',
			denyButtonText: `Don't Confirm`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				fetch(
					`${process.env.REACT_APP_SERVER_URL}/user-delete/${user?.uid}?id=${id}`,
					{
						method: 'DELETE',
						headers: authHeader,
					}
				)
					.then((res) => res.json())
					.then((data) => {
						if (data.deletedCount) {
							Swal.fire('Deleted Success!', '', 'success');
							refetch();
						}
					})
					.catch((err) => {
						Swal.fire(
							'Oops! Something was wrong, please try again',
							'',
							'error'
						);
					});
			} else if (result.isDenied) {
				Swal.fire('Changes are not saved', '', 'info');
			}
		});
	};
	return (
		<div className='w-screen md:w-[calc(100vw-240px)]'>
			<div className='divider'></div>
			<h2 className='text-3xl text-center'>All Buyer List</h2>
			<div className='divider'></div>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{buyers.map((buyer, i) => (
							<tr key={buyer._id}>
								<th>{i + 1}</th>
								<td>{buyer.displayName}</td>
								<td>{buyer.email}</td>

								<td>
									<button
										onClick={() =>
											handleUserDelete(buyer._id)
										}
										className='btn btn-xs btn-danger'
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllBuyer;
