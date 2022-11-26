import React from 'react';
import DisplayPromoteProduct from '../../Promote/DisplayPromoteProduct';
import DisplayCategories from '../DisplayCategories/DisplayCategories';
import HomeBanner from '../HomeBanner/HomeBanner';

const Home = () => {
	return (
		<div className='space-y-20'>
			<HomeBanner />
			<DisplayPromoteProduct />
			<DisplayCategories />
		</div>
	);
};

export default Home;
