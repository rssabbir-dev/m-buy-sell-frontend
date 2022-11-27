import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { ImUsers } from 'react-icons/im';
import { HiUsers } from 'react-icons/hi';
import { MdReportProblem } from 'react-icons/md';
import logo from '../../assets/mbuy_.logo.png';

const AdminLayout = () => {
	const { user } = useContext(AuthContext);
	const [isOpen, setIsOpen] = useState(false);
	const menuItems = (
		<>
			<Link
				to='/user/admin'
				href='#'
				class='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
			>
				<ImUsers />

				<span class='ml-3 text-sm font-medium'> All Seller </span>
			</Link>
			<Link
				to='/user/admin/buyers'
				href='#'
				class='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
			>
				<HiUsers />

				<span class='ml-3 text-sm font-medium'>All Buyer </span>
			</Link>
			<Link
				to='/user/admin/reported-product'
				href='#'
				class='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
			>
				<MdReportProblem />

				<span class='ml-3 text-sm font-medium'> Reported Product </span>
			</Link>
		</>
	);
	document.title = 'All Seller - Admin Dashboard';
	return (
		<div className='relative'>
			<div>
				<div className='navbar bg-base-100 md:hidden'>
					<div className='flex-1'>
						<Link to='/' className='w-24'>
							<img src={logo} alt='' />
						</Link>
					</div>
					<div className='flex-none'>
						<div className='dropdown dropdown-end'>
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
							<ul
								tabIndex={0}
								className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
							>
								{menuItems}
							</ul>
						</div>
					</div>
				</div>
				<div className={`fixed`}>
					<div class='md:flex h-screen flex-col justify-between border-r bg-white hidden'>
						<div class='px-4 py-6'>
							<Link to='/' className='flex justify-center'>
								<img className='w-28' src={logo} alt='' />
							</Link>

							<nav
								aria-label='Main Nav'
								class='mt-6 flex flex-col space-y-3'
							>
								{menuItems}
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
