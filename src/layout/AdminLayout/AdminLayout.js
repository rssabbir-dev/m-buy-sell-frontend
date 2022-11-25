import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { ImUsers } from 'react-icons/im';
import {  HiUsers } from 'react-icons/hi';
import { MdReportProblem } from 'react-icons/md';

const AdminLayout = () => {
	const { user } = useContext(AuthContext);
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className='h-screen'>
			<label
				onClick={() => setIsOpen(!isOpen)}
				tabIndex={0}
				className={`btn btn-circle btn-outline btn-ghost bottom-5 left-5 fixed z-20 bg-white  md:hidden ${
					isOpen && 'left-56'
				} transition-all`}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M4 6h16M4 12h16M4 18h7'
					/>
				</svg>
			</label>
			<div>
				<div
					className={`transition-all ${
						isOpen ? 'w-60' : '-translate-x-96 w-0'
					} fixed md:w-60 md:translate-x-0`}
				>
					<div class='flex h-screen flex-col justify-between border-r bg-white'>
						<div class='px-4 py-6'>
							<Link to='/' className='btn btn-ghost'>
								mBuy
							</Link>

							<nav
								aria-label='Main Nav'
								class='mt-6 flex flex-col space-y-3'
							>
								<Link
									to='/user/admin'
									href='#'
									class='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
								>
									<ImUsers />

									<span class='ml-3 text-sm font-medium'>
										{' '}
										All Seller{' '}
									</span>
								</Link>
								<Link
									to='/user/admin/buyers'
									href='#'
									class='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
								>
									<HiUsers />

									<span class='ml-3 text-sm font-medium'>
										All Buyer{' '}
									</span>
								</Link>
								<Link
									to='/user/admin/buyers'
									href='#'
									class='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
								>
									<MdReportProblem />

									<span class='ml-3 text-sm font-medium'>
										{' '}
										Reported Product{' '}
									</span>
								</Link>
							</nav>
						</div>

						<div class='sticky inset-x-0 bottom-0 border-t border-gray-100'>
							<Link class='flex shrink-0 items-center bg-white p-4 hover:bg-gray-50'>
								<img
									alt='Man'
									src={user?.photoURL}
									class='h-10 w-10 rounded-full object-cover'
								/>

								<div class='ml-1.5'>
									<p class='text-xs'>
										<strong class='block font-medium'>
											{user?.displayName}
										</strong>

										<span> {user?.email} </span>
									</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
				<div
					className={`${
						isOpen ? 'left-60 absolute' : 'left-0'
					} md:left-60 md:absolute`}
				>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
