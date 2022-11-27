import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { GrChapterAdd } from 'react-icons/gr';
import { BsBorderAll } from 'react-icons/bs';
import logo from '../../assets/mbuy_.logo.png'


const SellerLayout = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user } = useContext(AuthContext)
	document.title = 'Add Product - Seller Dashboard';
	const menuItems = <>
	<Link
									to='/user/seller'
									href='#'
									class='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
								>
									<GrChapterAdd />

									<span class='ml-3 text-sm font-medium'>
										{' '}
										Add A Product{' '}
									</span>
								</Link>
								<Link
									to='/user/seller/all-products'
									href='#'
									class='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
								>
									<BsBorderAll />

									<span class='ml-3 text-sm font-medium'>
										{' '}
										My Products{' '}
									</span>
								</Link>
	</>
	return (
		// <div className='h-screen'>
		// 	<label
		// 		onClick={() => setIsOpen(!isOpen)}
		// 		tabIndex={0}
		// 		className={`btn btn-circle btn-outline btn-ghost top-10 left-5 fixed z-20 bg-white  md:hidden ${
		// 			isOpen && 'left-[213px]'
		// 		} transition-all`}
		// 	>
		// 		<svg
		// 			xmlns='http://www.w3.org/2000/svg'
		// 			className='h-5 w-5'
		// 			fill='none'
		// 			viewBox='0 0 24 24'
		// 			stroke='currentColor'
		// 		>
		// 			<path
		// 				strokeLinecap='round'
		// 				strokeLinejoin='round'
		// 				strokeWidth='2'
		// 				d='M4 6h16M4 12h16M4 18h7'
		// 			/>
		// 		</svg>
		// 	</label>
		// 	<div>
		// 		<div
		// 			className={`transition-all ${
		// 				isOpen ? 'w-60' : '-translate-x-96 w-0'
		// 			} fixed md:w-60 md:translate-x-0`}
		// 		>
		// 			<div class='flex h-screen flex-col justify-between border-r bg-white'>
		// 				<div class='px-4 py-6'>
		// 					<Link to='/' className='flex justify-center'>
		// 						<img className='w-28' src={logo} alt='' />
		// 					</Link>

		// 					<nav
		// 						aria-label='Main Nav'
		// 						class='mt-6 flex flex-col space-y-3'
		// 					>
		// 						<Link
		// 							to='/user/seller'
		// 							href='#'
		// 							class='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
		// 						>
		// 							<GrChapterAdd />

		// 							<span class='ml-3 text-sm font-medium'>
		// 								{' '}
		// 								Add A Product{' '}
		// 							</span>
		// 						</Link>
		// 						<Link
		// 							to='/user/seller/all-products'
		// 							href='#'
		// 							class='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
		// 						>
		// 							<BsBorderAll />

		// 							<span class='ml-3 text-sm font-medium'>
		// 								{' '}
		// 								My Products{' '}
		// 							</span>
		// 						</Link>
		// 					</nav>
		// 				</div>

		// 				<div class='sticky inset-x-0 bottom-0 border-t border-gray-100'>
		// 					<Link class='flex shrink-0 items-center bg-white p-4 hover:bg-gray-50'>
		// 						<img
		// 							alt='Man'
		// 							src={user?.photoURL}
		// 							class='h-10 w-10 rounded-full object-cover'
		// 						/>

		// 						<div class='ml-1.5'>
		// 							<p class='text-xs'>
		// 								<strong class='block font-medium'>
		// 									{user?.displayName}
		// 								</strong>

		// 								<span> {user?.email} </span>
		// 							</p>
		// 						</div>
		// 					</Link>
		// 				</div>
		// 			</div>
		// 		</div>
		// 		<div
		// 			className={`${
		// 				isOpen ? 'left-60 absolute' : 'left-0'
		// 			} md:left-60 md:absolute`}
		// 		>
		// 			<Outlet />
		// 		</div>
		// 	</div>
		// </div>
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
					className={`md:left-60 md:absolute`}
				>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default SellerLayout;
