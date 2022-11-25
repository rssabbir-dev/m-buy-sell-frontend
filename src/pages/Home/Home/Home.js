import React from 'react';
import DisplayPromoteProduct from '../../Promote/DisplayPromoteProduct';
import DisplayCategories from '../DisplayCategories/DisplayCategories';
import HomeBanner from '../HomeBanner/HomeBanner';

const Home = () => {
	return (
		<>
			<HomeBanner />
			<DisplayPromoteProduct />
			<DisplayCategories />
		</>
	);
};

export default Home;
