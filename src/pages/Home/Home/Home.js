import React from 'react';
import DisplayPromoteProduct from '../../Promote/DisplayPromoteProduct';
import About from '../About/About';
import DisplayCategories from '../DisplayCategories/DisplayCategories';
import HomeBanner from '../HomeBanner/HomeBanner';

const Home = () => {
	document.title = 'Home - mBuy';
	return (
		<div className='space-y-20'>
			<HomeBanner />
			<DisplayPromoteProduct />
			<DisplayCategories />
			<About />
		</div>
	);
};

export default Home;
