import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import SpinnerSeller from '../shared/Spinners/SpinnerSeller';
import Blog from './Blog';

const Blogs = () => {
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
    return <div className='space-y-10'>
        {
            blogs.map(blog => <Blog key={blog._id} blog={blog} />)
        }
    </div>;
};

export default Blogs;
