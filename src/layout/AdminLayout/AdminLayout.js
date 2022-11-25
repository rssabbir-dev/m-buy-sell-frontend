import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from '../../pages/shared/NavBar/NavBar';

const AdminLayout = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className='h-screen'>
			<label
				onClick={() => setIsOpen(!isOpen)}
				tabIndex={0}
				className='btn btn-ghost btn-circle fixed z-20 bg-white  md:hidden'
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
			<div className='flex'>
				<div
					className={`transition-all ${
						isOpen ? 'w-60' : '-translate-x-96 w-0'
					} md:w-60 md:translate-x-0`}
				>
					<Link to='/' className='btn btn-ghost'>
						mBuy
					</Link>
				</div>
				<div
					className={`${
						isOpen ? 'left-60 fixed' : 'left-0'
					} md:left-60 md:absolute text-center w-[100%-240px]`}
				>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
