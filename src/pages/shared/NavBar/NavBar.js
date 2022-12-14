import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useBuyer from '../../../hooks/useBuyer';
import useSeller from '../../../hooks/useSeller';
import logo from '../../../assets/mbuy_.logo.png';
import toast from 'react-hot-toast';

const NavBar = () => {
	const { user, logOut } = useContext(AuthContext);
	const handleLogOut = () => {
		logOut()
			.then(() => {
				toast.success('Logout');
			})
			.catch((err) => console.log(err));
	};
	const [isAdmin] = useAdmin();
	const [isSeller] = useSeller();
	const [isBuyer] = useBuyer();

	const menuItems = (
		<>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/blogs'>Blogs</Link>
			</li>
			<li>
				{isAdmin && <Link to='/user/admin'>Admin Dashboard</Link>}
				{isSeller && <Link to='/user/seller'>Seller Dashboard</Link>}
				{isBuyer && <Link to='/user/buyer'>Buyer Dashboard</Link>}
			</li>
		</>
	);
	return (
		<div className='navbar bg-base-100 px-10 fixed top-0 z-50'>
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
				<Link to='/' className='w-28'>
					<img src={logo} alt='' />
				</Link>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal p-0'>{menuItems}</ul>
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
							{/* <li>
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
								{isBuyer && (
									<Link to='/user/buyer'>Buyer Dashboard</Link>
								)}
							</li> */}
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
