import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Footer = () => {
	const {user} = useContext(AuthContext)
	const { data: categories, isLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/categories`
			);
			return res.data;
		},
	});
	if (isLoading) {
		return
	}
    return (
		<footer>
			<div className='footer p-10 bg-gray-100'>
				<div>
					<span className='footer-title'>Category</span>
					{categories.map((category) => (
						<Link
							className='link link-hover'
							key={category._id}
							to={`/category/${category._id}`}
						>
							{category.category_name}
						</Link>
					))}
				</div>
				<div>
					<span className='footer-title'>Navigation</span>
					<Link to='/' className='link link-hover'>
						Home
					</Link>
					<Link to='/blogs' className='link link-hover'>
						Blogs
					</Link>
					{user?.uid && (
						<>
							<Link to='/login' className='link link-hover'>
								Login
							</Link>
							<Link
								to='/registration'
								className='link link-hover'
							>
								Registration
							</Link>
						</>
					)}
				</div>
				<div>
					<span className='footer-title'>Legal</span>
					<Link className='link link-hover'>Terms of use</Link>
					<Link className='link link-hover'>Privacy policy</Link>
					<Link className='link link-hover'>Cookie policy</Link>
				</div>
			</div>
			<div className='footer footer-center p-4 bg-base-300 text-base-content'>
				<div>
					<p>
						Copyright © 2022 - All right reserved by{' '}
						<span className='italic'>mbuy</span> Ltd
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;