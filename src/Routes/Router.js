import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout/AdminLayout';
import BuyerLayout from '../layout/BuyerLayout/BuyerLayout';
import MainLayout from '../layout/MainLayout/MainLayout';
import SellerLayout from '../layout/SellerLayout/SellerLayout';
import AllBuyer from '../pages/Admin/AllBuyer/AllBuyer';
import AllSeller from '../pages/Admin/AllSeller/AllSeller';
import AllOrder from '../pages/Buyer/AllOrder/AllOrder';
import ErrorElement from '../pages/ErrorElement/ErrorElement';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login/Login';
import ProductByCategory from '../pages/ProductByCategory/ProductByCategory';
import Registration from '../pages/Registration/Registration';
import AddProduct from '../pages/Seller/AddProduct/AddProduct';
import DisplaySellerProducts from '../pages/Seller/DisplaySellerProducts/DisplaySellerProducts';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
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
				path: '/category/:id',
				element: (
					<PrivateRoute>
						<ProductByCategory />
					</PrivateRoute>
				),
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
		element: (
			<PrivateRoute>
				<AdminLayout />
			</PrivateRoute>
		),
		children: [
			{
				path: '/user/admin',
				element: (
					<AdminRoute>
						<AllSeller />
					</AdminRoute>
				),
			},
			{
				path: '/user/admin/buyers',
				element: (
					<AdminRoute>
						<AllBuyer />
					</AdminRoute>
				),
			},
		],
	},
	{
		path: '/user/seller',
		element: (
			<PrivateRoute>
				<SellerLayout />
			</PrivateRoute>
		),
		children: [
			{
				path: '/user/seller',
				element: (
					<SellerRoute>
						<AddProduct />
					</SellerRoute>
				),
			},
			{
				path: '/user/seller/all-products',
				element: (
					<SellerRoute>
						<DisplaySellerProducts />
					</SellerRoute>
				),
			},
		],
	},
	{
		path: '/user/buyer',
		element: <BuyerLayout />,
		children: [
			{
				path: '/user/buyer',
				element:<AllOrder/>
			}
		]
	},
]);
