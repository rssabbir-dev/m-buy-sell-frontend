import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import Footer from '../../pages/shared/Footer/Footer';
import NavBar from '../../pages/shared/NavBar/NavBar';
import SpinnerSeller from '../../pages/shared/Spinners/SpinnerSeller';

const MainLayout = () => {
	useScrollToTop();

	return (
		<div>
			<NavBar />
			<div className='w-11/12 mx-auto mt-20'>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
