import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//Scroll TO top of the page when route got changed
export const useScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return null;
};
