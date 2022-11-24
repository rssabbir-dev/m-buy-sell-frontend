import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from '../../pages/shared/NavBar/NavBar';

const AdminLayout = () => {
	return (
		<>
			<NavBar />
			<div className='drawer drawer-mobile'>
				<input
					id='my-drawer-2'
					type='checkbox'
					className='drawer-toggle'
				/>
				<div className='drawer-content'>
					<Outlet />
					{/* <label
					htmlFor='my-drawer-2'
					className='btn btn-primary drawer-button lg:hidden'
				>
					Open drawer
				</label> */}
				</div>
				<div className='drawer-side'>
					<label
						htmlFor='my-drawer-2'
						className='drawer-overlay'
					></label>
					<ul className='menu p-4 w-80 bg-base-100 text-base-content'>
						<li>
							<Link to='/user/admin'>All Seller</Link>
						</li>
						<li>
							<a>All Buyer</a>
						</li>
						<li>
							<a>Reported Items</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default AdminLayout;
