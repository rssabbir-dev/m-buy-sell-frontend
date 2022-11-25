import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useSeller from '../../../hooks/useSeller';

const NavBar = () => {
	const { user, logOut } = useContext(AuthContext);
	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((err) => console.log(err));
	};
	const [isAdmin] = useAdmin();
	const [isSeller] = useSeller();
	console.log('admin', isAdmin);
	console.log('seller', isSeller);

	const menuItems = (
		<>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/products'>Shop</Link>
			</li>
		</>
	);
	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<label tabIndex={0} className='btn btn-ghost lg:hidden'>
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
								d='M4 6h16M4 12h8m-8 6h16'
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
					>
						{menuItems}
					</ul>
				</div>
				<Link to='/' className='btn btn-ghost normal-case text-xl'>mBuy</Link>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal p-0'>
					{menuItems}
				</ul>
			</div>
			<div className='navbar-end'>
				{user?.uid ? (
					<div className='dropdown dropdown-end'>
						<label
							tabIndex={0}
							className='btn btn-ghost btn-circle avatar'
						>
							<div className='w-10 rounded-full'>
								<img src={user?.photoURL} alt='' />
							</div>
						</label>
						<ul
							tabIndex={0}
							className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
						>
							<li>
								<p>{user?.displayName}</p>
							</li>
							<li>
								{isAdmin && (
									<Link to='/user/admin'>
										Admin Dashboard
									</Link>
								)}
								{isSeller && (
									<Link to='/user/seller'>
										Seller Dashboard
									</Link>
								)}
								{!isAdmin && !isSeller && (
									<Link to='/user/buyer'>Dashboard</Link>
								)}
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li>
								<button onClick={handleLogOut}>Logout</button>
							</li>
						</ul>
					</div>
				) : (
					<Link to='/login' className='btn'>
						Login
					</Link>
				)}
			</div>
		</div>
	);
};

export default NavBar;
