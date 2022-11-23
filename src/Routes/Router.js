import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout/AdminLayout';
import MainLayout from '../layout/MainLayout/MainLayout';
import SellerLayout from '../layout/SellerLayout/SellerLayout';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/registration',
				element: <Registration />,
			},
		],
	},
	{
		path: '/user/admin',
		element: <AdminLayout />,
	},
	{
		path: '/user/seller',
		element: <SellerLayout />,
	},
]);
