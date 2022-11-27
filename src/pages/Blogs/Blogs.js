import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import SpinnerSeller from '../shared/Spinners/SpinnerSeller';
import Blog from './Blog';

const Blogs = () => {
	document.title = 'Blogs - mBuy';
	const { data: blogs, isLoading } = useQuery({
		queryKey: ['blogs'],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/blogs`
			);
			return res.data;
		},
	});
	if (isLoading) {
		return <SpinnerSeller />;
	}
	return (
		<div>
			<div className='divider'></div>
			<h2 className='text-3xl'>Blogs</h2>
			<div className='divider'></div>
			<div className='space-y-10'>
				{blogs.map((blog) => (
					<Blog key={blog._id} blog={blog} />
				))}
			</div>
		</div>
	);
};

export default Blogs;
