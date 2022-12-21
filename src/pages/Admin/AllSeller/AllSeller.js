import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useAuthHeader from '../../../hooks/useAuthHeader';
import SpinnerSeller from '../../shared/Spinners/SpinnerSeller';

const AllSeller = () => {
	document.title = 'All Seller - Admin Dashboard';
	const [authHeader] = useAuthHeader();
	const { user } = useContext(AuthContext);
	const {
		data: sellers,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['sellers', user?.uid],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/users-by-role/${user?.uid}?role=seller`,
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
	const handleConfirmVerify = (id) => {
		Swal.fire({
			title: 'Do you want to verify this seller?',
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: 'Confirm Verified',
			denyButtonText: `Don't Confirm`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				fetch(
					`${process.env.REACT_APP_SERVER_URL}/seller-verify/${user?.uid}?id=${id}`,
					{
						method: 'PATCH',
						headers: authHeader,
					}
				)
					.then((res) => res.json())
					.then((data) => {
						if (data.modifiedCount) {
							refetch();
							Swal.fire('Verified Success!', '', 'success');
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
			<h2 className='text-3xl text-center'>All Seller List</h2>
			<div className='divider'></div>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Status</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{sellers.map((seller, i) => (
							<tr key={seller._id}>
								<th>{i + 1}</th>
								{/* <td>{seller.displayName}</td> */}
								<td className='flex items-center'>
									{seller.displayName}{' '}
									<span>
										{seller?.status === 'verified' ? (
											<MdOutlineVerifiedUser className='text-primary text-sm rounded-full ml-1' />
										) : (
											''
										)}
									</span>
								</td>
								<td>{seller.email}</td>
								<td>
									{seller?.status !== 'verified' ? (
										<button
											onClick={() =>
												handleConfirmVerify(seller._id)
											}
											className='btn btn-xs btn-primary'
										>
											Confirm Verify
										</button>
									) : (
										<p className='text-sm text-green-500 text-bold'>
											Verified
										</p>
									)}
								</td>
								<td>
									<button
										onClick={() =>
											handleUserDelete(seller._id)
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

export default AllSeller;
