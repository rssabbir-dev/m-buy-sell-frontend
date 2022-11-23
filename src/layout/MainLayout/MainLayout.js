import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../pages/shared/Footer/Footer';
import NavBar from '../../pages/shared/NavBar/NavBar';

const MainLayout = () => {
	return (
		<>
			<NavBar />
			<Outlet />
			<Footer />
		</>
	);
};

export default MainLayout;
