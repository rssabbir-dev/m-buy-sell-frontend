import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import SpinnerSeller from '../../shared/Spinners/SpinnerSeller';

const DisplayCategories = () => {
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
		return <SpinnerSeller />;
	}
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 gap-5 w-11/12 mx-auto my-20'>
			{categories.map((category) => (
				<Link to={`/category/${category._id}`} className='p-8 text-center rounded-lg text-xl font-semibold bg-slate-100 uppercase shadow-md hover:shadow-xl hover:-translate-y-2 hover:cursor-pointer transition-all' key={category._id}>{category.category_name}</Link>
			))}
		</div>
	);
};

export default DisplayCategories;
