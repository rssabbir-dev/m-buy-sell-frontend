import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout/AdminLayout';
import MainLayout from '../layout/MainLayout/MainLayout';
import SellerLayout from '../layout/SellerLayout/SellerLayout';
import AllBuyer from '../pages/Admin/AllBuyer/AllBuyer';
import AllSeller from '../pages/Admin/AllSeller/AllSeller';
import ErrorElement from '../pages/ErrorElement/ErrorElement';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import AddProduct from '../pages/Seller/AddProduct/AddProduct';
import DisplaySellerProducts from '../pages/Seller/DisplaySellerProducts/DisplaySellerProducts';
import SellerRoute from './SellerRoute';

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
			{
				path: '/seller-not-found',
				element: <ErrorElement message={'You Are Not Seller'} />,
			},
			{
				path: '/admin-not-found',
				element: <ErrorElement message={'You Are Not An Admin'} />,
			},
		],
	},
	{
		path: '/user/admin',
		element: <AdminLayout />,
		children: [
			{
				path: '/user/admin',
				element: <AllSeller />,
			},
			{
				path: '/user/admin/buyers',
				element: <AllBuyer />,
			},
		],
	},
	{
		path: '/user/seller',
		element: (
			<SellerRoute>
				<SellerLayout />
			</SellerRoute>
		),
		children: [
			{
				path: '/user/seller',
				element: <AddProduct />,
			},
			{
				path: '/user/seller/all-products',
				element: <DisplaySellerProducts />,
			},
		],
	},
]);
